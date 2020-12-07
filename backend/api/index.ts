import express from 'express';
import session from 'express-session';
import { v4 as uuid } from 'uuid';

const SESSION_SECRECT = 'bad secret';

class Server {
  public app = express();
}

const server = new Server();

server.app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));

server.app.listen();