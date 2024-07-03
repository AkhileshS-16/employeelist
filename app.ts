// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(200);
//   res.end("Hello World");
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");
import { Request, Response } from "express";
const server = new express();

interface Profile {
  Name: string;
  Age: number;
}

interface Data {
  profile: Profile;
}

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

server.get("/getData", (req: Request, res: Response) => {
  let data: Data = {
    profile: {
      Name: "Akhilesh",
      Age: 22,
    },
  };
  console.log(data.profile.Name);
  res.status(200).send(data);
});

server.listen(3001, () => {
  console.log("Server is running on port 3000");
});
