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

export const addCartMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            dispatch({
                type: "ADDTOCART",
                payload: {
                    data: res.data.data
                }
            })
        }, err => {})
    }
}

export const emptyCartMiddleware = () => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/clearcart',
            method: 'post'
        }).then(res => {
            console.log('empty res', res)
            dispatch({
                type: 'EMPTY_CART',
                payload : {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const removeOneCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/removeonecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ONE_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const removeCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/removecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ITEM_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const placeOrderMiddleware = (data) => {
    console.log('mmmmmmmmmmmmmm', data);
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_API_URL + '/addcakeorder',
            method: 'post',
            data: data
        }).then(res => {
            dispatch({
                type: 'PLACE_ORDER',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}