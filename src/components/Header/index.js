import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import './style.css'
import { auth } from 'firebase'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../actions/auth.actions'


function Header(props) {
const auth = useSelector(state => state.auth)
//console.log(auth.authenticated,'authentication see galat hai ya sahi')
const dispatch=useDispatch()
// const logout=()=>{
//   dispatch(logout())
// }

    return (
        <header className='header'>
        
        
            
        <div style={{display:"flex"}}>
          <div className='logo'>Bit-Chat</div>
          {
            !auth.authenticated?
            <ul className='leftmenu'>
            <li> <NavLink to={'/login'}>Login</NavLink> </li>
            <li> <NavLink to={'/signup'}>signup</NavLink> </li>

          </ul>:null
          }
        </div>
        <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
          {auth.authenticated?`Hiii  ${auth.firstName} ${auth.lastName}`: ''}
        </div>
        
        {props.children}

        <ul className='menu'>
         {
           auth.authenticated?
           <li>
           <Link to={'#'} onClick={()=>{
             dispatch(logout(auth.uid))
           }}>Logout</Link>
         </li>:null
         }
        


        </ul>
         
        
          
            
             
      
    
        </header>
    )
}

export default Header
