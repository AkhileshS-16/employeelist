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
import employeeRouter from "./routes/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import HttpException from "./exceptions/http.exceptions";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./routes/department.routes";

const server = express();
server.use(loggerMiddleware);
server.use(bodyParser.json());
server.use("/employees", employeeRouter);
server.use("/departments", departmentRouter);
server.use(errorMiddleware);

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
  let port = 3001;
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
