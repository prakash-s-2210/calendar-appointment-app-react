import React,{useState, useContext} from 'react'
import "../css files/Signup.scss"
import { useNavigate } from 'react-router';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';

export default function Signup() {
    const {dispatchCallEvent} = useContext(GlobalContext);
    let navigate = useNavigate();
    const [ errorEmail, setErrorEmail ] = useState("hide-email-error");
    const [ errorPassword, setErrorPassword ] = useState("hide-password-error");
    const [ emailValue, setEmailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");
    const [ passwordType, setPasswordType ] = useState("password");
    const [ passwordVisiblity, setPasswordVisibility ] = useState('bx bx-hide show-hide');
    
    
    function checkEmail(){
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(emailValue.match(emailPattern)){
            return setErrorEmail("hide-email-error")
        }
        else{
            setErrorEmail("email-error");
        }
    }
    function checkPassword(){
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if(passwordValue.match(passwordPattern)){
            return setErrorPassword("hide-password-error");
        }
        else{
            return setErrorPassword("password-error")
        }
    }
    
    
    function handleSubmit(e){
        e.preventDefault();
        checkEmail();
        checkPassword();
        if(errorEmail === "hide-email-error" && errorPassword === "hide-password-error" 
        ){
            const loginInformation =  {
                emailId: emailValue,
                password: passwordValue
                }
                // axios.defaults.withCredentials = true;
            axios.post("http://localhost:5108/api/User/Login",loginInformation,{withCredentials: true})
           .then(function(response){
            if(response.data === "authorised"){
                navigate('/calendar')
            }})
            .catch((error)=>{
                alert("the email id and password entered by the user are invalid");
              })
        }
    }
  return (
    <div className='container'>
        <div className='form-container'>
            <header className='signup-header'>Sign In</header>
            <form action=""  className='form'>
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
                <div className='submit-input-field'>
                    <input type="submit" className='input-submit' value="Login In" onClick={handleSubmit}/>
                </div>
                <div className='change-route'>
                    Not a member? <a href="" onClick={()=>{
                        navigate('/signup')
                    }}>Sign up now</a>
                </div>
            </form>
        </div>        
    </div>
  )
}
