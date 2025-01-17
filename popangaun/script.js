let score = 0;

// ดึงคะแนนจาก Local Storage
if (localStorage.getItem('popScore')) {
  score = parseInt(localStorage.getItem('popScore'));
  document.getElementById('score').textContent = score;
}

const popImage = document.getElementById('pop-image');

// ฟังก์ชันเพิ่มคะแนนเมื่อคลิก
popImage.addEventListener('mousedown', () => {
  score++;
  document.getElementById('score').textContent = score;
  localStorage.setItem('popScore', score); // บันทึกคะแนน
  popImage.src = 'assets/cat-clicked.png'; // เปลี่ยนภาพเมื่อคลิก
});

// คืนภาพเดิมเมื่อปล่อยคลิก
popImage.addEventListener('mouseup', () => {
  popImage.src = 'assets/cat.png';
});

// สำหรับการเลื่อนเมาส์ออกนอกพื้นที่ (กรณีที่ยังคลิกอยู่)
popImage.addEventListener('mouseleave', () => {
  popImage.src = 'assets/cat.png';
});
