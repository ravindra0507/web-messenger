import {auth,firestore} from 'firebase';
import {authConstant} from './constants'




export const signup=(user)=>{
    return async (dispatch)=>{
        const db=firestore();
        dispatch({type:`${authConstant.USER_LOGIN}_REQUEST`})
        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            console.log(data);
            const currentUser=auth().currentUser;
            const name=`${user.firstName}  ${user.lastName}`
            currentUser.updateProfile({
            displayName:name
            })
            .then(()=>{
                //if you are here means it is updated
                //this will add in google database
                //dont know what doc is doing
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    uid:data.user.uid,
                    createdAt:new Date(),
                    isOnline:true
                }).then(()=>{
                    //successfull
                    const loggedInUser={
                        firstName:user.firstName,
                        lastName:user.lastName,
                        uid:data.user.uid,
                        email:user.email,
                        

                    }
                    localStorage.setItem('user',JSON.stringify(loggedInUser))
                    console.log('userloggedin successfull')
                    dispatch({
                        type:`${authConstant.USER_LOGIN}_SUCCESS`,
                        payload:{user:loggedInUser}
                    })
                }).catch(error=>{
                    console.log(error)
                    dispatch({type:`${authConstant.USER_LOGIN}_FAILURE`,
                             payload:{error:error}   
                })
                })
            })
        })
        .catch(user=>{
            console.log('error');
        })
    }
}
export const signin=(user)=>{
    return async dispatch=>{
        dispatch({type:`${authConstant.USER_LOGIN}_REQUEST`})
        auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then((data)=>{

            console.log(data)
            
            const db=firestore()
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline:true
            })
            .then(()=>{
                const name=data.user.displayName.split(' ')
                const firstName=name[0]
                const lastName=name[1]
                const loggedInUser={
                    firstName,
                    lastName,
                    uid:data.user.uid,
                    email:data.user.email
    
                }
                localStorage.setItem('user',JSON.stringify(loggedInUser))
                dispatch({
                    type:`${authConstant.USER_LOGIN}_SUCCESS`,
                    payload:{user:loggedInUser}
                })
            })
            .catch(error=>{
                console.log(error)
            })
        
            
        })
        .catch(error=>{
            console.log(error)
            dispatch({
                type:`${authConstant}_FAILURE`,
                payload:{error}
            })
        })


    }
}
//when you are log in and refresh so without below function all the state value will be disappeared 
//so local storage gonna help us out here
//because when we refresh our all the redux state's value get refreshed so we have to set it again
export const isLoggedInUser=()=>{
    return async dispatch=>{
       const user= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
       if(user){
           dispatch({
               type:`${authConstant.USER_LOGIN}_SUCCESS`,
               payload:{user:user}
           })
       }else{
           dispatch({
            type:`${authConstant.USER_LOGIN}_FAILURE`,
            payload:{error:'login again please'}
           })
       }
    }
}

export const logout=(uid)=>{
    return async dispatch=>{
        dispatch({
            type:`${authConstant.USER_LOGOUT}_REQUEST`
        })

        const db=firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline:false
        })
        .then(()=>{
                auth()
                .signOut()
                .then(()=>{
                    localStorage.clear();  //here once the state's value from local store  is cleared then automatically goes to login page
                    dispatch({type:`${authConstant.USER_LOGOUT}_SUCCESS`})
        
                })
                .catch(error=>{
                    console.log(error)
                    dispatch({type:`${authConstant.USER_LOGOUT}_FAILURE`,payload:{error}})
                })//auth end
        
        .catch(error =>{
            console.log(error)
        })
        })//then end
        .catch(error=>{
            console.log(error)
        })
            
       
    }
}