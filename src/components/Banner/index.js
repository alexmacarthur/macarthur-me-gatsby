import React from 'react'

import './index.scss';

const Banner = (props) => (
    <div className={"Banner" + (props.isAbsolute ? " is-absolute" : "")}>
        <div className="Banner-text">
            <p>
                My wife &amp; I are adopting!
                <a className="Banner-cta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    href="https://adopt.macarthur.me">Learn how you can help here.</a>
            </p>
        </div>
    </div>
)

export default Banner
