import express from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/error.js";
import auth from "./routes/auth.js";
import blood from "./routes/blood.js";
import donors from "./routes/donors.js";
import fileUpload from "express-fileupload";
import colors from "colors";
import path from "path";
import { resizingMiddleware } from "./middlewares/resizeImage.js";
const app = express();

app.use(express.json());



const PORT = 5000;
connectDB();


//config

//Body parser//fileupload
app.use(fileUpload());

//implementing helmet

app.use(helmet());
//cors
app.use(cors());
//routes
app.use("/api/auth", auth);
app.use("/api/help", blood);
app.use("/api/donors", donors);
//error
app.use(errorHandler);
// const __dirname = Path.resolve();
// app.use(express.static(Path.join(__dirname, "/public")));
app.use("/(*_\\d+x\\d+.(jpeg?|png))", resizingMiddleware);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(Path.join(__dirname, '/client/build')))

//  app.get('*', (req,res) =>
//      res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'").send(Path.resolve(__dirname, 'client', 'build','index.html'))

//  )
// } else {
//  app.get('/', (req,res) => {
//      res.send('API is running....')
//  })
// }

// server init

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("server running!");
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
