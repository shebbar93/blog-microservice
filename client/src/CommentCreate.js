import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      comment,
    });
    setComment("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group py-3">
        <label>Comment</label>
        <input
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CommentCreate;
