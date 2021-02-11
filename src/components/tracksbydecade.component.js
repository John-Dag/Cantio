import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class TracksByDecade extends Component {
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
            let sortedTracks = this.props.topTracks.sort((a, b) => parseInt(new Date(a.album.release_date).getFullYear()) - 
                                                                   parseInt(new Date(b.album.release_date).getFullYear()));
            let trackYears = [];

            topTracks = 
            <div className="tracks-by-decade-wrapper">
                <section class="tracks-by-decade-section">
                    {sortedTracks.map(track => {
                        let trackYear = Math.floor(parseInt(new Date(track.album.release_date).getFullYear() / 10) * 10);

                        if (!trackYears.includes(trackYear)) {
                            trackYears.push(trackYear);

                            return (
                                <span>
                                    <h1>{trackYear}</h1>
                                    <a href={track.external_urls['spotify']}>
                                        <div className="tracks-by-decade shadow card">
                                            <img class="card-img" src={track.album.images[0]['url']}/>
                                            <div className="card-body">
                                                {track.name}
                                            </div>
                                        </div>
                                    </a>
                                </span>
                            );
                        }
                        else {
                            return (
                                <a href={track.external_urls['spotify']}>
                                    <div className="tracks-by-decade shadow card">
                                        <img class="card-img" src={track.album.images[0]['url']}/>
                                        <div className="card-body">
                                            {track.name}
                                        </div>
                                    </div>
                                </a>
                            );
                        }})}
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