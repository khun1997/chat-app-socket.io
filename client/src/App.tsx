import { io } from "socket.io-client";

const socket = io(`http://localhost:3000`);
socket.on("connect",()=>{
  console.log(socket.id)
})
function App() {
  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default App;
