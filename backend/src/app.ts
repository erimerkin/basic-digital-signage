import express, {Request, Response} from "express";

const app = express();

const playlistRouter = require('./routes/playlist.route')

app.use(express.json());

app.use('/static', express.static('public'))
app.use('/api', playlistRouter)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "The resource you are looking for does not exist",
  });
});

app.listen(1955, () => {
  console.log("Server is listening on port 1955");
});

