const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPoll,
  votePoll,
} = require("../controllers/pollController");

const antiAbuse = require("../middleware/antiAbuse");

router.post("/", createPoll);
router.get("/:id", getPoll);
router.post("/:id/vote", antiAbuse, votePoll);

module.exports = router;
