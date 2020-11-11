import { AUTH_WITH_DATA, LOGOUT} from "../action/AuthAction"

const initState = {
    token : null,
    userId : null
}

export default (state = initState , action) => {
    switch (action.type) {
        case AUTH_WITH_DATA : {
            return {
                token : action.token,
                userId : action.userId
            }
        }
        case LOGOUT :
            return initState
        /* 
        TIDAK JADI DIPAKE KAREAB ISI NYA SAANA
        case LOGIN :
            return {
                token : action.token,
                userId : action.userId
            }
        case SIGNUP :
            return {
                token : action.token,
                userId : action.userId
            } */
        default :
        return state
    }
}