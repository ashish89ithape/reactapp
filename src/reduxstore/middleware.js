import axios from "axios";

export function loginmiddleware(data) {
    return function (dispatch) {
        const apiUrl =  process.env.REACT_APP_BASE_API_URL+"/login";
        dispatch({
            type: "LOGIN_STARTED"
        })
        axios({
            method: "POST",
            data: data,
            url: apiUrl,
        }).then((response) => {
            if (response.data.token) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token: response.data.token,
                        username: response.data.name
                    }
                })
                localStorage.token = response.data.token;
            } else {
                dispatch({
                    type: "WRONG_CREDENTIALS"
                })
            }
        }, (error) => {
            dispatch({
                type: "LOGIN_FAIL"
            })

        })
    }
}