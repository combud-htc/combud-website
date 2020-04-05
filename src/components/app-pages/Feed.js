import React, { Component } from 'react'
import Slider from 'react-slick'
import Task from '../Task'
import NewPost from './NewPost'
import Map from '../Map'
import Modal from '../Modal'

export default class Feed extends Component {
    constructor() {
        super();

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.state = {
            modalTitle: "XD",
            modalDescription: "xD",
            modalActive: false
        }
    }

    openModal(data) {
        this.setState({
            modalTitle: data.title,
            modalDescription: data.description,
            modalActive: true
        });
    }

    closeModal() {
        this.setState({
            modalActive: false
        })
    }

    render() {
        return (
            <div className="feed animated fadeIn">
                <div className="columns">
                    <div className="column is-two-thirds">
                        <div className="main">
                            <div className="centerer">
                                <div className="area">
                                    <p><strong>YOUR AREA</strong></p>
                                    <h1 className="title">{this.props.user.town}, {this.props.user.country}</h1>
                                </div>
                                <div className="task-list">
                                    {
                                        this.props.tasks.map(el => (<Task openModal={() => this.openModal(el)} key={Math.random()} title={el.title} description={el.description} firstname={el.firstName} lastname={el.lastName} username={el.userName} />))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="map-container">
                            <Map user={this.props.user} tasks={this.props.tasks} location={this.props.location} />
                        </div>
                    </div>
                    <Modal title={this.state.modalTitle} closeModal={this.closeModal} description={this.state.modalDescription} modalActive={this.state.modalActive} />
                </div>
            </div>
        )
    }
}
