import axios from 'axios';

export const SET_ALBUMS = 'SET_ALBUMS';
export const ADD_ALBUMS = 'ADD_ALBUMS';
export const SET_ARTISTS = 'SET_ARTISTS';

export const getParamValues = (url) => {
    return url
        .slice(1)
        .split('&')
        .reduce((prev, curr) => {
            const [title, value] = curr.split('=');
            prev[title] = value;
            window.location.hash = "";
            
            return prev;
        }, {});
};

export const setAuthHeader = () => {
    try {
        const params = JSON.parse(localStorage.getItem('params'));

        if (params) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;
        }
    }
    catch (error) {
        console.log('Error setting auth', error);
    }
};