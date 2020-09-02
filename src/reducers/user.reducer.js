import { userConstants } from "../actions/constants"

const initState={
    users:[],
    conversation:[]
}
//this page help to update window.store data
export default (state=initState,action)=>{
    switch(action.type){
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state={
                ...state,
                users:action.payload.users
            }
            break;
        case userConstants.GET_REALTIME_MESSAGES:
            state={
                ...state,
                conversation:action.payload.conversation
            }
            break;
    }
    return state
}