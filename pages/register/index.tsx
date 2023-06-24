/* eslint-disable @next/next/no-img-element */
import Wrapper from "@/components/wrapper.component"
import { fetchApiData } from "@/utils/api"
import { API_URL } from "@/utils/urls"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Index = () => {
  const [formValues, setFormValues] = useState<any>({
    username: "",
    email: "",
    passwords: "",
    confirmPassword: "",
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
  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    axios
      .post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      })
      .then((response) => {
        // Handle success.
        global?.window?.localStorage.setItem(
          "auth-token",
          JSON.stringify(response.data.jwt)
        )
        notify("Awesome, Registration successful!")
        router.push("/")
      })
      .catch((error) => {
        // Handle error.
        notify(error.response?.data?.error.message)
        console.log("An error occurred:", error.response?.data?.error.message)
      })
  }

  const handleRegister = (e: any) => {
    e.preventDefault()
    if (formValues?.password !== formValues?.confirmPassword) {
      alert("password and confirm password are not the same")
    }

    registerUser(formValues?.username, formValues?.email, formValues?.password)
  }
  return (
    <Wrapper>
      <ToastContainer style={{ zIndex: 999999 }} />
      <section className="py-10 ">
        <div className="h-full">
          <h1 className="text-5xl text-center from-neutral-500 font-semibold pb-10">
            Register!
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
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={handleRegister}>
                {/* <!-- user names input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    onChange={(e: any) =>
                      setFormValues({ ...formValues, username: e.target.value })
                    }
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="userName"
                  />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="email"
                    onChange={(e: any) =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Email Address"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    onChange={(e: any) =>
                      setFormValues({ ...formValues, password: e.target.value })
                    }
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    id="exampleFormControlInput22"
                    placeholder="Password"
                  />
                </div>
                {/* <!-- Password input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    onChange={(e: any) =>
                      setFormValues({
                        ...formValues,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-slate-200 focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    id="exampleFormControlInput22"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* <!-- Login button --> */}
                <div className="text-center lg:text-left">
                  <button className="inline-flex text-white bg-slate-500 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded">
                    Register
                  </button>

                  {/* <!-- Register link --> */}
                  <Link href="/login">
                    <p className="mb-0 mt-2 pt-1  font-semibold">
                      Already Registered?
                      <span className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">
                        {" Login"}
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
