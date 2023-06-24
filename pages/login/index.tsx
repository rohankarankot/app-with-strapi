/* eslint-disable @next/next/no-img-element */
import Wrapper from "@/components/wrapper.component"
import { API_URL } from "@/utils/urls"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Index = () => {
  const [formValues, setFormValues] = useState<any>({
    identifier: "",
    password: "",
  })
  const notify = (msg: any) => {
    toast.success(msg, {
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
  const router = useRouter()
  const handleLogin = (e: any) => {
    e.preventDefault()
    // Request API.
    axios
      .post(`${API_URL}/api/auth/local`, {
        identifier: formValues?.identifier,
        password: formValues?.password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!")
        console.log("User profile", response.data.user)
        console.log("User token", response.data.jwt)
        global?.window?.localStorage.setItem(
          "auth-token",
          JSON.stringify(response.data.jwt)
        )
        notify("Awesome!!! Welcome back buddy...")
        router.push("/")
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response)
        notify(error.response?.data?.error.message)
      })
  }
  return (
    <Wrapper>
      <ToastContainer style={{ zIndex: 999999 }} />
      <section className="py-10 ">
        <div className="h-full">
          <h1 className="text-5xl text-center from-neutral-500 font-semibold">
            Welcome back!
          </h1>
          {/* <!-- Left column container with background--> */}
          <div className="g-6 flex  flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>

            {/* <!-- Right column container --> */}
            <div className="mb-12 md:mb-0  lg:w-5/12 xl:w-5/12">
              <form onSubmit={handleLogin}>
                {/* <!-- identifier input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    onChange={(e: any) =>
                      setFormValues({
                        ...formValues,
                        identifier: e.target.value,
                      })
                    }
                    value={formValues?.identifier}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Email Address or username"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    onChange={(e: any) =>
                      setFormValues({
                        ...formValues,
                        password: e.target.value,
                      })
                    }
                    value={formValues?.password}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    id="exampleFormControlInput22"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  {/* <!--Forgot password link--> */}
                  <a href="#!">Forgot password?</a>
                </div>

                {/* <!-- Login button --> */}
                <div className="text-center lg:text-left">
                  <div>
                    <button className="inline-flex text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded">
                      Login
                    </button>
                    <br />
                    <a
                      className="inline-flex  border-0 py-2 focus:outline-none  rounded cursor-pointer"
                      onClick={() => {
                        setFormValues({
                          identifier: "guest",
                          password: "guest123",
                        })
                      }}>
                      populate guest credentials
                    </a>
                  </div>

                  {/* <!-- Register link --> */}
                  <Link href="/register">
                    <p className="mb-0 mt-2 pt-1  font-semibold">
                      Don't have an account?
                      <span className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">
                        {" Register"}
                      </span>
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default Index
