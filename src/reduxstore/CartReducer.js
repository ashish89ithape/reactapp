function CartReducer(state = {
    cart: [],
    totalprice: 0,
    itemsInCart: 0,
    totalItems: 0,
    delivery: false,
    payment: false,
    address: false,
    orderReview: false,
    pageTitle: "Summary",
    orderActive: "active",
    addressActive: "",
}, action) {
    switch (action.type) {
        case "ADDTOCART": {
            state = { ...state }
            state["cart"] = [...state["cart"], action.payload]

            state["itemsInCart"] = state["itemsInCart"] + 1
            return state
        }
        case "EMPTYCART": {
            state = { ...state }

            return state
        }
        case "CARTITEMS": {
            state = { ...state }
            state.dbCartItems = action.payload
            return state
        }
        case "TOTALPRICE": {
            state = { ...state }
            state.totalPrice = action.payload
            return state
        }
        case "TOTALITEMS": {
            state = { ...state }
            state.totalItems = action.payload
            return state
        }


        case "REMOVEFROMCART": {
            state = { ...state }
            state.cart = []
            return state
        }

        case "SUMMARY": {
            state = { ...state }
            state.summary = true
            state.pageTitle = "SUMMARY"
            state.orderActive = ""
            state.deliveryActive = "active"
            return state
        }
        case "ADDRESS": {
            state = { ...state }
            state.address = true
            state.pageTitle = "Address"
            return state
        }
        default: return state
    }
}
export default CartReducer