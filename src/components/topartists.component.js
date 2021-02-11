import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class TopArtists extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        let artistCard;

        if (!this.props.isValidSession) {
            return <Redirect to='/login'/>
        }
        else if (this.props.topArtists) {
            artistCard =             
            <div className="top-artists-wrapper">
                <section class="top-artists-section">
                    <h1>Top Artists</h1>
                    {this.props.topArtists.map(topArtists => (
                        <a href={topArtists.external_urls['spotify']}>
                            <div className="top-artists shadow card">
                                <img class="card-img top-artists-img" data-mdb src={topArtists.images[0]['url']}/>
                                <div className="card-body">
                                    {topArtists.name}
                                </div>
                            </div>
                        </a>
                    ))}
                </section>
            </div>
        }
        else {
            artistCard =
            <div>
                Loading...
            </div>
        }

        return (
            <div>
                {artistCard}
            </div>
          );
        }
    }