import React, { Component } from 'react';
import { getParamValues } from '../utils/helpers';

export default class Redirect extends React.Component {
    constructor() {
        super();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        const {
            history,
            location,
        } = this.props;

        localStorage.setItem('is_logged_in', false);

        try {
            const access_token = getParamValues(location.hash);
            const expirationTime = new Date().getTime() + access_token.expires_in * 1000;

            localStorage.setItem('params', JSON.stringify(access_token));
            localStorage.setItem('expiration_time', expirationTime);
        }
        catch (error) {
            history.push('/');
        }
    }
    render() {
        return null;
    }
}