let score = 0;

// ดึงคะแนนจาก Local Storage
if (localStorage.getItem('popScore')) {
  score = parseInt(localStorage.getItem('popScore'));
  document.getElementById('score').textContent = score;
}

const popImage = document.getElementById('pop-image');
popImage.addEventListener('mousedown', () => {
  score++;
  document.getElementById('score').textContent = score;
  localStorage.setItem('popScore', score); // บันทึกคะแนน
});

// กดค้างเพื่อเพิ่มคะแนนอัตโนมัติ
let interval;
popImage.addEventListener('mousedown', () => {
  interval = setInterval(() => {
    score++;
    document.getElementById('score').textContent = score;
    localStorage.setItem('popScore', score);
  }, 100);
});

popImage.addEventListener('mouseup', () => clearInterval(interval));
popImage.addEventListener('mouseleave', () => clearInterval(interval));
