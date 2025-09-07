import { fetchAllBannerApi } from "../../../api/banner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

function Banner() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const navigate = useNavigate();

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
    const response = await fetchAllBannerApi();
    if (response.success) {
      setHeroSlides(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === activeSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-900/30" />
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1
                className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4 transition-all duration-1000 ${
                  index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {slide.title}
              </h1>
              <p
                className={`text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-6 transition-all duration-1000 delay-200 ${
                  index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {slide.subtitle}
              </p>
              <button
                onClick={() => navigate('/project')}
                className={`relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-base hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } transition-all duration-1000 delay-400`}
                aria-label="Explore projects"
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSlide
                ? 'bg-blue-400 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;