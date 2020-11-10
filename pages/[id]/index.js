import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';

import Link from 'next/link';

const GET_PERSON = gql`
query Person($id: ID!) {
    Person(id: $id) {
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

const GET_FAMILY = gql`
query Person($id: ID!) {
    Person(id: $id) {
        id
    }
  }
`;

export default function ProfileDetailsPage() {
    const router = useRouter();
    console.log(router)
    if (!router.query) {
        return 'LOAING!'
    }
    const personId = router.query.id;
    console.log(router.query.id)

    if (!personId) {
        return null
      }

    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id: personId },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    const { Person: person } = data;

    return (
        <div>
            <h1>{person.name}</h1>
            <ul>
                <li>
                    Hometown: {person.hometown}
                </li>
                <li>
                    Spouse: <Link
                        href={`/${person.spouseId}`}
                    >
                        <a>{person.spouseId}</a>
                    </Link>
                </li>
                <li>
                    Parent 1: 
                    <Link
                        href={`/${person.parentId1}`}
                    >
                        <a>{person.parentId1}</a>
                    </Link>
                </li>
                <li>
                Parent 2:
                <Link
                    href={`/${person.parentId2}`}
                >
                    <a>{person.parentId2}</a>
                </Link>
                </li>
            </ul>
        </div>
    );
}