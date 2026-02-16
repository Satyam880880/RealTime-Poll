import { useEffect, useState } from "react";
import { getPoll, votePoll } from "../api";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import PollOption from "./PollOption";

const socket = io("http://localhost:5000");

export default function PollRoom() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPoll = async () => {
      const res = await getPoll(id);
      setPoll(res.data);
    };

    fetchPoll();
    socket.emit("joinPoll", id);

    socket.on("voteUpdated", (updatedPoll) => {
      setPoll(updatedPoll);
    });

    return () => socket.off("voteUpdated");
  }, [id]);

  const handleVote = async (index) => {
    try {
      const res = await votePoll(id, index);
      setPoll(res.data.poll);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{poll.question}</h2>

      {poll.options.map((opt, i) => (
        <PollOption
          key={i}
          option={opt}
          index={i}
          handleVote={handleVote}
        />
      ))}

      {message && <p className="message">{message}</p>}
    </div>
  );
}
