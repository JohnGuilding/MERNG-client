import React, { useEffect, useState } from "react";
import styles from "./LikeButton.module.scss";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const LikeButton = ({ user, post: { id, likes, likeCount }}) => {

    const [ liked, setLiked ] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    });

    const likeBtn = user ? (
        liked ? (
            <button className={styles.liked} onClick={likePost}>like</button>
        ) : (
            <button onClick={likePost}>like</button>
        )
    ) : (
        <Link to='/login'>
            <button onClick={likePost}>like</button>
        </Link>
    )
    // const likeButton = user ? styles.liked : styles.notSignedIn;

    return (
        <>
            <div className={styles.likeBtn}>
                {likeBtn}
                <div>{likeCount}</div>
            </div>
        </>
    );
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
