import Slider from 'react-slick'
import type { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { entries } from './content'
import type { ContentEntry } from './content'
import './App.css'

function SlideEntry(props: ContentEntry) {
  const slider: Settings = {
    infinite: false,
    centerPadding: "100px",
    slidesToShow: 2,
    swipeToSlide: true,
  };
  
  return(<>
    <h2>{props.title}</h2>
    <Slider {...slider}>
      {props.images.map((image) => <div>
        <img className='slide-entry-image' height={500}  src={image} />
      </div>)}
    </Slider>
    <p className='slide-entry-text'>{props.content}</p>
  </>)
}

function App() {
  return (<>
    <div onWheel={(e) => console.log(e.deltaY)}>
      <h1>Прогулка по старому Архангельску</h1>
      {entries.map(SlideEntry)}
    </div>
  </>)
}

export default App
