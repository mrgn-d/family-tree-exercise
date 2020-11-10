import Head from 'next/head'
import { useRouter } from 'next/router'

import Link from 'next/link';
import TreeNode from 'components/TreeNode'

import { gql, useQuery } from '@apollo/client';

const GET_PEOPLE = gql`
  query allPeople {
    allPeople {
      id
      name
      born
      spouseId
      hometown
      parentId1
      parentId2
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Head>
        <title>Family Tree</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Family Tree
        </h1>

        <p>
          Select a profile to view more information
        </p>

        {data.allPeople.map((person) => {
          return (
            <TreeNode person={person} key={person.id} />
          )
        })}
      </main>
    </div>
  )
}
