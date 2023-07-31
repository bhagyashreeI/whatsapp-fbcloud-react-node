import React from 'react';
import noimage from "./../../images/noimage.png"
export const ChatConatctList = () => {
    return (
        <div>
            <ul className="list-group">
                <li key="sm1" className="list-group-item list-group-item-action list-group-item-light">
                    <img src={noimage} alt="loading" heigth="50" width="50"/>
                    <small className="text-muted">Loading</small>
                </li>
                <li key="sm2" className="list-group-item list-group-item-action list-group-item-light">
                    <img src={noimage} alt="loading" heigth="50" width="50"/>    
                    <small className="text-muted">Loading</small>
                </li>
                <li key="sm3" className="list-group-item list-group-item-action list-group-item-light">
                    <img src={noimage} alt="loading" heigth="50" width="50"/>    
                    <small className="text-muted">Loading</small>
                </li>
            </ul>
        </div>
    )
}

export const PersonChat = () => {
    return (
        <div className="chat-shimmer-box">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="shimmer"></div>
        </div>
    )
}
