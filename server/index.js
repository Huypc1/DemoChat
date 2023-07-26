const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");
const axios = require('axios'); // Thêm thư viện Axios

app.use(cors({
  origin: "verdant-fairy-4ac903.netlify.app", // Thay đổi thành tên miền của frontend đã triển khai
  methods: ["GET", "POST"],
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "verdant-fairy-4ac903.netlify.app", // Thay đổi thành tên miền của frontend đã triển khai
    methods: ["GET", "POST"],
  }
});

// ... Tiếp tục phần còn lại của mã backend giống như trước đó ...

server.listen(3001, () => {
  console.log("server run");
});
