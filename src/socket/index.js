import io from "socket.io-client";
const Host = "ws://localhost:8080/";
export default io(Host);
