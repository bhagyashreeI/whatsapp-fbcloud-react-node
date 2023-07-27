import React, { useState } from 'react'
import { Button, TextField, Alert } from "@mui/material";
import FormHeader from './FormLayout/Header';
const SendBulkMessage = () => {
    const textFieldInputLabelStyle = {
        fontSize: "0.9em",
        fontStyle: "italic",
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

    const inputHandler = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    return (
        <div className="row">
            <div className="col-3 mx-auto">
                <div className="text-center">
                    <div className='card mx-auto  p-2'>
                        <FormHeader title="Send Bulk Message" />
                        <div className=''>

                            <TextField
                                label='Mobile Number'
                                placeholder='Mobile Number'
                                name='mobileNumber'
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
    )
}

export default SendBulkMessage;