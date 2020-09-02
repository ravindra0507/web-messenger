import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Layout/UI/Card'
import './style.css'
import {signup} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'


function RegisterPage(props) {
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch();
    const auth=useSelector(state=>state.auth)

    const registerUser=(e)=>{
        e.preventDefault();
        const user={
            firstName,lastName,email,password
        }
        dispatch(signup(user))
    }
    if(auth.authenticated){
        return <Redirect to={'/'}/>
    }
    return (
        
     

            <Layout>
                <div className='registercontainer'>
                    <Card>
                        <form onSubmit={registerUser}>
                            <h3>signUp</h3>
                            <input
                                name='firstName'
                                type='text'
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                                placeholder='firstName'

                                />
                                <input
                                name='lastName'
                                type='text'
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                placeholder='lastName'

                                />
                                <input
                                name='email'
                                type='text'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='email'

                                />
                                  <input
                                name='password'
                                type='text'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder='password'

                                />
                                <div>
                                    <button>signUp</button>
                                </div>

                        </form>
                    </Card>
                </div>
            </Layout>
            
        
    )
}

export default RegisterPage
