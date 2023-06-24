import ProductDetailsCarousel from "@/components/ProductDetailsCarousel/product-details-carousel.component"
import RelatedProducts from "@/components/RelatedProducts/related-products.component"
import Wrapper from "@/components/wrapper.component"
import { addToCart } from "@/store/features/cart.slice"
import { fetchApiData } from "@/utils/api"
import { currencyPrettier } from "@/utils/currency"
import CustomReadMore from "@/utils/custom-read-more"
import { getDiscountedPercentage } from "@/utils/helper"
import React, { useState } from "react"
import { IoMdHeartEmpty } from "react-icons/io"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useSelector, useDispatch } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ProductDetails = ({ product, products }: any) => {
  const dispatch = useDispatch()
  const p = product?.data?.[0]?.attributes

  const notify = () => {
    toast.success("Great Choice. Added to Cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  console.log("first", {
    ...product?.data?.[0],
    quantityPrice: p.price,
  })
  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* PRODUCT TITLE */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p.name}
            </div>

            {/* PRODUCT SUBTITLE */}
            <div className="text-lg  mb-5">
              <CustomReadMore length={100}>{p.subtitle}</CustomReadMore>
            </div>

            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : {currencyPrettier(p.price)}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base  font-medium line-through">
                    {currencyPrettier(p.original_price)}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPercentage(p.price, p.original_price)}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-10">
              {`(Also includes all applicable duties)`}
            </div>
            {/* ADD TO CART BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                dispatch(
                  addToCart({
                    ...product?.data?.[0],
                    quantityPrice: p.price,
                  })
                )
                notify()
              }}>
              Add to Cart
            </button>
            {/* ADD TO CART BUTTON END */}
            {/* WHISH LIST BUTTON START */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* WHISH LIST BUTTON END */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>

        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  )
}

export default ProductDetails

export async function getStaticPaths() {
  const products = await fetchApiData("/api/products?populate=*")
  const paths = products?.data?.map((p: any) => ({
    params: {
      slug: p.attributes.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const product = await fetchApiData(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  )
  const products = await fetchApiData(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  )

  return {
    props: {
      product,
      products,
    },
  }
}
