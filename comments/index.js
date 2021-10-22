const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, comment, status: "pending" });
  try {
    await axios.post("http://eventbus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        comment,
        postId: req.params.id,
        status: "pending",
      },
    });
  } catch (e) {
    console.log(e);
  }

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/events", async (req, res) => {
  console.log("Received event", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((c) => {
      return c.id === id;
    });
    comment.status = status;
    try {
      await axios.post("http://eventbus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          comment,
          postId,
          status,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on 4001");
});
