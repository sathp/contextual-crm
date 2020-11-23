import neo4j from "neo4j-driver";

const driver: typeof neo4j.Driver = neo4j.driver(
    "neo4j://68.183.111.22:7687", 
    neo4j.auth.basic('neo4j', 'Rbd@4goq5f7K7V')
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