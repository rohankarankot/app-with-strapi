import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface WishList {
  wishListItems: Array<any>
}

const initialState: WishList = {
  wishListItems: [],
}

export const WishListSlice = createSlice({
  name: "wish list",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: any }>) => {
      state.wishListItems.push({
        ...action.payload.item,
      })
    },
  },
})

export default WishListSlice.reducer
export const { addToCart } = WishListSlice.actions
