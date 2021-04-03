const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const sequelize = require('./config/connection');
const { isObject } = require('util');
const { Youth } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = http.createServer(app);
const io = socketio(server)

const PORT = process.env.PORT || 3001;

// Set up Handlebars.js
const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// socket io backend
const botName = "Ment2Trade"

io.on('connection', socket => {
  console.log('New Connection');

  socket.emit('message', formatMessage(botName, 'Welcome to Ment2Trade ChatRoom'));
  // tell when a new user joins the room
  socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));
  // runs when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the room'));
  })
  // listen for message on the server
  const youthUsername = "User";
  
  socket.on('chatMessage', msg => {
    io.emit('message', formatMessage(youthUsername , msg))
  })
})

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log('Now listening on http://localhost:' + PORT)
  );
});
