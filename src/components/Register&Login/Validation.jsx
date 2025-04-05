import React from 'react'
import { ValidEmail, ValidUserName } from './RegEx';

function Validation(value) {


    const err = {}

    console.log("this is my value ", value);

    if(!value.email || value.email.trim() === ''){
            err.email = "Email required"
    }
    else if(!ValidEmail.test(value.email)){
        err.email = "Enter valid email"
    }else if(value.email.length >= 251){
        err.email = "Enter email less than 250 charecter"
    }
    

    if(!value.username){
        err.username = "Username Required"
    }
    else if(!ValidUserName.test(value.username)){
        err.username = "Enter valid Username"
    }else if(value.email.length >= 51){
        err.username ="Enter username less than 50 charecter"
    }

    if(!value.chooseTerm){
        err.chooseTerm = "Select Term"
    }


    if(!value.password){
        err.password = 'Password required'
    }
    else if (value.password.length <= 9){
        err.password = 'Enter strong password'
    }


    return err ;
}

export default Validation
