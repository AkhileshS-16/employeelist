// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(200);
//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

import express from "express";
import { Request, Response } from "express";
import employeeRouter from "./employeeRouter";
import loggerMiddleware from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const server = express();
server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employees", employeeRouter);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
