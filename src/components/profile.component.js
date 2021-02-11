import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "../style/stats.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profile;

        if (!this.props.isValidSession) {
            return <Redirect to='/login'/>
        }
        else if ((this.props.profile) && (this.props.profile.images.length > 0)) {
            profile = 
            <section class="profile-section">
                <div className="profile-wrapper">
                    <div className="card profile">
                        <img className="card-img" src={this.props.profile.images[0]['url']}/>
                        <div className="card-body profile-card-body">
                            <h5 class="card-title">
                                {this.props.profile.display_name}
                            </h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">{this.props.profile.followers.total} Followers</li>
                                <a class="no-style" href={this.props.profile.external_urls['spotify']}>
                                    <li class="list-group-item">Profile</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        }
        else if (this.props.profile) {
            profile =
            <section class="profile-section">
                <div className="profile-wrapper">
                    <div className="card profile">
                        <div className="card-body profile-card-body">
                            <h5 class="card-title">
                                {this.props.profile.display_name}
                            </h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">{this.props.profile.followers.total} Followers</li>
                                <a class="no-style" href={this.props.profile.external_urls['spotify']}>
                                    <li class="list-group-item">Profile</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        }

        return (
            <div>
                {profile}
            </div>
          );
        }
    }