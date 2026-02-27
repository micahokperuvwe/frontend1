import { io } from "socket.io-client";

const URL = "hhttps://backend1-xghl.onrender.com";
// const URL = "http://localhost:5000";

export const socket = io(URL, {
    autoConnect: false,
});
