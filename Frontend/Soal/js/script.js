



         // Hide the loader once the content is fully loaded
         window.addEventListener("load", function () {
            const loader = document.getElementById("loader");
            loader.style.display = "none";
          });



// ================================
//  QUIZ SCRIPT by ChatGPT (GPT-5)
// ================================

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 600; // 10 menit = 600 detik
let timerRunning = false;

// Fungsi memuat soal
function loadQuestion() {
  const q = questions[currentQuestion];
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");
  const feedback = document.getElementById("feedback");
  const explanation = document.getElementById("explanation");
  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");

  questionText.innerHTML = q.question;
  optionsList.innerHTML = "";
  feedback.classList.add("hidden");
  explanation.classList.add("hidden");
  nextBtn.classList.add("hidden");

  if (currentQuestion > 0) {
    backBtn.classList.remove("hidden");
  } else {
    backBtn.classList.add("hidden");
  }

  q.options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("option-item");
    li.onclick = () => checkAnswer(li, option);
    optionsList.appendChild(li);
  });
}

// Mengecek jawaban
function checkAnswer(element, selectedOption) {
  const q = questions[currentQuestion];
  const feedback = document.getElementById("feedback");
  const explanation = document.getElementById("explanation");
  const options = document.querySelectorAll(".option-item");

  options.forEach((opt) => (opt.style.pointerEvents = "none"));

  if (selectedOption === q.correct) {
    feedback.innerHTML = "✅ Jawaban benar!";
    feedback.style.color = "green";
    element.style.backgroundColor = "#d4edda";
    score++;
  } else {
    feedback.innerHTML = `❌ Jawaban salah! <br> Jawaban benar: <b>${q.correct}</b>`;
    feedback.style.color = "red";
    element.style.backgroundColor = "#f8d7da";
  }

  explanation.innerHTML = `<b>Penjelasan:</b><br>${q.explanation}`;
  feedback.classList.remove("hidden");
  explanation.classList.remove("hidden");

  document.getElementById("next-btn").classList.remove("hidden");
}

// Soal berikutnya
function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

// Soal sebelumnya
function loadPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Menampilkan hasil akhir
function showFinalResult() {
  clearInterval(timer);
  const container = document.querySelector(".quiz-container");
  const total = questions.length;
  const percent = ((score / total) * 100).toFixed(1);

  container.innerHTML = `
    <h2>🎉 Kuis Selesai!</h2>
    <p>Kamu menjawab <b>${score}</b> dari <b>${total}</b> soal dengan benar.</p>
    <h3>Nilai Akhir: ${percent}%</h3>
    <div style="margin-top: 20px;">
      <button onclick="location.reload()" class="btn-ulang">Ulangi Kuis</button>
      <button onclick="window.location.href='../../PilihanSoalQuizy.html'" class="btn-kembali">Kembali ke Pilihan Soal</button>
    </div>
  `;
}

// ================================
// TIMER 10 MENIT
// ================================
function startTimer() {
  if (timerRunning) return;
  timerRunning = true;

  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("start-timer-btn").classList.add("hidden");

  const timeDisplay = document.getElementById("time-remaining");
  timeDisplay.textContent = formatTime(timeLeft);

  // Wait for questions
  console.log(questions.length);
  if (!questions || questions.length === 0) {
    alert("Questions are not loaded yet. Please wait a moment and try again.");
    return;
  }

  document.querySelector(".question-section").classList.remove("hidden");
  document.getElementById("back-btn").classList.remove("hidden");

  loadQuestion();

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      showFinalResult();
    }
  }, 1000);
}

// Format waktu mm:ss
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ================================
//  Saat halaman pertama kali dibuka
// ================================
window.onload = () => {
  document.getElementById("loader").style.display = "none";
  document.querySelector(".question-section").classList.add("hidden"); // sembunyikan soal
  document.getElementById("timer").classList.add("hidden");
};
