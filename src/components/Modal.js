import React, { Component } from 'react'

export default class Modal extends Component {

    render() {
        return (
            <div>
                {this.props.modalActive ? <div class="modal is-active">
                    <div class="modal-background" onClick={this.props.closeModal} ></div>
                    <div class="modal-card animated fadeInUp">
                        <header class="modal-card-head">
                            <p class="modal-card-title">{this.props.title}</p>
                            <button class="delete" aria-label="close" onClick={this.props.closeModal}></button>
                        </header>
                        <section class="modal-card-body">
                            {this.props.description}
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success">Accept</button>
                            <button class="button" onClick={this.props.closeModal} > Cancel</button>
                        </footer>
                    </div>
                </div> : <></>}
            </div>
        )
    }
}
