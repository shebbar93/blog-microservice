const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://eventbus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          comment: data.comment,
          postId: data.postId,
          status,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003...");
});
