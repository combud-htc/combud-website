import React, { Component } from 'react'
import Map from '../components/Map'
import NewPost from '../components/app-pages/NewPost'
import Feed from '../components/app-pages/Feed'
import Settings from '../components/app-pages/Settings'

export default class app extends Component {
    constructor() {
        super();

        this.state = {
            page: Feed
        }
    }
    render() {
        return (
            <div className="app-layout">
                <div className="app-header">
                    <div className="centerer">
                        <button onClick={() => this.setState({page: NewPost})} className="button is-primary">New post</button>
                        <button onClick={() => this.setState({page: Feed})} className="button is-primary">Feed</button>
                        <div className="right-content">
                            <button onClick={() => this.setState({page: Settings})} className="button is-primary is-light"><i className="fas fa-cog"></i></button>
                        </div>
                    </div>
                </div>
                <div className="page">
                    <this.state.page/>
                </div>
            </div>
        )
    }
}
