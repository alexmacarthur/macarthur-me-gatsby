import React from 'react'

import './index.scss';

class Banner extends React.Component {

    render() {
        return (
            <div className="Banner">
                <div className="Banner-text">
                    <p>
                        My wife &amp; I are adopting internationally!
                        <a className="Banner-cta" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            href="https://mystory.lifesongfororphans.org/stories/macarthurs-adopting-south-korea/">Please consider donating to our matching grant.</a>
                    </p>
                </div>
            </div>
        )
    }
}
export default Banner
