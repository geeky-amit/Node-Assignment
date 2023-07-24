const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

const studentArray = require("./InitialData");

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
let newId = studentArray.length + 1;
app.get("/api/student", (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: studentArray
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message
    });
  }
});

app.get("/api/student/:id", (req, res) => {
  try {
    const idx = studentArray.findIndex((data) => data.id == req.params.id);
    console.log(idx);
    if (idx >= 0) {
      res.status(200).json({
        status: "Success",
        data: studentArray[idx]
      });
    } else {
      res.status(404).json({
        status: "Failure",
        message: "There is no student with given ID"
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message
    });
  }
});

app.post("/api/student", (req, res) => {
  try {
    const studentInfo = req.body;

    if (
      !studentInfo.name ||
      !studentInfo.currentClass ||
      !studentInfo.division
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "Student details are missing"
      });
    }

    studentArray.push({
      id: newId,
      name: studentInfo.name,
      currentClass: studentInfo.currentClass,
      division: studentInfo.division
    });
    newId++;
    res.status(201).json({
      status: "Success",
      message: "Student added successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    });
  }
});

app.put("/api/student/:id", (req, res) => {
  try {
    const idx = studentArray.findIndex((data) => data.id == req.params.id);

    if (idx == -1) {
      return res.status(404).json({
        status: "Failure",
        message: "There is no student with given ID"
      });
    }
    if (req.body.name) {
      studentArray[idx].name = req.body.name;
    }
    if (req.body.currentClass) {
      studentArray[idx].currentClass = req.body.currentClass;
    }
    if (req.body.division) {
      studentArray[idx].division = req.body.division;
    }

    res.status(200).json({
      status: "Success",
      message: "Student record updated successfully",
      data: studentArray[idx]
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message
    });
  }
});

app.delete("/api/student/:id", (req, res) => {
  try {
    const idx = studentArray.findIndex((data) => data.id == req.params.id);

    if (idx == -1) {
      return res.status(404).json({
        status: "Failure",
        message: "There is no student with given ID"
      });
    }

    studentArray.splice(idx, 1);

    res.status(200).json({
      status: "Success",
      message: "Student record deleted successfully",
      data: studentArray[idx]
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message
    });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
