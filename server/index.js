const webSocketsServerPort = 8002;
const webSocketServer = require("websocket").server;
const http = require("http");
const uuidv4 = require("uuid").v4;
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

// Generates unique ID for every new connection
const getUniqueID = () => {
  return uuidv4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// User activity history.
let gameActivity = [];

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
};

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
  ANNONUYMSUER: "annonuymsuser",
  GAME_EVENT: "gameevent",
};

wsServer.on("request", function (request) {
  var userID = getUniqueID();
  //   console.log(
  //     new Date() +
  //       " Recieved a new connection from origin " +
  //       request.origin +
  //       "."
  //   );
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  //   console.log(
  //     "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  //   );
  //console.log(clients);
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      if (dataFromClient.type === typesDef.ANNONUYMSUER) {
        json.data = {
          id: userID,
          date: Date.now(),
          name: "",
        };
        users[userID] = {
          id: userID,
          name: "",
        };
        userActivity.push(
          `${dataFromClient.username} joined to edit the document`
        );
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === typesDef.GAME_EVENT) {
        gameActivity[dataFromClient.gameId] = {
          gameName: dataFromClient.gameName,
          gameId: dataFromClient.gameId,
          owenerId: dataFromClient.ownerUserID,
          users: [dataFromClient.ownerUserID],
        };
        json.data = { gameActivity };
        //console.log(gameActivity);
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === typesDef.USER_EVENT) {
        const name = dataFromClient.name;
        const userId = dataFromClient.userId;
        const gameId = dataFromClient.gameId;

        gameActivity[gameId].users.push(userId);
        users[userId].name = name;

        userActivity.push(
          `${dataFromClient.username} joined to edit the document`
        );
        json.data = { game: gameActivity[gameId], user: users[userId] };
        json.type = "nameUpdate";
        //sendMessage(JSON.stringify(json));
        clients[userID].sendUTF(JSON.stringify(json));

        json.data = { game: gameActivity[gameId] };
        json.type = "gameUpate";
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === "getGameUpdate") {
        const gameId = dataFromClient.gameId;
        json.data = { game: gameActivity[gameId] };
        json.type = "gameUpate";
        console.log(users, gameActivity);
        sendMessage(JSON.stringify(json));
      }
    }
  });
  // user disconnected
  connection.on("close", function (connection) {
    console.log("close connection");
    // console.log((new Date()) + " Peer " + userID + " disconnected.");
    // const json = { type: typesDef.USER_EVENT };
    // userActivity.push(`${users[userID].username} left the document`);
    // json.data = { users, userActivity };
    // delete clients[userID];
    // delete users[userID];
    // sendMessage(JSON.stringify(json));
  });
});
