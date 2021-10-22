const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const allEvents = [];

app.post("/events", (req, res) => {
  const events = req.body;
  allEvents.push(events);
  axios.post("http://posts-clusterip-srv:4000/events", events);
  axios.post("http://comments-srv:4001/events", events);
  axios.post("http://query-srv:4002/events", events);
  axios.post("http://moderation-srv:4003/events", events);
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(allEvents);
});

app.listen(4005, () => {
  console.log("Listening on 4005...");
});
