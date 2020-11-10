import Head from 'next/head'

import Tree from 'components/Tree'

import { gql, useQuery } from '@apollo/client';

const GET_PEOPLE = gql`
  query allPeople {
    allPeople {
      id
      name
      born
      spouseId
      spouse {
        id
        name
      }
      hometown
      parent1 {
        id
        name
      }
      parent2 {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return (<div>Loading...</div>);
  if (error) return (<div>`Error! ${error.message}`</div>);

  const nodes = data.allPeople.map((p) => ({
    ...p,
    parents: [p.parent1, p.parent2]
  }))

  const startingNodes = nodes.filter((p) => !p.parentId1 && !p.parentId2)
  const spousePairs = nodes.map((p) => {
    const pair = [parseInt(p.id), parseInt(p.spouseId)]
    return pair.sort()
  })
  const dedupedSpousePairs = spousePairs.map(JSON.stringify)
  const spouseUniqueStrings = new Set(dedupedSpousePairs)
  const uniqueSpousePairs = Array.from(spouseUniqueStrings, JSON.parse)

  const familyStartNodes = uniqueSpousePairs.map((p) => startingNodes.find((n) => p[0] == n.id))

  return (
    <div>
      <Head>
        <title>Family Tree</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1>
          Family Tree
        </h1>

        <p>
          Select a profile to view more information
        </p>
        {familyStartNodes.map((person) => {
          return (
            <div>
              <Tree person={person} />
              <hr/>
            </div>
          )
        })}
    </div>
  )
}
