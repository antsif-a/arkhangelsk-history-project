import { useRef, useEffect } from "react"
import type { ReactNode } from 'react'
import "./Slider.css"

export interface SliderProps {
  acceleration?: number,
  children: ReactNode
}

export default function Slider({ children, acceleration = 1 }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    if (!container) return

    function onWheel(e: WheelEvent) {
      // Only vertical scroll
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return

      const maxScroll = container.scrollWidth - container.clientWidth
      const atStart = container.scrollLeft === 0
      const atEnd = Math.abs(container.scrollLeft - maxScroll) < 2

      if (!atEnd && e.deltaY > 0) {
        // Scrolling down but not yet at end: scroll slider
        container.scrollLeft += e.deltaY * acceleration
        e.preventDefault()
      } else if (!atStart && e.deltaY < 0) {
        // Scrolling up but not at start: scroll slider
        container.scrollLeft += e.deltaY * acceleration
        e.preventDefault()
      }
      // If at end/start, allow page to scroll
    }

    container.addEventListener("wheel", onWheel, { passive: false })
    return () => container.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <div className="slider-outer">
      <div className="slider-container" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}
