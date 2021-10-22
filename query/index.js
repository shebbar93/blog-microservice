const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, comment, status });
  }
  if (type === "CommentUpdated") {
    const { id, comment, postId, status } = data;
    console.log(data);
    const post = posts[postId];
    const comment1 = post.comments.find((c) => {
      return c.id === id;
    });
    comment1.status = status;
    comment1.comments = comment;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002..");

  const res = await axios.get("http://eventbus-srv:4005/events");

  for (let e of res.data) {
    console.log("Processing event :", e.type);
    handleEvent(e.type, e.data);
  }
});
