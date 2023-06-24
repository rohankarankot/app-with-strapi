/* eslint-disable @next/next/no-img-element */

import { currencyPrettier } from "@/utils/currency"
import { getDiscountedPercentage } from "@/utils/helper"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const PLPCard = ({ data: { attributes: product, id } }: any) => {
  return (
    <Link href={`/product/${product?.slug}`}>
      <>
        <div className=" p-5  transform overflow-hidden duration-100 hover:scale-105">
          <div className="block relative h-44  rounded overflow-hidden">
            <Image
              width={500}
              height={500}
              loading="lazy"
              alt={product?.name}
              className=" object-center object-contain w-[250px] h-full block"
              src={product?.thumbnail?.data?.attributes?.url}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {product?.categories?.data?.[0]?.attributes?.name}
            </h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">
              {product?.name}
            </h2>
            <h3 className="text-gray-500 text-xs w-[250px] tracking-widest title-font mb-1">
              {product?.subtitle?.slice(0, 50)}
            </h3>
            <div className="flex justify-between mt-1">
              <div className="flex gap-4">
                <p className=" text-green-700 font-semibold">
                  {currencyPrettier(product?.price)}
                </p>
                <p className=" text-red-600 line-through">
                  {product?.original_price}
                </p>
              </div>
              <p className=" text-green-700 font-semibold">
                {product?.price &&
                  product?.original_price &&
                  getDiscountedPercentage(
                    product?.price,
                    product?.original_price
                  )}
                % off
              </p>
            </div>
            <button className="flex justify-center align-middle bg-slate-800 w-full p-2 mt-3 text-white rounded">
              view more
            </button>
          </div>
        </div>
      </>
    </Link>
  )
}

export default PLPCard
