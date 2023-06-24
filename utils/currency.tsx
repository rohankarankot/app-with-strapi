export const currencyPrettier = (amount: any) => {
  let formattedAmount = amount?.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  })
  return `${formattedAmount?.slice(0, 1)} ${formattedAmount?.slice(1)}`
}
