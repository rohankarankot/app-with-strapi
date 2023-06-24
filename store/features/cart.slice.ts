import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Cart {
  cartItems: Array<any>
}

const initialState: Cart = {
  cartItems: [],
}

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("action", action.payload)
      const item = state.cartItems.find((p) => p.id === action.payload.id)
      if (item) {
        item.quantity++
        item.attributes.price = item.quantityPrice * item.quantity
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          p.attributes.price = p.quantityPrice * action.payload.val

          return { ...p, [action.payload.key]: action.payload.val }
        }
        return p
      })
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      )
    },
  },
})

export default CartSlice.reducer
export const { addToCart, removeFromCart, updateCart } = CartSlice.actions
