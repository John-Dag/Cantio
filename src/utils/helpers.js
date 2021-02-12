import axios from 'axios';

export const SET_ALBUMS = 'SET_ALBUMS';
export const ADD_ALBUMS = 'ADD_ALBUMS';
export const SET_ARTISTS = 'SET_ARTISTS';

//Function from the Spotify implicit grant examples.
export const getParamValues = (url) => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(2);

    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
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