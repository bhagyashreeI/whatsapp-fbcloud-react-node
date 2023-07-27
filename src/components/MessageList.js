import React,{useState,useEffect} from 'react'

const MessageList = () => {
    const [messageList,setMessageList]  = useState(null);

    const fetchList = () =>{

    }

    useEffect(() =>{
        fetchList();
    },[])

    return(
        <div>
            <h1>List</h1>
        </div>
    )
}

export default MessageList;