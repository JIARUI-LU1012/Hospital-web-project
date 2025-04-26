const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const clients = new Set();

server.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    // 广播消息给所有连接的客户端
    clients.forEach((client) => {
      let alive = client.readyState === WebSocket.OPEN
      let isTarget = client !== ws && client.id === message.id
      if (alive && isTarget) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });

  console.log('New client connections');
});

console.log('The WebSocket server has been started in ws://localhost:3000');
