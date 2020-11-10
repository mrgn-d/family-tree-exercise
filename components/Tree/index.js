import React from 'react';
import { css } from "@emotion/core";
import TreeNode from 'components/TreeNode'

export default function Tree({ person }) {
    if (!person) {
        return null
    }
    
    const { children = [] } = person

    return (
        <div
            css={css`
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
            `}
        >
                <div css={css`
                    display: flex;
                    flex-direction: column;
                `}>
                    <div css={css`
                        display: flex;
                        flex-direction: row;
                    `}>
                        <TreeNode person={person} key={person.id} />
                        {person.spouse ? <TreeNode person={person.spouse} key={person.spouse.id} /> : null}
                    </div>
                    <div
                        css={
                            css`
                                display: flex;
                                flex-direction: row;
                            `
                        }
                    >
                        {children.map((p) => <Tree person={p} />)}
                    </div>
                </div>
        </div>
    )
}

