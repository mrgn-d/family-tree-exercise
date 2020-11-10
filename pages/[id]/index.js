import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import Tree from 'components/Tree';

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
        children {
            id
            name
        }
    }
  }
`;

export default function ProfileDetailsPage() {
    const router = useRouter();
    if (!router.query) {
        return 'LOADING!'
    }
    const personId = router.query.id;

    if (!personId) {
        return null
      }

    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id: personId },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.person)
    const { person } = data;

    const childrenComp = () => person.children.map((p) => {
        return <Link
            href={`/${p.id}`}
            >
                <a>{p.name}</a>
        </Link>
    })

    return (
        <div>
            <Link
                    href="/"
                >
                    <a>
                    Back to Family Tree
                    </a>
                </Link>
            <h1>{person.name}</h1>
            <ul>
                <li>
                    Hometown: {person.hometown}
                </li>
                <li>
                    Spouse: &nbsp; {person.spouse ? <Link
                        href={`/${person.spouse.id}`}
                    >
                        <a>{person.spouse.name}</a>
                    </Link> : 'No Spouse'}
                </li>
                <li>
                    Parent 1: &nbsp; {person.parent1 ?
                    <Link
                        href={`/${person.parent1.id}`}
                        >
                            <a>{person.parent1.name}</a>
                    </Link> : 'Unknown'}
                </li>
                <li>
                Parent 2: &nbsp;
                {person.parent2 ?
                    <Link
                        href={`/${person.parent2.id}`}
                        >
                            <a>{person.parent2.name}</a>
                    </Link> : 'Unknown'}
                </li>
                <li>
                Children: &nbsp;
                {person.children  && person.children.length > 0 ?
                        person.children.map((p, id) => {
                            return <Link
                                href={`/${p.id}`}
                                >
                                    <a>{p.name}</a>
                            </Link> 
                        }).reduce((prev, curr) => [prev, ', ', curr])
                 : 'Unknown'}
                </li>
            </ul>
            <Tree person={person} />
        </div>
    );
}