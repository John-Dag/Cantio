import React, { Component } from 'react';
import { get, post } from '../utils/api';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class Player extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            token: null,
            item: {
                album: {
                    images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms: 0,
            },
            is_playing: "Paused",
            progress_ms: 0
        };
    }

    getResult = async () => {
        try {
            const API_PLAYER_URL = "https://api.spotify.com/v1/me/player";
            const playerResult = await get(API_PLAYER_URL);

            this.setState({
                item: playerResult.item,
                is_playing: playerResult.is_playing,
                progress_ms: playerResult.progress_ms,
            });
        } 
        catch (error) {
            console.log('error', error);
        }
    }

    componentDidMount() {
        this.getResult();
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentlyPlaying !== prevProps.currentlyPlaying) {
            this.getResult();
        }
    }

    render() {
        let player;

        if (!this.props.isValidSession) {
            return <Redirect to='/login'/>
        }
        else if (this.state.item) {
            player =             
            <div>
                <div className="collapse show" id="now-playing">
                <div className="now-playing-album-art card">
                    <img class="card-img-top" src={this.state.item.album.images[0].url} alt="Card image cap"/>
                    <div className="card-body">
                        {this.state.item.name}
                    </div>
                    <div className="card-text">
                        {this.state.item.artists[0].name}
                    </div>
                </div>
                </div>
            </div>
        }
        else {
            player = null;
        }

        return (
            <div>
                {player}
            </div>
          );
        }
    }