const express = require("express");
const router = express.Router();

const { analyzeCase } = require("../services/openaiService");

router.post("/", async (req, res) => {
  try {
    const { caseText } = req.body;

    const result = await analyzeCase(caseText);

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

module.exports = router;