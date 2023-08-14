import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import expressWs from "express-ws";
import { Container } from "typedi";

const app = expressWs(express()).app;

import httpStatus from "http-status";
import ApiError from "./utils/ApiError";
import cors from "cors";

import Socket from "../src/services/socket.service";

const _sockets = Container.get(Socket);

import { chatRoutes } from "./routes";

import { errorConverter, errorHandler } from "./middleware/error";

import db from "./db";

//mondodb connection
db.mongo;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use('/api/v2/user', userRoute);
const rooms: Map<string, Set<WebSocket>> = new Map();

app.ws("/room/:roomId", async (ws: WebSocket, req: Request) =>
  _sockets.socketActivities(ws, req, rooms)
);
app.ws("/archive/:roomId", async (ws: WebSocket, req: Request) =>
  _sockets.archiveChats(ws, req)
);

app.use("/api/v1/chats", chatRoutes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);

//"include": ["src/**/*"]
