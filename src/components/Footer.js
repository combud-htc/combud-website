import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p className="has-text-grey">
                        <strong>ComBud</strong> <br/>made by{" "}<br/>
                        <strong>Jacob Wennebro, Vilhelm Bergsøe and Alex Howe</strong>.
                    </p>
                </div>
            </footer>
        )
    }
}
