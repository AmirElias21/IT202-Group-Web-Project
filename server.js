const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

// ---------- In-memory "db" ----------
let users = [];
let movies = [];
let nextMovieId = 1; // unique IDs for movies (kinda like indexes in array)

const defaultImageUrl =
  "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-vector-40343347.jpg";

// ---------- Sign Up ----------
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "Signup successful!" });
});

// ---------- Login ----------
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return res.status(200).json({ message: "Login successful!" });
});

// ---------- Movies: Get ----------
app.get("/api/movies", (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  const userMovies = movies.filter((m) => m.username === username);
  res.json(userMovies);
});

// ---------- Movies: Post ----------
app.post("/api/movies", (req, res) => {
  const { username, imageUrl, title, status, rating, date } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required." });
  }

  if (!title || !status) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const newMovie = {
    id: nextMovieId++,
    username,
    imageUrl: imageUrl || defaultImageUrl,
    title,
    status,
    rating,
    date,
  };

  movies.push(newMovie);
  return res.status(200).json({ message: "Movie added!" });
});

// ---------- Movies: Delete ----------
app.delete("/api/movies/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Movie not found." });
  }

  movies.splice(index, 1);
  return res.status(200).json({ message: "Movie deleted." });
});

// ---------- Root to login page ----------
app.get("/", (req, res) => {
  res.redirect("/public/html/loginPage.html");
});

// ---------- start of the server ----------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
