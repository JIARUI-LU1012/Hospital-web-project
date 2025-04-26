const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3002 });

const clients = new Map();
const chatList = []

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());
    // console.log(data)

    if(data.type === 'join') { // 客户端加入
      clients.set(data.clientId, ws)

      const myChat = chatList.filter(chat => chat.toId === data.clientId || chat.fromId === data.clientId)
      ws.send(JSON.stringify({type: 'join', chatList: myChat}))
    } else if(data.type === 'leave') {
      clients.delete(data.clientId)
    } else if(data.type === 'chat') {
      chatList.push(data)

      const target = clients.get(data.toId)
      if(target) {
        target.send(JSON.stringify(data))
      }
    }
  });

  ws.on('close', () => {
    clients.clear();
  });
});

console.log('WebSocket on ws://localhost:3002');

module.exports = server;
