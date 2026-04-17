// อ่านค่า domain จาก query string เช่น register-domain.html?domain=myname.com
function getDomainFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const domain = params.get("domain");
  return domain || "";
}

// คำนวณราคาอย่างง่าย (ตัวอย่าง)
function calculatePrice(tld, years) {
  // pricing ตัวอย่าง
  const basePrices = {
    ".com": 350,
    ".net": 320,
    ".org": 300,
    ".co.th": 900,
  };

  const base = basePrices[tld] ?? 350;
  return base * years;
}

document.addEventListener("DOMContentLoaded", () => {
  const domainInput = document.getElementById("domain-input");
  const durationSelect = document.getElementById("duration");
  const tldSelect = document.getElementById("tld");
  const fullNameInput = document.getElementById("full-name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const notesInput = document.getElementById("notes");
  const form = document.getElementById("register-form");
  const statusEl = document.getElementById("status");

  const summaryDomain = document.getElementById("summary-domain");
  const summaryDuration = document.getElementById("summary-duration");
  const summaryPrice = document.getElementById("summary-price");

  // นำ domain จาก query string มาใส่ (ถ้ามี)
  const initialDomain = getDomainFromQuery();
  if (initialDomain) {
    domainInput.value = initialDomain;
  }

  // ฟังก์ชันอัปเดต summary
  function updateSummary() {
    const d = domainInput.value.trim() || "-";
    const years = Number(durationSelect.value || "1");
    const tld = tldSelect.value || ".com";

    const fullDomain =
      d.includes(".") || d === "-" ? d : d + tld; // ถ้าไม่ใส่ .com ให้ต่อให้

    const price = calculatePrice(tld, years);

    summaryDomain.textContent = fullDomain;
    summaryDuration.textContent = `${years} ปี`;
    summaryPrice.textContent = `${price.toLocaleString("th-TH")} บาท (ประมาณการ)`;
  }

  // อัปเดต summary เมื่อมีการเปลี่ยนค่า
  domainInput.addEventListener("input", updateSummary);
  durationSelect.addEventListener("change", updateSummary);
  tldSelect.addEventListener("change", updateSummary);

  // เรียกครั้งแรกตอนโหลดหน้า
  updateSummary();

  // จัดการ submit ฟอร์ม (demo)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const domain = domainInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!domain) {
      statusEl.textContent = "กรุณากรอกชื่อโดเมนก่อน";
      statusEl.style.color = "#fecaca";
      return;
    }

    if (!fullName || !email || !phone) {
      statusEl.textContent = "กรุณากรอกข้อมูล ชื่อ, อีเมล และเบอร์ติดต่อให้ครบถ้วน";
      statusEl.style.color = "#fecaca";
      return;
    }

    // ในระบบจริง ตรงนี้คือจุดที่คุณจะเรียก API backend ของคุณ
    // ตอนนี้ทำเป็น demo แสดงข้อความส���เร็จอย่างเดียว
    statusEl.style.color = "#bbf7d0";
    statusEl.textContent = `บันทึกคำขอสมัครโดเมน "${domain}" เรียบร้อย (ตัวอย่าง)`;

    // ลองแสดงข้อมูลใน console แทนการส่งจริง
    console.log("Register request:", {
      domain,
      durationYears: durationSelect.value,
      tld: tldSelect.value,
      fullName,
      email,
      phone,
      notes: notesInput.value,
    });
  });
});