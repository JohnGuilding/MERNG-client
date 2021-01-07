import React, { useState } from "react";
import styles from "./DeleteButton.module.scss";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { FETCH_POSTS_QUERY } from '../../utilities/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {

    const [ confirmOpen, setConfirmOpen ] = useState(styles.closed);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                // CHANGED CODE (SAME AS PostForm). WORKS NOW BUT NOT SURE WHY
                let newData = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, 
                    data: {
                        ...data,
                        getPosts: {
                            newData
                        }
                    } 
                });
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <>
            <div>
                <button onClick={() => setConfirmOpen(styles.open)}>Delete</button>
            </div>
            <div className={`${styles.model} ${confirmOpen}`}>
                <button onClick={() => setConfirmOpen(styles.closed)}>Cancel</button>
                <button onClick={deletePostOrMutation}>Delete</button>
            </div>
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id 
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export default DeleteButton;
