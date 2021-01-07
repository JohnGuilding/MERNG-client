import React, { useContext, useState } from "react";
import styles from "./Register.module.scss";
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { PromiseProvider } from "mongoose";

import { AuthContext } from '../../context/auth';
import { useForm } from '../../utilities/hooks';

const Register = (props) => {
  const context = useContext(AuthContext);
  const [ errors, setErrors ] = useState({});

  const { handleChange, handleSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }); 

  const [ addUser, { loading } ] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData }}){
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function registerUser(){
    addUser();
  }
  // hoisting means 'function' keyword is used so that page can access everything when it needs it
  // const registerUser = () => {
  //   addUser();
  // }

  const loadMessage = loading ? styles.loading : '';

  return (
    <section className={styles.register}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={`${styles.form} ${loadMessage}`}>
        <label htmlFor="username">Username</label>
        <input 
          type="text"   
          id="username"
          value={values.username}
          error={errors.username ? true : false}
          name="username" 
          onChange={handleChange} 
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input 
          type="email"  
          id="email"
          value={values.email} 
          error={errors.email ? true : false}
          name="email" 
          onChange={handleChange} 
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password"
          value={values.password} 
          error={errors.password ? true : false}
          name="password" 
          onChange={handleChange} 
          placeholder="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword"
          value={values.confirmPassword} 
          error={errors.confirmPassword ? true : false}
          name="confirmPassword" 
          onChange={handleChange} 
          placeholder="confirm password"
        />
        <input type="submit"/>
      </form>
      {Object.keys(errors).length > 0 && (
        <div>
          <ul className={styles.list}>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
