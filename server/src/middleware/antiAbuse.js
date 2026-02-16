const Poll = require("../models/Poll");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  let deviceId = req.cookies.deviceId;

  if (!deviceId) {
    deviceId = uuidv4();
    res.cookie("deviceId", deviceId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  const alreadyVoted = poll.voters.find(
    v => v.ip === req.ip || v.deviceId === deviceId
  );

  if (alreadyVoted) {
    return res.status(403).json({ message: "Already voted" });
  }

  next();
};
