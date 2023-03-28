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
// User activity history.
let userActivity = [];
// Game Activity.
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
  GETPLAYERS: "getPlayers",
  GETGAMEUPDATE: "getGameUpdate",
};

wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);
  var userID = getUniqueID();
  const { id } = request.resourceURL.query;
  if (id) {
    userID = id;
  }
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );

  const user = {
    id: userID,
    date: Date.now(),
    name: "",
    points: 0,
    isSpectator: false,
  };
  users[userID] = user;
  //userActivity.push(`${dataFromClient.username} joined to edit the document`);
  const json = {
    type: typesDef.ANNONUYMSUER,
    data: { user },
  };
  connection.sendUTF(JSON.stringify(json));

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type };
      //   if (dataFromClient.type === typesDef.ANNONUYMSUER) {
      //     const user = {
      //       id: userID,
      //       date: Date.now(),
      //       name: "",
      //       points: 0,
      //       isSpectator: false,
      //     };
      //     users[userID] = user;
      //     userActivity.push(
      //       `${dataFromClient.username} joined to edit the document`
      //     );
      //     json.data = { user };
      //     sendMessage(JSON.stringify(json));
      //   } else if (dataFromClient.type === typesDef.GAME_EVENT) {
      if (dataFromClient.type === typesDef.GAME_EVENT) {
        // Start Game Home Page
        const { gameName, gameId, ownerUserID } = dataFromClient;
        gameActivity[gameId] = {
          gameName: gameName,
          gameId: gameId,
          owenerId: ownerUserID,
          revealed: false,
          users: [ownerUserID],
        };
        json.data = { gameActivity };
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === typesDef.USER_EVENT) {
        // Name Update pop up
        const { name, userId, gameId, isSpectator, points } = dataFromClient;

        gameActivity[gameId].users.push(userId);
        users[userId].name = name;
        users[userId].isSpectator = isSpectator;
        users[userId].points = points;

        userActivity.push(
          `${dataFromClient.userId} joined to edit the document`
        );
        const jsonData = {
          type: "nameUpdate",
          data: { game: gameActivity[gameId], user: users[userId] },
        };
        //sendMessage(JSON.stringify(jsonData));
        clients[userId].sendUTF(JSON.stringify(jsonData));

        const json = {
          type: "gameUpdate",
          data: { game: gameActivity[gameId], user: users[userId] },
        };
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === typesDef.GETGAMEUPDATE) {
        const { gameId, type } = dataFromClient;
        const json = {
          type: type,
          data: { game: gameActivity[gameId] },
        };
        sendMessage(JSON.stringify(json));
      } else if (dataFromClient.type === typesDef.GETPLAYERS) {
        const { gameId, type } = dataFromClient;
        const users = gameActivity[gameId].users;
        const json = {
          type: type,
          data: { users },
        };
        sendMessage(JSON.stringify(json));
      }
    }
  });
  // user disconnected
  connection.on("close", function (connection, reason) {
    console.log("ws is closed with code: " + connection + " reason: " + reason);
    // console.log((new Date()) + " Peer " + userID + " disconnected.");
    // const json = { type: typesDef.USER_EVENT };
    // userActivity.push(`${users[userID].username} left the document`);
    // json.data = { users, userActivity };
    // delete clients[userID];
    //Object.keys(users).forEach(key => delete users[key]);
    //Object.keys(gameActivity).forEach(key => delete gameActivity[key]);
    // sendMessage(JSON.stringify(json));
  });
});
