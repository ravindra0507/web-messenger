import React, {useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Layout/UI/Card'
import './style.css'
import { useDispatch,useSelector } from 'react-redux'
import {signin, isLoggedInUser} from '../../actions/auth.actions'
import {Redirect} from 'react-router-dom'
function LogInPage(props){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const dispatch=useDispatch();
    const auth = useSelector(state => state.auth)

    // useEffect(() => {
    //     if(!auth.authenticated){
    //         dispatch(isLoggedInUser)
    //     }    
    
    // }, [])


    const userLogin=(e)=>{
        e.preventDefault();
        if(email==''){
            alert('email is required')
            return
        }
        if(password==''){
            alert('password is required')
            return
        }
        dispatch(signin({email,password}))

    }

    if(auth.authenticated){
        return <Redirect to={'/'}/>
    }

    return (
            <div>
                <Layout >

                    <div className='logincontainer'>
                        <Card>
                            <form onSubmit={userLogin}>
                                <input
                                name='email'
                                type='text'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Email'

                                />
                                <input
                                name='password'
                                type='text'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder='password'

                                />
                                <div>
                                    <button>login</button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </Layout>
                
            </div>    
                
            
         )
}

export default LogInPage
