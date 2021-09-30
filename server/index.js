const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP
const schema = require("./schema/schema");
const app = express();

//middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql:true
  })
);

app.listen(4000, () => {
  console.log("app is running on port 4000");
});
