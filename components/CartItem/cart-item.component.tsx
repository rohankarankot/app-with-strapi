import { removeFromCart, updateCart } from "@/store/features/cart.slice"
import { currencyPrettier } from "@/utils/currency"
import Image from "next/image"
import React from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
const CartItem = ({ data }: any) => {
  const dispatch = useDispatch()
  const p = data.attributes
  console.log("data: ", p)
  const updateCartItem = (e: any) => {
    let payload = {
      val: parseInt(e.target.value),
      id: data.id,
    }
    dispatch(updateCart(payload))
  }
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={p.thumbnail?.data?.attributes?.url}
          alt={p.name}
          width={120}
          height={150}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p.name}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : {currencyPrettier(p.price)}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {p.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e)}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => {
              if (
                confirm("Do you really want to remove this item from cart") ==
                true
              ) {
                dispatch(removeFromCart({ id: data.id }))
              }
            }}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
