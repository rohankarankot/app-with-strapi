import HeroBanner from "@/components/HeroBanner/hero-banner.component"
import TrendingSection from "@/components/Trending"
import PLPCard from "@/components/plp-card.component.tsx/card"
import Wrapper from "@/components/wrapper.component"
import { fetchApiData } from "../utils/api"

export default function Home({ products }: any) {
  return (
    <>
      {console.log("products: ", products)}
      <main>
        <HeroBanner />
        <TrendingSection />
        <Wrapper>
          <div>
            <div className="container px-5 flex justify-center align-center w-full">
              <div className="flex flex-wrap justify-center">
                {products?.data?.map((item: any) => (
                  <PLPCard key={item?.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const products: any = await fetchApiData("/api/products?populate=*")
  return {
    props: { products },
  }
}
