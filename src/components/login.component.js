import React, { Component } from 'react';

const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-read-recently-played",
];

const redirect = `${process.env.REACT_APP_REDIRECT_URL}`;
const encodedRedirect = encodeURIComponent(redirect);
const requestHref = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=` + encodedRedirect +
                    `&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

export default class Login extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const isLoggedIn = localStorage.getItem('is_logged_in');
        let loginButton;
      
        if ((!isLoggedIn) || (isLoggedIn == "false")) {
            loginButton = 
            <div className="login-page">
                <section className="login-main container-fluid">
                        <h1>Cantio</h1>
                        <h6>Login with your Spotify account to view your listening habits.</h6>
                        <a className="btn btn-login-link btn-success" href={requestHref}>
                        Login with Spotify
                        </a>
                </section> 
                <img class="mx-auto d-block" src={process.env.PUBLIC_URL + "/cantio_main.png"}></img>
            </div>
        }
        
        return (
            <div>
                {loginButton}
            </div>
        );
    }
}
