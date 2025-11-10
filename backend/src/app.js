require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const csrf = require("csurf");
const app = express();
const { allowedOrigins } = require("./API");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: true,
  value: (req) => req.body.csrfToken,
});

// CSRF token route
app.get("/auth/csrf_token", csrfProtection, async (req, res) => {
  const token = req.csrfToken();
  res.json({ csrfToken: token });
});

// **Your main root route here**
app.get("/", (req, res) => {
  res.send("Welcome to UI dashboard project!");
});
app.use("/dashboard", require("./Routes/Dashboard.js"));

module.exports = app;
