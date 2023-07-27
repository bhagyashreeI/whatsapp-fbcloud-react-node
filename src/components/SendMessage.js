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


   

    const storeMsg = (msgObj) => {
        console.log("msgObj", msgObj)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header to JSON
            },
            body: JSON.stringify(msgObj),
        };

        const data = fetch(API_URL + 'api/create', requestOptions).then((res) => res.json())
            .then((resdata) => {
                setStatus(true)
                setFormData({
                    mobileNumber: "",
                    message: "",
                })
                setTimeout(() => setStatus(false), 3000);
            });
    }

    const sendMessageApi = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer EAADy6KDpCygBO7gtxqxIuGPPlLaPZBHy6uk0WBZBxZCqt7E5vEliHrlQa8twMNeMxRZBcrL2D5Fh73EoBaXQRQFHHt0l5nljijg406n0p4NnenhoAckHB1CaJbZAR8BGESQMdmGJZCJkpzAp5o304AyGeQCFk9LiAqQoZAFNAHo149F8cCF7eNAtvfkELb6dmcCOXSG4CZAoVANqZCuGw0QOrSSgg8YyAwLesDM4ZD");

        var formdata = new FormData();
        formdata.append("messaging_product", "whatsapp");
        formdata.append("to", mobileNumber);
        formdata.append("type", "template");
        formdata.append("template", "{ \"name\": \"hello_world\",\"language\":\n{ \"code\": \"en_US\" }}");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://graph.facebook.com/v17.0/100652643117006/messages", requestOptions)
            .then(response => {
                if (!response.ok) {
                    // If the response status is not in the 2xx range, handle the error
                    return response.json().then(data => {
                        throw new Error(data.error.message);
                    });
                }
                return response.json(); // Parse the successful response data
            })
            .then(data => {
                // Handle successful response here
                console.log("ttt",data);
                const wa_id = data?.contacts[0]?.wa_id;
                const wa_message = "hello_world";
                const msgData = {
                    wa_id: wa_id,
                    message: wa_message,
                    sent: true
                }
                storeMsg(msgData);
            })
            .catch(error => {
                // Handle API error here
                setErrorMessage(error.message); // Set the error message in state for display
                console.error(error); // Log the error for further investigation
            });
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
                <div className="col-3 mx-auto">
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
                                    onChange={inputHandler}
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