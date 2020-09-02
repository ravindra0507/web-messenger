

//this page is for adding restriction for going to home page only logged in user can see home page


import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'



//niche wala function ni samajh aya;)

const PrivateRoute=({component: Component,...rest})=>{
    return(
        
        <Route {...rest} component={(props)=>{
            const user=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
            console.log(props,'this is what you get through props')
            
            if(user){
                return <Component {...props} />
            }else{
                console.log(Component,'this is what you get through Component');

                return<Redirect to={'/login'}/>
            }

        }}/>
    )
}

export default PrivateRoute
