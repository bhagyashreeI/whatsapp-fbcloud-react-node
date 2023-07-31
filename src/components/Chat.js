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
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        mobileNumber: ""
    });
    const { mobileNumber } = formData;

    const [formSendData, setSendFormData] = useState({
        waid: "",
        message:"",
        cid:""
    });
    const { waid,message,cid } = formSendData;
    

    const fetchList = async() => {
        const data = await fetch(API_URL+"api/all/contacts");
        const json = await data.json();
        setContactlist(json)
        setFilteredContactlist(json);
        fetchPersonChat(json[0]._id);
        
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

    const fetchPersonChat = async(id) => {
        const data = await fetch(API_URL + "api/get/contact?q=" + id)
        const json = await data.json();
        console.log(json)
        setSelectedPerson(json)
        console.log("selectedPerson",selectedPerson)
        setSendFormData({
            
                'waid':json.mobilenumber,
                'cid':json._id
        
        })
    }

    const inputMesgHandler = (e) =>{
        setSendFormData({
            ...formSendData, ['message']: e.target.value
        })
    }

    
   const postMsgData = async (requestOptions) =>{
        const msgResData = await fetch(API_URL + 'api/create', requestOptions);
        const jsonMsgData = await msgResData.json();
        if(!msgResData.ok) {    
            setErrorMessage(jsonMsgData.message);
            setTimeout(() => setErrorMessage(""), 3000);
        } else {
            setSendFormData({
            ...formSendData, ['message']: ''
            })
        }
    }

    const sendMsg = (msgObj) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header to JSON
            },
            body: JSON.stringify(msgObj),
        };
        postMsgData(requestOptions)
    }

    const sendMessageApi = () =>{
        const msgData = {
            mobileNumber: waid,
            message: message,
            type: 'text',
            sent: true
        }
        sendMsg(msgData);
    }
    
    const handleSendMsgClick = () => {
        sendMessageApi();
        setTimeout(() => fetchPersonChat(cid), 3000);
        
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
                                        <li key={c._id} className={"person " +(c._id === selectedPerson._id ? "active-user" : " ")
                                                } data-chat={"person+${index}"} onClick={()=>
                                                    fetchPersonChat(c._id)
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
                                    {selectedPerson.length === 0 &&
                                        <PersonChat />
                                    }
                                    {selectedPerson.length !=0 &&
                            <><div className="selected-user">
                                        <span>To: <span className="name">{selectedPerson.name}</span></span>
                            </div>
                            <div className="chat-container">
                                <ul className="chat-box chatContainerScroll">
                                            {selectedPerson.messages && selectedPerson.messages.map((chat) => {
                                                return (

                                                    
                                                    <li key={chat._id} className={" " + (chat.sentType == 'sent' ? "chat-right " : "chat-left")}>
                                        <div className="chat-hour">{chat.createdAt} <span className="fa fa-check-circle"></span></div>
                                                        <div className={
                                                            "chat-text " +
                                                            (chat.sentType == 'sent' ? "bg-lightgreen " : "")
                                                        } >{chat.message}.</div>
                                        <div className="chat-avatar">
                                            <img src={noimage} alt="Retail Admin"/>
                                                            <div className="chat-name">{chat.sentType == 'sent' ? 'You' : selectedPerson.name}</div>
                                        </div>
                                    </li>
                                    
                                    )
                                })
                                            }
                                    

                                </ul>
                                <div className="form-group mt-3 mb-2">
                                    <textarea className="form-control" rows="3" placeholder="Type your message here..." name='message'
                                    value={message}
                                    onChange={inputMesgHandler}></textarea>
                                </div>
                                {errorMessage && <div className='text-danger'>Error: {errorMessage}</div>}
                            
                                <button type="button" className="btn btn-info btn-rounded float-right" onClick={handleSendMsgClick}>Send</button>
                            </div>
                            </>
                                        }
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