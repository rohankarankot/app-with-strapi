export const getDiscountedPercentage = (
  price: number,
  originalPrice: number
) => {
  return (((originalPrice - price) / originalPrice) * 100).toFixed(1)
}

export const getToken = () => {
  return localStorage.getItem("authToken")
}

export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem("authToken", token)
  }
}

export const removeToken = () => {
  localStorage.removeItem("authToken")
}
