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
  popImage.src = 'assets/เบบี้องุ่น.png'; // เปลี่ยนภาพเมื่อคลิก
});

// คืนภาพเดิมเมื่อปล่อยคลิก
popImage.addEventListener('mouseup', () => {
  popImage.src = 'assets/องุ่น.png';
});

// กรณีเลื่อนเมาส์ออกจากภาพ
popImage.addEventListener('mouseleave', () => {
  popImage.src = 'assets/องุ่น.png';
});
