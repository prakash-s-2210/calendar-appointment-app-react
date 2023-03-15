import React,{useState} from 'react'
import Guid from 'guid';
import "../css files/Signup.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate();
    const [ errorFirstName, setErrorFirstName ] = useState("hide-first-name-error");
    const [ errorLastName, setErrorLastName ] = useState("hide-last-name-error");
    const [ errorEmail, setErrorEmail ] = useState("hide-email-error");
    const [ errorPassword, setErrorPassword ] = useState("hide-password-error");
    const [ errorConfirmPassword, setErrorConfirmPassword ] = useState("hide-confirm-password-error");
    const [ firstNameValue, setFirstNameValue ] = useState("");
    const [ lastNameValue, setLastNameValue ] = useState("");
    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");
    const [ confirmPasswordValue, setConfirmPasswordValue ] = useState("");
    const [ passwordType, setPasswordType ] = useState("password");
    const [ confirmPasswordType, setConfirmPasswordType ] = useState("password");
    const [ passwordVisiblity, setPasswordVisibility ] = useState('bx bx-hide show-hide');
    const [ confirmPasswordVisiblity, setConfirmPasswordVisibility ] = useState('bx bx-hide show-hide');
    function checkFirstName(){
        const firstNamePattern = /^[A-Za-z\s]+$/;
        if( firstNameValue.match(firstNamePattern))
        {
            return setErrorFirstName("hide-first-name-error")
        }
        else{
            return setErrorFirstName("first-name-error");
        }
    }
    function checkLastName(){
        const lastNamePattern = /^[A-Za-z\s]+$/;
        if( lastNameValue.match(lastNamePattern))
        {
            console.log("2")
            return setErrorLastName("hide-last-name-error")
        }
        else{
            console.log("1")
            return setErrorLastName("last-name-error");
        }
    }
    function checkEmail(){
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(emailValue.match(emailPattern)){
            return setErrorEmail("hide-email-error")
        }
        else{
            return setErrorEmail("email-error");
        }
    }
    function checkPassword(){
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if( passwordValue.match(passwordPattern)){
            return setErrorPassword("hide-password-error");
        }
        else{
            return setErrorPassword("password-error")
        }
    }
    function checkConfirmPassword(){
        if(passwordValue!==confirmPasswordValue || confirmPasswordValue === ""){
            return setErrorConfirmPassword("confirm-password-error")
        }
        else{
            return setErrorConfirmPassword("hide-confirm-password-error");
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();
        checkFirstName();
        checkLastName();
        checkEmail();
        checkPassword();
        checkConfirmPassword();
        if(
            firstNameValue.length>0 &&
            lastNameValue.length > 0 &&
            emailValue.length > 0 && 
            passwordValue.length > 0 &&
            errorFirstName === "hide-first-name-error" &&
            errorLastName === "hide-last-name-error" &&
            errorEmail === "hide-email-error" &&
            errorPassword === "hide-password-error" &&
            errorConfirmPassword === "hide-confirm-password-error"
        ){
            const addUser =  {
                userId: Guid.EMPTY,
                firstName: firstNameValue,
                lastName: lastNameValue,
                emailId: emailValue,
                password: passwordValue,
                confirmPassword: confirmPasswordValue,
                accessToken: ""
            }

            axios.post("http://localhost:5108/api/User/RegisterUser",addUser)
           .then(function(response){
            if(response.status === 201){
                navigate('/signin')
            }
            })
            .catch((error)=>{
                alert("The email id is already existed");
            })
        }
    }
  return (
    <div className='container' to="signin">
        <div className='form-container'>
            <header className='signup-header'>Signup</header>
            <form action=""  className='form'>
                <div className='field'>
                    <div className='name-input-field'>
                        <input type="text" required placeholder='Enter your first name'value = {firstNameValue} className='input-field-name' onChange={(e) => setFirstNameValue(e.target.value)} onKeyUp={()=>{
                            checkFirstName();
                        }} />
                    </div>
                    <span className={errorFirstName}>
                        <i className='bx bx-error-circle error-icon' ></i>
                        <p className="error-text">First name only be capital letter, small letter and white space</p>
                    </span>
                </div>
                <div className='field'>
                    <div className='name-input-field'>
                        <input type="text" placeholder='Enter your last name'value = {lastNameValue} className='input-field-name' onChange={(e) => setLastNameValue(e.target.value)} onKeyUp={()=>{
                            checkLastName();
                        }} />
                    </div>
                    <span className={errorLastName}>
                        <i className='bx bx-error-circle error-icon' ></i>
                        <p className="error-text">last name only be capital letter, small letter and white space</p>
                    </span>
                </div>
                <div className='field'>
                    <div className='email-input-field'>
                        <input type="email" placeholder='Enter your email'value = {emailValue} className='input-field-email' onChange={(e) => setEmailValue(e.target.value)} onKeyUp={()=>{
                            checkEmail();
                        }} />
                    </div>
                    <span className={errorEmail}>
                        <i className='bx bx-error-circle error-icon' ></i>
                        <p className="error-text">Please enter a valid email</p>
                    </span>
                </div>
                <div className='field'>
                    <div className='password-input-field'>
                        <input type={passwordType} value= {passwordValue}  placeholder='create password' className='input-field-password' 
                        onChange={(e) => {setPasswordValue(e.target.value)}}
                        onKeyUp={()=>{
                            checkPassword();
                        }}
                        />
                        <i className={passwordVisiblity} onClick={()=>{
                            if(passwordVisiblity === "bx bx-hide show-hide"){
                                setPasswordVisibility("bx bx-show show-hide");
                                setPasswordType("text")
                            }
                            else{
                                setPasswordVisibility("bx bx-hide show-hide")
                                setPasswordType("password")
                            }
                        }} ></i>
                    </div>
                    <span className={errorPassword}>
                        <i className='bx bx-error-circle error-icon' ></i>
                        <p className="error-text">Please enter atleast 8 character with number, symbol, small and capital letter</p>
                    </span>
                </div>
                <div className='field'>
                    <div className='password-input-field'>
                        <input type={confirmPasswordType} placeholder='create password'  value={confirmPasswordValue} className='input-field-password' onChange={(e) => setConfirmPasswordValue(e.target.value)} onKeyUp={()=>{
                            checkConfirmPassword();
                        }}/>
                        <i className={confirmPasswordVisiblity} onClick={()=>{
                            if(confirmPasswordVisiblity === "bx bx-hide show-hide"){
                                setConfirmPasswordVisibility("bx bx-show show-hide");
                                setConfirmPasswordType("text")
                            }
                            else{
                                setConfirmPasswordVisibility("bx bx-hide show-hide")
                                setConfirmPasswordType("password")
                            }
                        }} ></i>
                    </div>
                    <span className={errorConfirmPassword}>
                        <i className='bx bx-error-circle error-icon' ></i>
                        <p className="error-text">Password don't match</p>
                    </span>
                </div>
                <div className='submit-input-field'>
                    <input type="submit" className='input-submit' value="Sign up" onClick={handleSubmit}/>
                </div>
                <div className = "change-route">Already a member? <a href="" onClick={()=>{
                    navigate('/signin')
                }}>Sign In</a></div>
            </form>
        </div>        
    </div>
  )
}
