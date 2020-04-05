import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class Header extends Component {
    handleLogout() {

    }

    render() {
        return (
            <div>
                <header className="header-n">
                    <nav className="navbar-n">
                        <Link className="navbar-item-n navbar-brand-n" to="/">
                            <h1 className="title has-text-white">ComBud.</h1>
                        </Link>
                        {this.props.loggedIn ? <><div className="navbar-item-n signout-btn" style={{ float: "right", marginRight: "1rem" }}><Link className="button is-primary is-inverted" onClick={this.handleLogout}>Sign-out</Link></div><div className="navbar-item-n" style={{ float: "right", marginRight: "1rem" }}><a className="button is-link" href="/app">Open ComBud</a></div></> : <><div className="navbar-item-n signout-btn" style={{ float: "right", marginRight: "1rem " }}><Link className="button is-primary is-inverted" to="/login">Sign-in</Link></div></>}
                    </nav>
                </header>

            </div>
        )
    }
}
