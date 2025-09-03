import { fetchAllBannerApi } from "../../../api/banner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}


function Banner() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSlideChange = (index: number): void => {
    setActiveSlide(index);
  };

  const fetchBanner = async () => {
    const response = await fetchAllBannerApi()
    if (response.success) {
      setHeroSlides(response.data)
    } else {
      toast.error(response.message)
    }
  }
  useEffect(() => {
    fetchBanner()
  }, [])





  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${ index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0">
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="slide"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-pulse">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-0 animate-pulse">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all ${ index === activeSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              aria-label={`Go to slide ${ index + 1 }`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Banner