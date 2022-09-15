const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_URL;

const app = express();

mongoose.connect(DB_URL);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${PORT}`);
});
