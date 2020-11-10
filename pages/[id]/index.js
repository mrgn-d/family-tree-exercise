import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';

import Link from 'next/link';

const GET_PERSON = gql`
query person($id: ID!) {
    person(id: $id) {
        id
        name
        born
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
    const { person } = data;

    return (
        <div>
            <h1>{person.name}</h1>
            <ul>
                <li>
                    Hometown: {person.hometown}
                </li>
                <li>
                    Spouse: {person.spouse ? <Link
                        href={`/${person.spouse.id}`}
                    >
                        <a>{person.spouse.name}</a>
                    </Link> : 'No Spouse'}
                </li>
                <li>
                    Parent 1: {person.parent1 ?
                    <Link
                        href={`/${person.parent1.id}`}
                        >
                            <a>{person.parent1.name}</a>
                    </Link> : 'Unknown'}
                </li>
                <li>
                Parent 2:
                {person.parent2 ?
                    <Link
                        href={`/${person.parent2.id}`}
                        >
                            <a>{person.parent2.name}</a>
                    </Link> : 'Unknown'}
                </li>
            </ul>
        </div>
    );
}