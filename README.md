# 🧠 Quiz Application

Sebuah aplikasi web kuis sederhana di mana pengguna dapat melihat pertanyaan pilihan ganda, menjawabnya, dan mendapatkan umpan balik instan.
Proyek ini menunjukkan sebuah **aplikasi full-stack** yang dibangun dengan **Node.js (Express)** untuk bagian backend dan **MongoDB** sebagai basis data, dikontainerisasi menggunakan **Docker** untuk deployment yang mudah.

---

## 👥 Anggota Kelompok

| Nama Lengkap         | NIM          |
|----------------------|--------------|
|Fikhri Aulia Basyar |221111938
|Kent Dhani Isara |221110330
|Kevin Tandella |221113813
|Delvin Dwiantono |221110866
|Yoseph |221112428
---

## 🏗️ Arsitektur & Teknologi

### 🧩 Diagram Arsitektur

[Frontend (HTML/CSS/JS)] <-> [Backend (Express.js)] <-> [Database (MongoDB)] <-> [Docker Compose]


### ⚙️ Stack Teknologi

| Komponen | Teknologi yang Digunakan |
|-----------|--------------------------|
| Bahasa Pemrograman | JavaScript (ES6) |
| Framework Backend | Express.js |
| Database | MongoDB |
| Environment Management | dotenv |
| Containerization | Docker & Docker Compose |
| Tools Tambahan | Postman (API Testing), Nodemon (dev) |

---

## 🐳 Petunjuk Instalasi Lokal (via Docker)

Jalankan aplikasi hanya dengan **3 langkah mudah**:

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Yoshi-Mine/DevOps.git
cd <nama-folder-repo>
cp .env.example .env

.env isi
MONGO_URI=mongodb://mongo:27017/quizdb
PORT=3000
docker-compose up --build

buka http://localhost:3001 atau https://devops.gpasol.com/
```
