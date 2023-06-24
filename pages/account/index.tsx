import Wrapper from "@/components/wrapper.component"
import { API_URL } from "@/utils/urls"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Account = () => {
  const [userData, setUserData] = useState<any>()
  console.log("userData: ", userData)
  const router = useRouter()
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("auth-token")}`

  useEffect(() => {
    const token = global?.window?.localStorage.getItem("auth-token")
    if (token === null) {
      router.push("/login")
    } else {
      var myHeaders = new Headers()
      myHeaders.append("Authorization", `Bearer ${token && JSON.parse(token)}`)

      var requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }

      fetch(`${API_URL}/api/users/me`, requestOptions)
        .then((response) => response.json())
        .then((result) => setUserData(result))
        .catch((error) => console.log("error", error))
    }
  }, [router])

  return (
    <div>
      <Wrapper className="py-5 md:w-1/2 sm:w-full bg-slate-100 my-10 ">
        <h1 className="text-4xl text-center">My Account</h1>
        <hr />
        <div className="flex  py-4 justify-between">
          <p>Name</p>
          <p>{userData?.username}</p>
        </div>
        <div className="flex  py-4 justify-between">
          <p>email</p>
          <p>{userData?.email}</p>
        </div>
        <div className="mt-5 cursor-pointer" onClick={() => alert("todo")}>
          want to change your password?
        </div>
        <h1 className="text-2xl mt-5">Quick Links</h1>
        <hr />
        <div className="py-4">
          <p className="cursor-pointer py-1">home</p>
          <p className="cursor-pointer py-1">cart</p>
          <p className="cursor-pointer py-1">wishlist </p>
          <p className="cursor-pointer py-1">about</p>
          <p className="cursor-pointer py-1">contact</p>
        </div>
      </Wrapper>
    </div>
  )
}

export default Account
