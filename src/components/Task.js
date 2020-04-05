import React, { Component } from 'react'

export default class Task extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="box task">
                <div className="content">
                    <h1 className="is-size-4">{this.props.title}</h1>
                    <p>Posted by {this.props.firstname} {this.props.lastname} (@{this.props.username})</p>
                    <p className="description-text">{this.props.description}</p>
                    <button onClick={this.props.openModal} className="button is-link">View</button>
                </div>
            </div>
        )
    }
}
