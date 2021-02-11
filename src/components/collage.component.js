import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class Collage extends Component {
    constructor(props) {
        super(props);
    }

    randomizeArtistsTracks() {
        let combinedArr = this.props.topTracks.concat(this.props.topArtists);

        for (let i = combinedArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = combinedArr[i];
            combinedArr[i] = combinedArr[j];
            combinedArr[j] = temp;
        }

        return combinedArr;
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
            let randomizedArtistsTracks = this.randomizeArtistsTracks();

            topTracks = 
            <div className="collage-wrapper">
                <section class="collage-section">
                    {randomizedArtistsTracks.map(track => {
                        if (track.album) {
                            return (
                                <a href={track.external_urls['spotify']}>
                                    <div className="collage shadow card">
                                        <img class="card-img" src={track.album.images[0]['url']}/>
                                    </div>
                                </a>
                            );
                        }
                        else {
                            return (
                                <a href={track.external_urls['spotify']}>
                                <div className="collage shadow card">
                                    <img class="card-img" src={track.images[0]['url']}/>
                                </div>
                            </a>
                            )
                        }
                    })}
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