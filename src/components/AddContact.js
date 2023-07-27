import React from 'react'
import { Button, TextField, Alert } from "@mui/material";

import FormHeader from './FormLayout/Header';
const AddContact = () =>{

    const textFieldInputLabelStyle = {
        fontSize: "0.9em",
        fontStyle: "italic",
        alignSelf: "center",
        justifySelf: "center",
    };

    const textFieldStyle = {
        width: "230px",
    };

 return (
    <div className="row">
        <div className="col-3 mx-auto">
            <div className="text-center">
                <div className='card mx-auto  p-2'>
                    <FormHeader title="Add Contact"/>
                     <div className=''>
                         <TextField label="Name" placeholder='Contact Name' name="name" inputProps={{
                             style: textFieldStyle,
                         }}
                             InputLabelProps={{
                                 style: textFieldInputLabelStyle,
                             }} style={{ margin: "1em 0em", }}>
                        </TextField>
                         <TextField label="Mobile Number" placeholder='Mobile Number' name="mobileNumber" inputProps={{
                             style: textFieldStyle,
                         }}
                             InputLabelProps={{
                                 style: textFieldInputLabelStyle,
                             }} style={{ margin: "1em 0em", }}>
                         </TextField>
                     </div>
                     <div style={{ marginTop: "1.5em" }}>
                         <Button
                             variant='contained'
                             color='secondary'
                             size='small'
                         >
                             Add
                         </Button>
                     </div>
                </div>
            </div>
        </div>
    </div>
 )   
}

export default AddContact