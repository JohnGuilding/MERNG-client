import React from "react";
import styles from "./PostForm.module.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../../utilities/hooks";
import { FETCH_POSTS_QUERY } from "./../../utilities/graphql";

const PostForm = () => {
    const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
        body: "",
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData]; 
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY, 
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    }
                } 
            });
            values.body = "";
        },
        onError(err) {
            console.log(err);
        },
    });

    // OLD CODE THAT DIDN'T WORK BUT DON'T KNOW WHY //
    // const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    //     variables: values,
    //     update(proxy, result){
    //         const data = proxy.readQuery({
    //             query: FETCH_POSTS_QUERY
    //         })
    //         data.getPosts = [result.data.createPost, ...data.getPosts];
    //         proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    //         values.body = '';
    //     }
    // });

    function createPostCallback() {
        createPost();
    }

    return (
        <section>
            <h1>Create a post:</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="body">Create Post</label>
                <input
                    type="text"
                    id="body"
                    value={values.body}
                    error={error ? true : false}
                    name="body"
                    onChange={handleChange}
                    placeholder="Hello World!"
                />
                <input type="submit" />
            </form>
            {error && (
                <div className={styles.errors}>
                    <p>{error.graphQLErrors[0].message}</p>
                </div>
            )}
        </section>
    );
};

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
