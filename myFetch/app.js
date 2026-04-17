const API_KEY = "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l";

// ฟังก์ชันเรียก API เพื่อตรวจสอบโดเมน
async function checkDomain(domain) {
  const url = `https://api.api-ninjas.com/v1/domain?domain=${encodeURIComponent(
    domain
  )}`;

  console.log("Request URL:", url); // เพิ่มบรรทัดนี้

  const response = await fetch(url, {
    headers: { "X-Api-Key": API_KEY },
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Bad Request (400): ตรวจสอบรูปแบบโดเมนอีกครั้ง");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Raw data from API:", data);

  // โครงสร้างตรงนี้อาจต้องปรับตามผลจริงจาก API
  // สมมติว่า API ส่งข้อมูลเป็น array
  if (!Array.isArray(data) || data.length === 0) {
    return {
      domain,
      isUsed: false,
      info: null,
      message: `ไม่พบข้อมูลโดเมน "${domain}" ในระบบ (อาจยังไม่ถูกจดทะเบียน)`,
      raw: data,
    };
  }

  const info = data[0];

  // สมมติให้ลองเช็ก status / is_registered / created
  const isRegistered =
    info.status === "registered" ||
    info.is_registered === true ||
    typeof info.created !== "undefined";

  if (isRegistered) {
    return {
      domain,
      isUsed: true,
      info,
      message: `โดเมน "${domain}" ดูเหมือนว่าจะถูกใช้งาน/จดทะเบียนแล้ว`,
      raw: data,
    };
  }

  return {
    domain,
    isUsed: false,
    info,
    message: `โดเมน "${domain}" ยังไม่พบสถานะการจดทะเบียนที่ชัดเจน`,
    raw: data,
  };
}

let countdownTimer = null; // ตัวแปรเก็บ setInterval ไว้เคลียร์
// ฟังก์ชันอัปเดต UI จากผลลัพธ์
function renderResult(result) {
  const resultBox = document.getElementById("result");
  const badge = document.getElementById("badge");
  const titleEl = document.getElementById("result-title");
  const messageEl = document.getElementById("result-message");
  const rawDataEl = document.getElementById("raw-data");

  const registerBtn = document.getElementById("register-btn");
  const countdownText = document.getElementById("countdown-text");

  resultBox.classList.remove("hidden");

  // ซ่อน raw JSON ถ้าไม่อยากแสดง
  rawDataEl.classList.add("hidden");
  rawDataEl.textContent = "";

  // เคลียร์คลาสเก่า
  badge.classList.remove("used", "available", "unknown");

  // เคลียร์ปุ่มและ countdown ทุกครั้งก่อน
  registerBtn.classList.add("hidden");
  countdownText.classList.add("hidden");
  countdownText.textContent = "";

  // ถ้ามี timer เก่าให้หยุดก่อน
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  if (result.error) {
    badge.textContent = "เกิดข้อผิดพลาด";
    badge.classList.add("unknown");
    titleEl.textContent = "ไม่สามารถตรวจสอบโดเมนได้";
    messageEl.textContent = result.message || "กรุณาลองใหม่อีกครั้ง";
  } else if (result.isUsed === true) {
    badge.textContent = "ถูกใช้งานแล้ว";
    badge.classList.add("used");
    titleEl.textContent = `โดเมน "${result.domain}" ถูกใช้งานแล้ว`;
    messageEl.textContent = result.message;
  } else if (result.isUsed === false) {
    badge.textContent = "อาจยังว่างอยู่";
    badge.classList.add("available");
    titleEl.textContent = `โดเมน "${result.domain}" ยังไม่พบการใช้งานชัดเจน`;
    // ถ้าไม่อยากมีข้อความรายละเอียดก็ใส่เป็น "" ได้
    messageEl.textContent = "";

    // ====== ส่วนเพิ่ม: ปุ่ม + นับถอยหลัง ======
    const domain = result.domain;
    const registerUrl =
       "register-domain.html?domain=" + encodeURIComponent(domain);
    // เปลี่ยนเป็น URL ผู้ให้บริการที่คุณใช้จริงได้เลย เช่น:
    // const registerUrl = "https://www.your-domain-provider.com/register?domain=" + encodeURIComponent(domain);

    // แสดงปุ่ม
    registerBtn.classList.remove("hidden");
    registerBtn.onclick = () => {
      window.location.href = registerUrl;
    };

    // เริ่มนับถอยหลัง 7 วิ
    let seconds = 7;
    countdownText.classList.remove("hidden");
    countdownText.textContent = `ระบบจะพาคุณไปยังหน้าสมัครโดเมนในอีก ${seconds} วินาที...`;

    countdownTimer = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        window.location.href = registerUrl;
      } else {
        countdownText.textContent = `ระบบจะพาคุณไปยังหน้าสมัครโดเมนในอีก ${seconds} วินาที...`;
      }
    }, 1000);
    // ====== จบส่วนเพิ่ม ======

  } else {
    badge.textContent = "ไม่ทราบสถานะ";
    badge.classList.add("unknown");
    titleEl.textContent = `ไม่สามารถระบุสถานะของโดเมน "${result.domain}" ได้แน่ชัด`;
    messageEl.textContent = result.message || "";
  }
}

// จัดการ event เมื่อโหลดหน้า
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("domain-form");
  const input = document.getElementById("domain-input");
  const statusEl = document.getElementById("status");
  const checkBtn = document.getElementById("check-btn");

  form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let domain = input.value.trim();

  // ตัด http/https/www ออก (ถ้าผู้ใช้ใส่มา)
  domain = domain
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0]  // ตัด path ทิ้ง
    .split("?")[0]; // ตัด query ทิ้ง

  // regex โดเมนแบบง่าย ๆ (พอใช้เบื้องต้น)
  const domainRegex =
    /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;

  if (!domain) {
    statusEl.textContent = "กรุณากรอกชื่อโดเมนก่อน";
    return;
  }

  if (!domainRegex.test(domain)) {
    statusEl.textContent = "รูปแบบโดเมนไม่ถูกต้อง เช่น example.com";
    return;
  }

  statusEl.textContent = "กำลังตรวจสอบโดเมน...";
  checkBtn.disabled = true;

  try {
    const result = await checkDomain(domain);
    renderResult(result);
    statusEl.textContent = "";
  } catch (error) {
    console.error(error);
    renderResult({
      domain,
      isUsed: null,
      error: true,
      message:
        error.message?.includes("status: 400")
          ? "คำขอไม่ถูกต้อง (400) กรุณาตรวจสอบรูปแบบโดเมนอีกรอบ"
          : "เกิดข้อผิดพลาดระหว่างเรียก API",
      raw: { error: error.message },
    });
    statusEl.textContent = "";
  } finally {
    checkBtn.disabled = false;
  }
});
});