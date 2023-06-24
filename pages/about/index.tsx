import Image from "next/image"
import React from "react"

const About = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 justify-center">
          <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
            <Image
              src={"https://avatars.githubusercontent.com/u/70481070?v=4"}
              alt={"rohan karankot"}
              width={200}
              height={200}
              className="rounded"
            />

            <div className="text-center mb-2 mt-5">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                Rohan Karankot
              </h1>
              <p className="leading-relaxed text-base">
                "An enthusiastic software developer specialized in front end
                development having 2+ years of experience"
              </p>
              <div className="flex mt-10 justify-center">
                <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
            <div className="flex-grow mt-10">
              <a
                className=" text-indigo-500 inline-flex items-center cursor-pointer"
                href="https://rohankarankot.github.io/">
                find more
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
