const fetch = require("node-fetch"); // ถ้าใช้ Node < 18 ให้ติดตั้ง: npm install node-fetch

async function getAllAnimalsByLetter(letter) {
  let offset = 0;
  const limit = 20; // ดึงทีละ 20
  let page = 1;

  while (true) {
    const url = `https://api.api-ninjas.com/v1/animals?name=${letter}&offset=${offset}`;
    console.log(`\n=== Page ${page} (offset=${offset}) ===`);

    const response = await fetch(url, {
      headers: {
        "X-Api-Key": "4O8kEXCry14w0QfwCUaDdn2cZSRTMysppTgpsl2l",
      },
    });

    if (!response.ok) {
      console.error("HTTP error:", response.status, response.statusText);
      break;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.log("No more data.");
      break; // จบ loop เมื่อไม่มีข้อมูลเพิ่มแล้ว
    }

    // แสดงผลทีละ 20 ใน Terminal
    data.forEach((animal, index) => {
      console.log(`${offset + index + 1}. ${animal.name}`);
    });

    // ไปหน้า/ชุดถัดไป
    offset += limit;
    page++;
  }
}

getAllAnimalsByLetter("a").catch(console.error);