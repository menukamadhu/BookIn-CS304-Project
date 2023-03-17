import React, { useState } from 'react'

function Validation(values){
    const[errors,setErrors] = useState({
        business_name : '',
        email : '',
        contact_num : '',
        password : '',
        confirm_password : ''
    })
    // console.log(values.business_name);
    // console.log(values({...errors,business_name:"abbbb"}))
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.business_name === ""){
        setErrors(
            {business_name: "Name should not be empty"}
            )
        
    }
    else{
        error.business_name = ""
    }

    // if(values.email === ""){
    //     error.email = "E-mail should not be empty"
    // }
    // else if(!email_pattern.test(values.email)){
    //     error.email = "E-mail didn't match"
    // }
    // else{
    //     error.email = ""
    // }

    // if(values.contact_num === ""){
    //     error.contact_num = "Contact number should not be empty"
    // }
    // else{
    //     error.contact_num = ""
    // }

    // if(values.password === ""){
    //     error.password = "Password should not be empty"
    // }
    // else if(!password_pattern.test(values.password)){
    //     error.password = "Please enter the password with capital letters,simple letters and numbers"
    // }
    // else{
    //     error.password = ""
    // }

    // if(values.confirm_password === "" || String(values.confirm_password) !== String(values.password)){
    //     console.log(values.confirm_password + "___" + values.password)
    //     error.confirm_password = "Password not matched"
    // } 
    // else{
    //     error.confirm_password = ""
    // }

    // console.log(error.business_name)
    return errors;
}

export default Validation;