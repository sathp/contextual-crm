import * as dotenv from 'dotenv'; // Move to entry point of code later on, probably src/app.ts
import neo4j from "neo4j-driver";

dotenv.config();

const driver: typeof neo4j.Driver = neo4j.driver(
    process.env.DB_HOST, 
    neo4j.auth.basic(process.env.DB_USER, process.env.DB_PASS)
)
const session: typeof neo4j.Session = driver.session({defaultAccessMode: neo4j.session.READ});

const cypher = "MATCH (p:Company { name: $name }) RETURN p AS result";
const params = { name: "Capital One" };

session.run(cypher, params)
    .then(result => {
        // const count = result.records[0].get('count');
        console.log( result.records[0].get('result') );
    })
    .then(() => {
        return session.close();
        console.log("session closed");
    })
    .then(() => {
        return driver.close();
        console.log("driver closed");
    });