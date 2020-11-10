import React from 'react';
import { css } from "@emotion/core";

import { gql } from '@apollo/client';

export default function TreeNode({ person }) {
    return (
        <div
            css={css`
                    display: block;
                    height: 50px;
                    width: 200px;
                    background-color: #DADED4;
                    border: 1px solid #3C403D;
                    padding: 8px;
                    margin: 4px;
                `}
        >
            {person.name}
        </div>
    )
}

TreeNode.fragments = {
    product: gql`
        fragment TreeNodeDetails on Person {
          name
        }
      `,
  };

