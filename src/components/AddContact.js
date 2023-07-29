import React, { useState } from 'react'
import { Button, TextField, Alert, mobileStepperClasses } from "@mui/material";

import FormHeader from './FormLayout/Header';
import { API_URL } from '../utils/constants';
const AddContact = () =>{
    const [formInput,setFormInput] = useState({
        name:'',
        mobilenumber:''
    })
    const [nameEmptyError, setNameEmptyError] = useState(false);
    const [numberEmptyError, setNumberEmptyError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [status, setStatus] = useState(false);

    const { name, mobilenumber } = formInput;


    const textFieldInputLabelStyle = {
        fontSize: "0.9em",
        fontStyle:"italic",
        alignSelf: "center",
        justifySelf: "center",
    };

    const textFieldStyle = {
        width: "230px",
    };

    const handleInput = (e) =>{
        setFormInput({ ...formInput ,[e.target.name]:e.target.value})
    }

    const addContactApi = () => {
        const contactData = {
            name: name,
            mobilenumber: mobilenumber
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        };
        fetch(API_URL + "api/create/contact", requestOptions).
            then((res) => res.json()).then((resdata) => {
                setStatus(true)
                setFormInput({
                    name: "",
                    mobilenumber: "",
                })
                setTimeout(() => 
                    setStatus(false)
                , 3000);
            }).catch(error => {
                // Handle API error here
                setErrorMessage(error.message); // Set the error message in state for display
                console.error(error); // Log the error for further investigation
            });;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 1) {
            setNameEmptyError(true);
            setTimeout(() => setNameEmptyError(false), 3000);
        } else if (mobilenumber.length < 1) {
            setNumberEmptyError(true);
            setTimeout(() => setNumberEmptyError(false), 3000);
        } else {
            addContactApi();
        }

        
    }

 return (
    <div className='communication mt-2 mb-2'>

            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="text-center">
                <div className='card mx-auto  p-2'>
                    <FormHeader title="Add Contact"/>
                     {status && (
                         <Alert severity="success">Contact added successful!</Alert>
                     )}
                     {errorMessage && <div className='text-danger'>Error: {errorMessage}</div>}
                     {nameEmptyError && (
                         <div className='errors'>Name cannot be empty!</div>
                     )}
                     {numberEmptyError && (
                         <div className='errors'>Number cannot be empty!</div>
                     )}
                     {!numberEmptyError && !nameEmptyError && (
                         <div className='errors-null'>.</div>
                     )}
                     <div className=''>
                         <TextField label="Name" placeholder='Contact Name' name="name" value={name} inputProps={{
                             style: textFieldStyle,
                         }}
                             InputLabelProps={{
                                 style: textFieldInputLabelStyle,
                             }} style={{ margin: "1em 0em", }} size='small' onChange={handleInput}>
                        </TextField>
                        </div>
                        <div className=''>
                         <TextField label="Mobile Number" placeholder='Mobile Number' name="mobilenumber" value={mobilenumber} inputProps={{
                             style: textFieldStyle,
                         }}
                             InputLabelProps={{
                                 style: textFieldInputLabelStyle,
                             }} style={{ margin: "1em 0em", }} size='small' onChange={handleInput}>
                         </TextField>
                     </div>
                     <div style={{ marginTop: "1.5em" }}>
                         <Button
                             variant='contained'
                             color='secondary'
                             size='small'
                             onClick={handleSubmit}
                         >
                             Add
                         </Button>
                     </div>
                </div>
            </div>
        </div>
    </div></div>
 )   
}

export default AddContact