import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class TopTracks extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        let topTracks;

        if (!this.props.isValidSession) {
            return <Redirect to='/login'/>
        }
        else if (this.props.topTracks) {
            topTracks = 
            <div className="top-tracks-wrapper">
                <section class="top-tracks-section">
                    <h1>Top Tracks</h1>
                    {this.props.topTracks.map(track => (
                        <a href={track.external_urls['spotify']}>
                            <div className="top-tracks shadow card">
                                <img class="card-img" src={track.album.images[0]['url']}/>
                                <div className="card-body">
                                    {track.name}
                                </div>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
        }

        return (
            <div>
                {topTracks}
            </div>
          );
        }
    }