import express from "express";

const app = express();

const playlistRouter = require('./routes/playlist.route')

app.use(express.json());

app.use('/static', express.static('public'))
app.use('/api', playlistRouter)

app.listen(1955, () => {
  console.log("Server is listening on port 1955");
});

