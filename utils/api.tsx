import { STRAPI_API_TOKEN, API_URL } from "./urls"

export const fetchApiData = async (endpoint: any, method?: any) => {
  const options = {
    method: method || "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
  }
}
