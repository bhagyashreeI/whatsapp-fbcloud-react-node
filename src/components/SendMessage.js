import React,{useState} from 'react'
import { Button, TextField, Alert } from "@mui/material";
import { API_URL } from '../utils/constants';
import FormHeader from './FormLayout/Header';

const SendMessage = () =>{

    const textFieldInputLabelStyle = {
        fontSize: "0.9em",
        fontStyle:"italic",
        alignSelf: "center",
        justifySelf: "center",
    };

    const textFieldStyle = {
        width: "230px",
    };

    const CHARACTER_LIMIT = 200;

    const [numberEmptyError, setNumberEmptyError] = useState(false);
    const [messageEmptyError, setMessageEmptyError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [status, setStatus] = useState(false);
    
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [formData, setFormData] = useState({
        mobileNumber: "",
        message: "",
    });


    const { mobileNumber, message } = formData;

    const inputHandler = (e) =>{
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
        
            
    }
    const inputNumberHandler = (e) =>{
        setFormData({
            ...formData, ['mobileNumber']: e.target.value
        })
        fetch(API_URL + 'api/search/contacts?q=' + e.target.value)
        .then((res) => res.json())
            .then((resdata)=>{
                
                setSuggestions(resdata);
                setShowSuggestions(true)
        })
            
    }

    const handleSuggestionClick = (ev) => {
        setFormData({
            ...formData, ['mobileNumber']: ev.mobilenumber
        })
        setSuggestions([])
        setShowSuggestions(false)
    }


   const postMsgData = async (requestOptions) =>{
        const msgResData = await fetch(API_URL + 'api/create', requestOptions);
        const jsonMsgData = await msgResData.json();
        if(!msgResData.ok) {
            setErrorMessage(jsonMsgData.message);
            setTimeout(() => setErrorMessage(""), 3000);
        } else {
            setStatus(true)
                setFormData({
                    mobileNumber: "",
                    message: "",
                })
                setTimeout(() => setStatus(false), 3000);
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
            mobileNumber: mobileNumber,
            message: message,
            type: 'template',
            sent: true
        }
        sendMsg(msgData);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        if (mobileNumber.length < 1) {
            setNumberEmptyError(true);
            setTimeout(() => setNumberEmptyError(false), 3000);
        } else if (message.length < 1) {
            setMessageEmptyError(true);
            setTimeout(() => setMessageEmptyError(false), 3000);
        } else {
            sendMessageApi();
        }
    }

    return (
        <div className='communication mt-2 mb-2'>

            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="text-center">
                        <div className='card mx-auto  p-2'>
                            <FormHeader title="Send Message" />
                            {status && (
                                <Alert severity="success">Message send successful!</Alert>
                            )}
                            {errorMessage && <div className='text-danger'>Error: {errorMessage}</div>}
                            {numberEmptyError && (
                                <div className='errors'>Mobile number cannot be empty!</div>
                            )}
                            {messageEmptyError && (
                                <div className='errors'>Message cannot be empty!</div>
                            )}
                            {!numberEmptyError && !messageEmptyError && (
                                <div className='errors-null'>.</div>
                            )}
                            <div className=''>
                                
                                <TextField
                                    error={numberEmptyError}
                                    label='Mobile Number'
                                    placeholder='Mobile Number'
                                    name='mobileNumber'
                                    value={mobileNumber}
                                    onChange={inputHandler,inputNumberHandler}
                                    size='small'
                                    style={{
                                        margin: "1em 0em",
                                    }}
                                    inputProps={{
                                        style: textFieldStyle,
                                    }}
                                    InputLabelProps={{
                                        style: textFieldInputLabelStyle,
                                    }}
                                    required
                                />
                                
                                    
                                {showSuggestions && 
                                <ul className={'list-unstyled border' + (showSuggestions ? "show" : "hide")}>
                                    {suggestions.length > 0 && 
                                        suggestions.map(s=>{
                                            return(
                                                <li className='border-bottom' key={s._id} onClick={() => handleSuggestionClick(s)}>{s.name}</li>
                                            )
                                        })
                                }
                                    
                                </ul>
                                }
                                </div>
                            <div className='message app' style={{ marginTop: "1.5em" }}>
                                
                                <TextField
                                    multiline
                                    maxRows={4}
                                    label='Message'
                                    placeholder='Hi! Sending a message from React....'
                                    size='small'
                                    InputLabelProps={{
                                        style: textFieldInputLabelStyle,
                                    }}
                                    inputProps={{
                                        style: {
                                            width: "230px",
                                            height: "90px",
                                        },
                                        maxLength: CHARACTER_LIMIT,
                                    }}
                                    FormHelperTextProps={{
                                        style: {
                                            margin: 0,
                                            padding: "0 0 0 5px",
                                            fontSize: 10,
                                        },
                                    }}
                                    name='message'
                                    value={message}
                                    onChange={inputHandler}
                                    required
                                    error={message.length > CHARACTER_LIMIT - 1 || messageEmptyError}
                                    helperText={
                                        !(message.length > CHARACTER_LIMIT - 1)
                                            ? `${message.length}/${CHARACTER_LIMIT}`
                                            : "Max length exceeded"
                                    }
                                />
                            </div>
                            <div style={{ marginTop: "1.5em" }}>
                                <Button
                                    onClick={submitHandler}
                                    variant='contained'
                                    color='secondary'
                                    size='small'
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            
        </div>
    )
}


export default SendMessage;