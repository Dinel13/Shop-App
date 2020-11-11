import { LOGIN, Signup, SIGNUP } from "../action/AuthAction"

const initState = {
    token : null,
    userId : null
}

export default (state = initState , action) => {
    switch (action.type) {
        case LOGIN :
            return {
                token : action.token,
                userId : action.userId
            }
        case SIGNUP :
            return {
                token : action.token,
                userId : action.userId
            }
        default :
        return state
    }
}