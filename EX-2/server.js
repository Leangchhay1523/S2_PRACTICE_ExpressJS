// server.js
import express from "express";
import courses from "./course.js";
import logMiddleware from "./logger.js";
import validateQuery from "./validateQuery.js";
import authenticate from "./auth.js";
const app = express();
const PORT = 3000;

app.use(logMiddleware, authenticate);

// Route: GET /departments/:dept/courses
app.get("/departments/:dept/courses", validateQuery, (req, res) => {
  const { dept } = req.params;
  const { level, minCredits, maxCredits, semester, instructor } = req.query;
  console.log("Department:", dept);

  try {
    filteredData = courses.filter((course) => {
      return course.department.toLowerCase() === dept.toLowerCase();
    });

    if (level) {
      filteredData = filteredData.filter(
        (course) => course.level.toLowerCase() === level.toLowerCase()
      );
    }
    if (minCredits) {
      filteredData = filteredData.filter(
        (course) => course.credits >= parseInt(minCredits)
      );
    }
    if (maxCredits) {
      filteredData = filteredData.filter(
        (course) => course.credits <= parseInt(maxCredits)
      );
    }
    if (semester) {
      filteredData = filteredData.filter(
        (course) => course.semester.toLowerCase() === semester.toLowerCase()
      );
    }
    if (instructor) {
      filteredData = filteredData.filter(
        (course) => course.instructor.toLowerCase() === instructor.toLowerCase()
      );
    }

    if (filteredData.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }

    res.status(200).json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
