import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "../../type";
import { FormEvent, useEffect, useState } from "react";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `http://localhost:3000`
);

function App() {
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("ClientMsg", { room, msg });
    setRoom("");
    setMsg("");
  };

  useEffect(() => {
    socket.on("serverMsg", (data) => {
      setMessages([...messages!, data.msg]);
    });
  }, [socket, messages]);
  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>messages</h1>
            {messages.map((msg, id) => (
              <p key={id}>{msg}</p>
            ))}
          </div>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button>Send Message</button>
        </form>
      </div>
    </>
  );
}

export default App;
