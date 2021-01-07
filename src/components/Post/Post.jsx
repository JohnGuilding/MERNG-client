import React, { useContext } from "react";
import styles from "./Post.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "./../../context/auth";
import LikeButton from "../LikeButton";
import DeleteButton from './../DeleteButton';

const Post = (props) => {
    const {
        body,
        createdAt,
        id,
        username,
        likeCount,
        commentCount,
        likes,
    } = props.post;

    const { user } = useContext(AuthContext);

    return (
        <article className={styles.post}>
            <h2 className={styles.user}>{username}</h2>
            <p className={styles.body}>{body}</p>
            <Link to={`/posts/${id}`} className={styles.date}>
                <p>{moment(createdAt).fromNow(true)}</p>
            </Link>

            <div className={styles.likeBtn}>
                <LikeButton user={user} post={{ id, likes, likeCount }}/>
            </div>

            <Link to={`/posts/${id}`}>
                <div className={styles.commentBtn}>
                    <button>comment</button>
                    <div>{commentCount}</div>
                </div>
            </Link>

            {user && user.username === username && (
                <div className={styles.deleteBtn}>
                    <DeleteButton postId={id} />
                </div>
            )}
        </article>
    );
};

export default Post;
