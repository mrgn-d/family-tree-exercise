import React from 'react';
import { css } from "@emotion/core";
import Link from 'next/link';

import { gql } from '@apollo/client';

export default function TreeNode({ person }) {
    return (
        <Link
            href={`/${person.id}`}
            key={person.id}
        >
            <a>
            <div
                css={css`
                        display: block;
                        height: 50px;
                        width: 200px;
                        background-color: #DADED4;
                        border: 1px solid #a6bdb7;
                        padding: 8px;
                        margin: 4px;
                    `}
            >
                {person.name}
            </div>
            </a>
        </Link>
    )
}

TreeNode.fragments = {
    product: gql`
        fragment TreeNodeDetails on Person {
          name
        }
      `,
  };

