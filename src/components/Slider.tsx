import React, { useRef, useEffect, useState, Children, type ReactElement, type ReactNode } from "react";
import "./Slider.css";

export default function Slider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = Children.toArray(children) as ReactElement<{ children: ReactNode }>[];

  // Update activeIndex on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft } = container;
      const childWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).clientWidth +
          parseFloat(getComputedStyle(container).gap || "0")
        : 1;
      const index = Math.round(scrollLeft / childWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to slide on thumbnail click
  const handleThumbnailClick = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[idx] as HTMLElement;
    if (!child) return;
    container.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    setActiveIndex(idx);
  };

  // Extract <img src=...> from children
  const getImageFromChild = (child: ReactElement<{ children: ReactNode }>) => {
    const img = Children.toArray(child.props.children).find(
      (node) => (node as ReactElement).type == "img"
    ) as React.ReactElement<HTMLImageElement>;
    return img.props.src;
  };

  return (
    <div className="slider-outer">
      <div className="slider-container" ref={containerRef}>
        {children}
      </div>
      <div className="slider-thumbnails">
        {slides.map((child, idx) => {
          const src = getImageFromChild(child);
          return (
            <button
              className={`slider-thumbnail-btn${idx === activeIndex ? " active" : ""}`}
              onClick={() => handleThumbnailClick(idx)}
              tabIndex={0}
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            >
              {src ? (
                <img src={src} className="slider-thumbnail-img" />
              ) : (
                <span className="slider-thumbnail-placeholder" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}