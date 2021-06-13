function Authreducer(state = {
    isloading: false
}, action) {
    switch (action.type) {
        case "LOGIN_STARTED": {
            state = { ...state }
            state["isloading"] = true
            return state
        }
        case "LOGIN": {
            state = { ...state }
            state["token"] = action.payload?.token
            state["username"] = action.payload?.username
            state["isLoggedin"] = true
            return state
        }
        case "LOGOUT": {
            state = { ...state }
            localStorage.clear();
            state["isLoggedin"] = false
            return state
        }
        case "ADDTOCART": {
            state = { ...state }
            state["cart"] = action.payload
            return state
        }

        default: return state
    }
}
export default Authreducer