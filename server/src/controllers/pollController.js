const Poll = require("../models/Poll");
const { v4: uuidv4 } = require("uuid");

// Create Poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || options.length < 2) {
      return res.status(400).json({ message: "Invalid poll data" });
    }

    const formattedOptions = options.map(opt => ({
      text: opt,
      votes: 0
    }));

    const poll = await Poll.create({
      question,
      options: formattedOptions,
    });

    res.json({
      pollId: poll._id,
      shareLink: `${process.env.BASE_URL}/poll/${poll._id}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Poll
exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Not found" });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Vote
exports.votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) return res.status(404).json({ message: "Not found" });

    poll.options[optionIndex].votes += 1;

    poll.voters.push({
      ip: req.ip,
      deviceId: req.cookies.deviceId,
    });

    await poll.save();

    req.io.to(poll._id.toString()).emit("voteUpdated", poll);

    res.json({ message: "Vote counted", poll });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
