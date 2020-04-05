import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p className="has-text-grey">
                        <strong>ComBud</strong> created by{" "}
                        <a href="https://github.com/JacobWennebro" target="_blank">Jacob Wennebro</a>, <a href="https://github.com/vilhelmbergsoe" target="_blank">Vilhelm Bergsøe</a> and <a href="https://github.com/unlimitedcoder2" target="_blank">Alex Howe</a>
                        <br/>
                        <span>Made for Hack The Crisis 2020</span>
                    </p>
                </div>
            </footer>
        )
    }
}
