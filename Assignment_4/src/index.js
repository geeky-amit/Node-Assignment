const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here

app.get("/", (req, res) => {
  res.send("Hello world!");
});

function checkValue(num1, num2) {
  if (num1 === "" || num2 === "") {
    return false;
  }

  return true;
}

function validateDataType(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return false;
  }
  return true;
}

app.post("/add", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!checkValue(num1, num2)) {
    return res.status(400).json({
      status: "failure",
      message: "please provide input"
    });
  }

  if (!validateDataType(num1, num2)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data types"
    });
  }

  const result = Number(num1) + Number(num2);

  if (Number(num1) < -1000000 || Number(num2) < -1000000 || result < -1000000) {
    return res.status(400).json({
      status: "error",
      message: "Underflow"
    });
  }

  if (Number(num1) > 1000000 || Number(num2) > 1000000 || result > 1000000) {
    return res.status(400).json({
      status: "error",
      message: "Overflow"
    });
  }

  res.status(200).json({
    status: "success",
    message: "the sum of given two numbers",
    sum: result
  });
});

app.post("/sub", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!checkValue(num1, num2)) {
    return res.status(400).json({
      status: "failure",
      message: "please provide input"
    });
  }

  if (!validateDataType(num1, num2)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data types"
    });
  }

  const result = Number(num1) - Number(num2);

  if (Number(num1) < -1000000 || Number(num2) < -1000000 || result < -1000000) {
    return res.status(400).json({
      status: "error",
      message: "Underflow"
    });
  }

  if (Number(num1) > 1000000 || Number(num2) > 1000000 || result > 1000000) {
    return res.status(400).json({
      status: "error",
      message: "Overflow"
    });
  }

  res.status(200).json({
    status: "success",
    message: "the difference of given two numbers",
    difference: result
  });
});

app.post("/multiply", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!checkValue(num1, num2)) {
    return res.status(400).json({
      status: "failure",
      message: "please provide input"
    });
  }

  if (!validateDataType(num1, num2)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data types"
    });
  }

  const result = Number(num1) * Number(num2);

  if (Number(num1) < -1000000 || Number(num2) < -1000000 || result < -1000000) {
    return res.status(400).json({
      status: "error",
      message: "Underflow"
    });
  }

  if (Number(num1) > 1000000 || Number(num2) > 1000000 || result > 1000000) {
    return res.status(400).json({
      status: "error",
      message: "Overflow"
    });
  }

  res.status(200).json({
    status: "success",
    message: "The product of given numbers",
    difference: result
  });
});

app.post("/divide", (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!checkValue(num1, num2)) {
    return res.status(400).json({
      status: "failure",
      message: "please provide input"
    });
  }

  if (!validateDataType(num1, num2)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid data types"
    });
  }

  if (Number(num2) === 0) {
    return res.status(400).json({
      status: "error",
      message: "cannot divide by zero"
    });
  }

  const result = Number(num1) / Number(num2);

  if (Number(num1) < -1000000 || Number(num2) < -1000000 || result < -1000000) {
    return res.status(400).json({
      status: "error",
      message: "Underflow"
    });
  }

  if (Number(num1) > 1000000 || Number(num2) > 1000000 || result > 1000000) {
    return res.status(400).json({
      status: "error",
      message: "Overflow"
    });
  }

  res.status(200).json({
    status: "success",
    message: "The division of given numbers",
    difference: result
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "API NOT FOUND"
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = app;
