import { useState, useEffect } from "react"
import Router from "next/router"
import LoadingSpinner from "./SpinnerComponent"

export const PageTransitionLoader = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let prevPathName = window?.location?.pathname
    Router.events.on("routeChangeStart", (url) => {
      const currentPathName = url?.split("?")?.[0]
      if (currentPathName === prevPathName) return
      else setLoading(true)
    })

    Router.events.on("routeChangeComplete", (url) => {
      const currentPathName = url?.split("?")?.[0]
      if (prevPathName === currentPathName) return
      setLoading(false)
      prevPathName = currentPathName
    })
  }, [])

  return (
    <>
      {loading && (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            zIndex: "10",
            position: "fixed",
            background: "grey",
            alignItems: "center",
            opacity: "0.7",
            justifyContent: "center",
          }}>
          <div className="loader bg-white p-5 rounded-full items-center justify-center flex space-x-3">
            <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </>
  )
}
