import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Draggable from 'react-draggable';
import { get } from './utils/api';
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';

import Redirect from "./components/redirect.component";
import Player from "./components/player.component";
import TopArtists from "./components/topartists.component";
import TopTracks from "./components/toptracks.component";
import Profile from "./components/profile.component";
import RecentlyPlayed from "./components/recentlyplayed.component";
import TracksByDecade from "./components/tracksbydecade.component";
import Collage from "./components/collage.component";

const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-top-read",
    "user-read-recently-played",
];

const requestHref = `${process.env.REACT_APP_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}` +
                    `&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

class App extends Component {
    constructor() {
        super();

        this.state = {
            expirationTime: '0',
            isValidSession: false,
            topArtists: null,
            topTracks: null,
            profile: null,
            currentlyPlaying: null,
            recentlyPlayed: null
        };
    }

    isValidSession = () => {
        const currentTime = new Date().getTime();
        const expirationTime = localStorage.getItem('expiration_time');
        const isValid = currentTime < expirationTime;

        return isValid;
    }

    getTopArtists = async () => {
        try {        
            const API_TOP_ARTISTS_URL = "https://api.spotify.com/v1/me/top/artists";
            const topArtistsResult = await get(API_TOP_ARTISTS_URL);

            this.setState({
                topArtists: topArtistsResult.items
            })

            const topArtistsArr = [];
            Object.keys(this.state.topArtists).map(i => topArtistsArr.push(this.state.topArtists[i]));
            this.setState({topArtists: topArtistsArr});
        }
        catch (error) {
            console.log('Top artists request error', error);
        }
    }

    getTopTracks = async () => {
        try {
            const API_TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks";
            const topTracksResult = await get(API_TOP_TRACKS_URL);

            this.setState({
                topTracks: topTracksResult.items
            })

            const topTracksArr = [];
            Object.keys(this.state.topTracks).map(i => topTracksArr.push(this.state.topTracks[i]));
            this.setState({topTracks: topTracksArr});
        }
        catch (error) {
            console.log('Top tracks request error', error);
        }
    }

    getUserProfile = async () => {
        try {
            const API_PROFILE_URL = "https://api.spotify.com/v1/me";
            const profileResult = await get(API_PROFILE_URL);

            this.setState({
                profile: profileResult
            })
        }
        catch (error) {
            console.log('Profile request error', error);
        }
    }

    getCurrentlyPlaying = async () => {
        try {
            const API_CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
            const currentlyPlayingResult = await get(API_CURRENTLY_PLAYING_URL);
            
            this.setState({
                currentlyPlaying: currentlyPlayingResult
            })
        }
        catch (error) {
            console.log('Currently playing request error.', error);
        }
    }

    getRecentlyPlayed = async () => {
        try {
            const API_RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played";
            const recentlyPlayedResult = await get(API_RECENTLY_PLAYED_URL);

            this.setState({
                recentlyPlayed: recentlyPlayedResult.items
            })

            const recentlyPlayedArr = [];
            Object.keys(this.state.recentlyPlayed).map(i => recentlyPlayedArr.push(this.state.recentlyPlayed[i]));
            this.setState({recentlyPlayed: recentlyPlayedArr});
        }
        catch (error) {
            console.log('Recently played request error.', error);
        }
    }

    componentDidMount() {
        let expiration;

        try {
            expiration = JSON.parse(localStorage.getItem('expiration_time'));
        }
        catch (error) {
            expiration = '0';
        }

        this.setState({expirationTime: expiration});
        const isValid = this.isValidSession();
        this.setState({isValidSession: isValid});

        if (isValid) {
            localStorage.setItem('is_logged_in', true);
        }
        else {
            localStorage.setItem('is_logged_in', false);
        }

        this.getTopTracks();
        this.getTopArtists();
        this.getUserProfile();
        this.getCurrentlyPlaying();
        this.getRecentlyPlayed();

        if (isValid) {
            setInterval(()=> this.getCurrentlyPlaying(), 1000);
        }
    }

    render() {
        let player, profile, loginButton;

        loginButton = 
        <a href={requestHref}>
            <button type="button" class="btn btn-primary btn-success navbar-btn">Login to Spotify</button>
        </a>

        if (this.state.isValidSession) {
            player = 
                <div>
                    <Player isValidSession={this.isValidSession} currentlyPlaying={this.state.currentlyPlaying}>
                    </Player>
                </div>

            profile =
                <div className="text-center">
                    <Profile isValidSession={this.isValidSession} profile={this.state.profile}>
                    </Profile>
                </div>
        }
        
        return (
            <Router>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-inner navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">Cantio</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarStats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Stats
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarStats">
                                        <Link to="/topartists" class="dropdown-item" href="#">Top Artists</Link>
                                        <Link to="/toptracks" className="dropdown-item" href="#">Top Tracks</Link>
                                        <Link to="/recentlyplayed" className="dropdown-item" href="#">Recently Played</Link>
                                    </div>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/tracksbydecade" className="nav-link">Top Tracks by Decade</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/collage" className="nav-link">Collage</Link>
                                </li>
                            </ul>
                            {loginButton}
                        </div>
                    </nav>
                    <div>
                        {profile}
                    </div>
                    <Draggable>
                        <div>
                            {player}
                        </div>
                    </Draggable>
                    <Route path='/redirect' component={Redirect} />
                    <Route path="/toptracks" 
                                 render={(props) => (
                                    <TopTracks
                                    isValidSession={this.state.isValidSession} topTracks={this.state.topTracks} 
                                    {...props} />
                                 )}
                    />
                    <Route path="/topartists" 
                                 render={(props) => (
                                    <TopArtists
                                    isValidSession={this.state.isValidSession} topArtists={this.state.topArtists} 
                                    {...props} />
                                 )}
                    />
                    <Route path="/recentlyplayed" 
                                 render={(props) => (
                                    <RecentlyPlayed
                                    isValidSession={this.state.isValidSession} recentlyPlayed={this.state.recentlyPlayed} 
                                    {...props} />
                                 )}
                    />
                    <Route path="/tracksbydecade"
                                 render={(props) => (
                                    <TracksByDecade
                                    isValidSession={this.state.isValidSession} topTracks={this.state.topTracks}
                                    {...props} />
                                 )}
                    />
                    <Route path="/collage"
                                 render={(props) => (
                                     <Collage
                                     isValidSession={this.state.isValidSession} topTracks={this.state.topTracks} topArtists={this.state.topArtists}
                                     {...props} />
                                 )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;