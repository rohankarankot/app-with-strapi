import { useState } from "react"

interface ReadMoreInterface {
  children: string
  length: number
  textStyles?: any
}

const CustomReadMore = ({
  children,
  length,
  textStyles,
}: ReadMoreInterface) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <div className={{ ...textStyles }}>
      {isReadMore ? text?.slice(0, length) : text}
      {text?.length > length && (
        <>
          {isReadMore && <span>{` ...`}</span>}
          <span
            className="cursor-pointer font-bold"
            onClick={toggleReadMore}
            suppressContentEditableWarning={true}>
            {isReadMore ? "more" : " less"}
          </span>
        </>
      )}
    </div>
  )
}

export default CustomReadMore
