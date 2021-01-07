import React, { useContext } from "react";
import styles from "./Home.module.scss";
import { useQuery } from '@apollo/client';

import { AuthContext } from '../../context/auth';
import Post from './../../components/Post';
import PostForm from './../../components/PostForm';
import { FETCH_POSTS_QUERY } from './../../utilities/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  
  const newsFeed = loading ? (
    <h2>Loading posts...</h2>
  ) : (
    data.getPosts.map(post => (
      <Post key={post.id} post={post}/>
    ))
  )

  return (
    <>
      {user && (
        <PostForm />
      )}
      <section className={styles.newsfeed}>
        {newsFeed}
      </section>
    </>
  );
};

export default Home;
