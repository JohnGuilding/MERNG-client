import React, { useContext, useRef, useState } from "react";
import styles from "./SinglePost.module.scss";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import moment from "moment";

import { AuthContext } from "./../../context/auth";
import LikeButton from "./../../components/LikeButton";
import DeleteButton from "./../../components/DeleteButton";

const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    
    const [ comment, setComment ] = useState('');

    let post = {};

    const {
        loading,
        error,
        // was trying to destructure data before it had loaded below, fixed with post variable
        // data: { getPost }
        data
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    const [ submitComment ] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
            // TODO: check blur keyword
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    const deletePostCallback = () => {
        props.history.push('/');
    }

    // Had trouble rendering data from MongoDB before it had loaded. Overcame this with a series of ternary/if statements //
    if (data) {
        post = data.getPost;
    }
    
    if (error) console.log(`Error! ${error.message}`);
    if (!loading) console.log(loading); 

    let postMarkup;
    if (!post) {
        postMarkup = <p>Loading post..</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount,
        } = post;

        console.log(comments);

        const loadedComments = comments ? (
            comments.map((comment) => (
                <article key={comment.id} className={styles.comment}>
                    {user && user.username === comment.username && (
                        <DeleteButton postId={id} commentId={comment.id} className={styles.deleteBtn}/>
                    )}
                    <h2 className={styles.user}>
                        {comment.username}
                    </h2>
                    <p className={styles.date}>
                        {moment(comment.createdAt).fromNow()}
                    </p>
                    <p className={styles.body}>
                        {comment.body}
                    </p>
                </article>
            )) 
        ) : (
            <h2>Comments Loading...</h2>
        )

        const loadedLikeComponent = data ? (
            <LikeButton user={user} post={{ id, likes, likeCount }}/>   
        ) : (
            <h2>Likes Loading...</h2>
        )
        // end of ternay/if statements 

        postMarkup = (
            <>
                <div className={styles.postPage}>
                    <article className={styles.post}>
                        <h2 className={styles.user}>{username}</h2>
                        <p className={styles.body}>{body}</p>
                        <div className={styles.date}>
                            <p>{moment(createdAt).fromNow(true)}</p>
                        </div>

                        <div className={styles.likeBtn}>
                            {loadedLikeComponent}
                        </div>

                        <div className={styles.commentBtn}>
                            <button>comment</button>
                            <div>{commentCount}</div>
                        </div>

                        {user && user.username === username && (
                            <div className={styles.deleteBtn}>
                                <DeleteButton postId={id} callback={deletePostCallback} />
                            </div>
                        )}
                    </article>
                    {user && (
                        <div className={styles.formContainer}>
                            <p>Post A Comment</p>
                            <form className={styles.form}>
                                <input 
                                    type="text"
                                    placeholder="Comment..."
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    ref={commentInputRef}
                                />
                                <button 
                                    type="submit"
                                    disabled={comment.trim() === ''}
                                    onClick={submitComment}
                                >
                                    Add Comment
                                </button>
                            </form>
                        </div>
                    )}
                    {loadedComments}
                </div>
            </>
        );
    }
    return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
    # postId should have a type of ID!
    mutation($postId: String!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;
