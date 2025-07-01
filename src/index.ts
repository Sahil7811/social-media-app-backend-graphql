import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { BodyParser } from "body-parser";
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    // create gqlServer
    const gqlServer = new ApolloServer({
        //Schema
        typeDefs: `
            type Query{
                hello: String
            }
        `,
        // resolvers
        resolvers: {
            Query: {
                hello: () => `Hey there, I am gqlServer`,
            },
        },
    });

    // start the gqlServer, for that we have to use await and for wait we have to use the async so for that we can put whole code into the async function
    await gqlServer.start();

    // Specify the path where we'd like to mount our server
    app.use("/graphql", expressMiddleware(gqlServer));
    app.get("/", (req, res) => {
        res.json({ message: "Server is up running" });
    });

    app.listen(PORT, () => console.log(`server is running on PORT : ${PORT}`));
}

init();
