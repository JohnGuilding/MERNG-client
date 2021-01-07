import React, { useContext, useState } from "react";
import styles from "./Login.module.scss";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from '../../context/auth';
import { useForm } from "../../utilities/hooks"; 

const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}) {
            context.login(userData)
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    const loadMessage = loading ? styles.loading : "";

    return (
        <section className={styles.login}>
            <h1>Login</h1>
            <form
                onSubmit={handleSubmit}
                className={`${styles.form} ${loadMessage}`}
            >
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
                <input type="submit" />
            </form>
            {Object.keys(errors).length > 0 && (
                <div>
                    <ul className={styles.list}>
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;
