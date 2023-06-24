/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"

import Link from "next/link"

import { IoMdHeartEmpty } from "react-icons/io"
import { BsCart } from "react-icons/bs"
import { BiMenuAltRight } from "react-icons/bi"
import { VscChromeClose } from "react-icons/vsc"
import { fetchApiData } from "@/utils/api"
import { useSelector } from "react-redux"
import Wrapper from "../wrapper.component"
import MenuMobile from "./menu.mobile.component"
import Menu from "./menu.component"
import { RiAccountCircleFill } from "react-icons/ri"
import { AiOutlineLogout } from "react-icons/ai"

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [categories, setCategories] = useState(null)

  const { cartItems } = useSelector((state: any) => state.cart)

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]")
      } else {
        setShow("shadow-sm")
      }
    } else {
      setShow("translate-y-0")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await fetchApiData("/api/categories?populate=*")
    setCategories(data?.data)
  }
  return (
    <header
      className={`w-full h-[60px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 border-b-2 shadow-md ${show}`}>
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <h1 className="bg-slate-700 text-white p-1 rounded-full text-xl px-4">
            Brand
          </h1>
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center text-black">
          {/* Icon start */}
          <Link href="/cart" title="Wishlist">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                51
              </div>
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          <Link href="/cart" title="Cart">
            <div className="w-12 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[20px] md:text-[20px]" />
              {3 > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartItems?.length}
                </div>
              )}
            </div>
          </Link>
          <Link href="/account" title="My Account">
            <div className="w-12 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <RiAccountCircleFill className="text-[24px] md:text-[24px]" />
              {0 > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {3}
                </div>
              )}
            </div>
          </Link>
          {global?.window?.localStorage.getItem("auth-token") && (
            <div
              className="w-12 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative"
              onClick={() => {
                global?.window?.localStorage.removeItem("auth-token")
                global?.window?.location?.assign("/login")
              }}>
              <AiOutlineLogout
                className="text-[24px] md:text-[24px]"
                title="Log out"
              />
              {0 > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {3}
                </div>
              )}
            </div>
          )}
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  )
}

export default Header
