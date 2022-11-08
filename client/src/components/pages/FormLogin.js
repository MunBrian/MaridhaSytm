import React, {useState, useEffect} from 'react';
import './Form.css';


function FormLogin () {

    const[name, setName] = useState('')
    const[password, setPassword] = useState('')

    function login(){

        const user = {
            name,
            password
        }
        console.log(user)
    }

    return (
        <div className='logincontainer'>
            <div className='col-md-5'>

                <div className='bs'>
                    <h1>Log Into Your Account</h1>
                    <input type="text" className="form-control" placeholder="Enter Your Username"
                     value={name} onChange={(e) => {setName(e.target.value)}}  />
                    <input type="password" className="form-control" placeholder="Enter Your Password"
                    value={password} onChange={(e) => {setPassword(e.target.value)}} />   

                    <button className='btn btn-primary' onClick={login}>LOG IN</button>

                </div>
            </div>

        </div>
    )
}

export default FormLogin;