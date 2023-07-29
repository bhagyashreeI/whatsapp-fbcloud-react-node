import React,{useState,useEffect} from 'react'
import noimage from "./../images/noimage.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib,faSearch } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {ChatConatctList,PersonChat} from "./layout/Shimmer"
import { API_URL } from './../utils/constants';

const Chat = () => {

    const [contactlist,setContactlist] = useState([]);
    const [filteredContactlist,setFilteredContactlist] = useState([]);
    const [selectedPerson,setSelectedPerson] = useState([]);
    const [formData, setFormData] = useState({
        mobileNumber: ""
    });
    const { mobileNumber } = formData;
    

    const fetchList = async() => {
        const data = await fetch(API_URL+"api/all/contacts");
        const json = await data.json();
        setContactlist(json)
        setFilteredContactlist(json);
        fetchPersonChat(json[0].mobilenumber);
    }
    const inputNumberHandler = (e) =>{
        setFormData({
            ...formData, ['mobileNumber']: e.target.value
        })
        if(e.target.value === ''){
            setFilteredContactlist(contactlist)
        }else{
            const filteredList =  contactlist.filter((res) => res?.name?.toLowerCase()?.includes(e.target.value.toLowerCase()));
            setFilteredContactlist(filteredList);
        }
            
    }

    const fetchPersonChat = async(waid) => {
        alert(waid)
        const data = await fetch(API_URL+"api/contact-chat?q=" + waid)
        const json = await data.json();
        setSelectedPerson(json[0])
    }
    

    useEffect(()=>{
        fetchList()
    },[])

    return (
        <div className="chat-container-main">
    <div className="page-title">
        <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <h5 className="title">Whatsapp Chat</h5>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
        </div>
    </div>
    <div className="content-wrapper">
        <div className="row gutters">

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                <div className="card m-0">

                    <div className="row no-gutters">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                            <div className="users-container">
                                <div className="chat-search-box">
                                    <div className="input-group">
                                        <input className="form-control" placeholder="Search" name='mobileNumber'
                                    value={mobileNumber}
                                    onChange={inputNumberHandler}/>
                                        <div className="input-group-btn">
                                            <button type="button" className="btn btn-info">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                {filteredContactlist.length === 0 &&
                                    <ChatConatctList/>
                                }
                                <ul className="users">
                                {filteredContactlist.length > 0 && 
                                    filteredContactlist.map((c,index)=>{
                                        return (
                                        <li key={c._id} className={"person " +(index === 0 ? "active-user" : " ")
                                                } data-chat={"person+${index}"} onClick={()=>
                                                    fetchPersonChat(c.mobilenumber)
                                                }>
                                            <div className="user">
                                                <img src={noimage} alt={c.name}/>
                                                <span className="status online"></span>
                                            </div>
                                            <p className="name-time">
                                                <span className="name">{c.name}</span>
                                            </p>
                                        </li>
                                        )
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                            <div className="selected-user">
                                <span>To: <span className="name"></span></span>
                            </div>
                            <div className="chat-container">
                                <ul className="chat-box chatContainerScroll">
                                   
                                    <li className="chat-right ">
                                        <div className="chat-hour">08:56 <span className="fa fa-check-circle"></span></div>
                                        <div className="chat-text bg-lightgreen">Hi, 
                                             Welcome to Payripe.</div>
                                        <div className="chat-avatar">
                                            <img src={noimage} alt="Retail Admin"/>
                                            <div className="chat-name">You</div>
                                        </div>
                                    </li>
                                    <li className="chat-left">
                                        <div className="chat-avatar">
                                            <img src={noimage} alt="Retail Admin"/>
                                            <div className="chat-name">Bhagyashree Rahile</div>
                                        </div>
                                        <div className="chat-text">Hello Admin. Looking for merchant app for my business</div>
                                        <div className="chat-hour">08:57 <span className="fa fa-check-circle"></span></div>
                                    </li>

                                </ul>
                                <div className="form-group mt-3 mb-2">
                                    <textarea className="form-control" rows="3" placeholder="Type your message here..."></textarea>
                                </div>
                                <button type="button" className="btn btn-info btn-rounded float-right">Send</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>
    )
}

export default Chat;