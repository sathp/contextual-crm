import dotenv from 'dotenv';
import express from 'express'; // Note to self: ts prefers import module to require
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { rootCertificates } from 'tls';
import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { userInfo } from 'os';

dotenv.config({
    path: '.env'
});

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello World!';
    },
};
class Server {
    public app = express();
}

const server = new Server();

passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost/auth/callback",
    },
    function(token, tokenSecret, profile, done) {
        console.log(token, tokenSecret, profile);
    }
));

server.app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();