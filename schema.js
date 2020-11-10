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
    spouse: Person
    parent1: Person
    parent2: Person
  }

  type Query {
    allPeople: [Person]
    person(id: ID): Person
  }
`;

module.exports = typeDefs;