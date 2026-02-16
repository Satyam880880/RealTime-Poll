export default function PollOption({ option, index, handleVote }) {
  return (
    <div className="option-box">
      <button onClick={() => handleVote(index)}>
        {option.text}
      </button>
      <span className="vote-text">
        Votes: {option.votes}
      </span>
    </div>
  );
}
