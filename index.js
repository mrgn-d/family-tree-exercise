const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema')

// const jsonGraphqlExpress = require('json-graphql-server');
const data = require('./data');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const getPersonWithRelations = (id) => {
    const person = data.people.find(p => p.id == id)
    const { spouseId, parentId1, parentId2 } = person;

    const spouse = data.people.find((p) => p.id == spouseId)
    const parent1 = data.people.find((p) => p.id == parentId1)
    const parent2 = data.people.find((p) => p.id == parentId2)

    return {
        ...person,
        spouse,
        parent1,
        parent2
    }
}

const resolvers = {
    Query: {
        allPeople: () => {
            const people = data.people

            return people.map(p => getPersonWithRelations(p.id))
        },
        person: (parent, args, context, info) => getPersonWithRelations(args.id)
    }
  };

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.use(cors());
app.get('/', (req, res) => res.redirect('/graphql'));
// app.use('/graphql', jsonGraphqlExpress.default(data));
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
