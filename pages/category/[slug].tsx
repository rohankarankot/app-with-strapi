import PLPCard from "@/components/plp-card.component.tsx/card"
import Wrapper from "@/components/wrapper.component"
import { fetchApiData } from "@/utils/api"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React, { Fragment, useState } from "react"
import useSWR from "swr"
const Category = ({ category, products, slug }: any) => {
  const [pageIndex, setPageIndex] = useState(1)

  const { data, error, isLoading }: any = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${10}`,
    fetchApiData,
    {
      fallbackData: products,
    }
  )
  return (
    <Fragment>
      <Wrapper>
        <div className="text-center py-5">
          <h1 className="text-4xl capitalize">
            {category?.data?.[0]?.attributes?.name}
          </h1>

          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap justify-center">
              {!isLoading ? (
                data?.data?.map((item: any) => (
                  <PLPCard key={item?.id} data={item} />
                ))
              ) : (
                <div className=" w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                  <span className="text-2xl font-medium">Loading...</span>
                </div>
              )}
            </div>
          </div>
          {/* PAGINATION BUTTONS START */}
          {data?.meta?.pagination?.total > 1 && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}>
                Previous
              </button>

              <span className="font-bold">{`${pageIndex} of ${
                data && data.meta.pagination.pageCount
              }`}</span>

              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={
                  pageIndex === (data && data.meta.pagination.pageCount)
                }
                onClick={() => setPageIndex(pageIndex + 1)}>
                Next
              </button>
            </div>
          )}
          {/* PAGINATION BUTTONS END */}
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default Category

export const getStaticPaths: any = async () => {
  const categories = await fetchApiData("/api/categories?populate=*")
  const paths = categories?.data?.map((c: any) => ({
    params: {
      slug: c.attributes?.slug,
    },
  }))
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  const category = await fetchApiData(
    `/api/categories?filters[slug][$eq]=${slug}`
  )
  const products = await fetchApiData(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${4}`
  )

  return {
    props: {
      category,
      products,
      slug,
    },
  }
}
