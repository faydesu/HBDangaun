// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbApK2L3JiWBvBHfk4TpLqKmOn5cUB0O0",
  authDomain: "popbabyangaun.firebaseapp.com",
  projectId: "popbabyangaun",
  storageBucket: "popbabyangaun.firebasestorage.app",
  messagingSenderId: "1076901800077",
  appId: "1:1076901800077:web:6a671611d56b1df4f15ac4",
  measurementId: "G-B8T6H9TDVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Elements
const playerForm = document.getElementById("player-form");
const playerNameInput = document.getElementById("player-name");
const startGameButton = document.getElementById("start-game");
const gameArea = document.getElementById("game-area");
const popcat = document.getElementById("popcat");
const scoreDisplay = document.getElementById("score");
const leaderboardList = document.getElementById("leaderboard-list");

let playerName = "";
let score = 0;

// Start Game
startGameButton.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("กรุณาใส่ชื่อของคุณก่อนเริ่มเกม!");
    return;
  }

  playerForm.style.display = "none";
  gameArea.style.display = "block";
  score = 0;
  scoreDisplay.textContent = score;
});

// Popcat Click
popcat.addEventListener("mousedown", () => {
  popcat.src = "cat-clicked.png"; // เปลี่ยนเป็นรูปแมวตอนคลิก
  score++;
  scoreDisplay.textContent = score;
});

popcat.addEventListener("mouseup", () => {
  popcat.src = "cat.png"; // กลับเป็นรูปแมวปกติ
});

// Save Score to Firebase
window.addEventListener("beforeunload", () => {
  if (playerName && score > 0) {
    const scoresRef = ref(db, "scores");
    const newScoreRef = push(scoresRef);
    set(newScoreRef, {
      name: playerName,
      score: score
    });
  }
});

// Load Leaderboard
const loadLeaderboard = () => {
  const scoresRef = query(ref(db, "scores"), orderByChild("score"), limitToLast(10));
  onValue(scoresRef, (snapshot) => {
    leaderboardList.innerHTML = "";
    const scores = [];
    snapshot.forEach((childSnapshot) => {
      scores.push(childSnapshot.val());
    });
    scores.sort((a, b) => b.score - a.score);
    scores.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.name}: ${entry.score}`;
      leaderboardList.appendChild(li);
    });
  });
};

loadLeaderboard();