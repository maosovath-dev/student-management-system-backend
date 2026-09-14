const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

// ========================================
// Middleware
// ========================================

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

app.use(express.json());


// ========================================
// Routes
// ========================================

const studentRoute = require("./routes/student.routes");
const classRoute = require("./routes/class.routes");
const subjectRoute = require("./routes/subject.route");
const scoreRoute = require("./routes/score.route");
const attendanceRoute = require("./routes/attendance.routes");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");


app.use("/api/students", studentRoute);
app.use("/api/classes", classRoute);
app.use("/api/subjects", subjectRoute);
app.use("/api/scores", scoreRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);


// ========================================
// Server
// ========================================

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});