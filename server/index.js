require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const connectDB = require("./config/db");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDef: User } = require("./schemas/users");

const app = express();

app.use(cors());

connectDB();

const schema = makeExecutableSchema({
  typeDefs: [User],
  resolvers: [],
});

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API is running"));
app.use("/graphql", graphqlExpress({ schema: schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphiql" }));
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/post", require("./routes/Post"));
app.use("/api/profiles", require("./routes/Profiles"));

const server = http.createServer(app);

const PORT = process.env.PORT || "5000";

server.listen(PORT, () => console.log("App running on port:" + PORT));
