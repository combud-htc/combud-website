import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <section className="about" id="about">
                <div className="content">
                    <h1 className="title">How it works.</h1>
                    <p>
                    {`
                        This platform helps you help others. As a result of the COVID-19 pandemic, our everyday life have been turned upside down. People all over the world are getting laid off and many can't go outside of their home for various reasons.
                        
                        In times like this we must stick up for one another and spread some love. By registering an account you can access a list over people in your area in need of your assistance, whether it is to buy bread and milk or pick up mail at the post office. 

                        Or maybe it is you who needs help to do something outside of your home. You can easily post a request describing what you need so the provider knows exactly what you want and can bring it to your doorstep. 

                        Join us on the voluntary effort to help our brothers and sisters in need. Stay safe!
                    `}
                    </p>
                    <div className="columns">
                        <div className="column">

                        </div>
                        <div className="column">

                        </div>
                        <div className="column">

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
