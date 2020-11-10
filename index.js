const express = require('express');
const { ApolloServer } = require('apollo-server');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema')

// const jsonGraphqlExpress = require('json-graphql-server');
const data = require('./data');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

const resolvers = {
    Query: {
        allPeople: () => data.people,
        person: (id) => {
            const personIdx = data.people.find((p) => p.id = id)

            return personIdx ? data.people[personIdx] : null
        }
    }
  };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

app.use(cors());
app.get('/', (req, res) => res.redirect('/graphql'));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.use('/graphql', jsonGraphqlExpress.default(data));
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
