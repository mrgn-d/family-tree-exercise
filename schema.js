const { gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    id: ID!
    name: String
    born: String
    spouseId: ID
    parentId1: ID
    parentId2: ID
    hometown: String
    spouse(id: ID!): Person
    parent1(id: ID!): Person
    parent2(id: ID!): Person
  }

  type allPeople {
      people: [Person]!
  }
`;

module.exports = typeDefs;