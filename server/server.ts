import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "../type";
import { instrument } from "@socket.io/admin-ui";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on("ClientMsg", (data) => {
      if (data.room === "") {
        io.sockets.emit("serverMsg", data);
      } else {
        socket.join(data.room);
        io.to(data.room).emit("serverMsg", data);
      }
    });
  }
);
instrument(io, {
  auth: false,
});

server.listen(3000);
