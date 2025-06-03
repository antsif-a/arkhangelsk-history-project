import type { JSX } from "react"
import Slider from "./Slider"

export interface EntryProps {
    title: string,
    images: string[]
    content: JSX.Element,
}

export default function Entry(props: EntryProps) {
  return(<>
    <h2>{props.title}</h2>
    <Slider>
      {props.images.map((image) => <div>
        <img className='slide-entry-image' height={500}  src={image} />
      </div>)}
    </Slider>
    <p className='slide-entry-text'>{props.content}</p>
  </>)
}
