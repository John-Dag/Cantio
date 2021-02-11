import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class RecentlyPlayed extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        let recentlyPlayed = this.props.recentlyPlayed;

        if (!this.props.isValidSession) {
            return <Redirect to='/login'/>
        }
        else if (this.props.recentlyPlayed) {
            recentlyPlayed = 
            <div className="recently-played-wrapper">
                <section class="recently-played-section">
                <h1>Recently Played</h1>
                    {this.props.recentlyPlayed.map(track => (
                        <a href={track.track.external_urls['spotify']}>
                            <div className="recently-played shadow card">
                                <img class="card-img recently-played-img" src={track.track.album.images[0]['url']}/>
                                <div className="card-body">
                                    {track.track.name}
                                </div>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
        }

        return (
            <div>
                {recentlyPlayed}
            </div>
          );
        }
    }