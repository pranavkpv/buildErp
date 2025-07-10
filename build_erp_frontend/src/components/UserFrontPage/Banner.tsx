import { useEffect, useState } from "react";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}


function Banner(){
   const [activeSlide, setActiveSlide] = useState<number>(0);

    const heroSlides: HeroSlide[] = [
        {
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
          title: 'Premium Luxury Homes',
          subtitle: 'Experience the finest in modern living'
        },
        {
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
          title: 'Smart Urban Living',
          subtitle: 'Designed for the modern lifestyle'
        },
        {
          image: 'https://thumbs.dreamstime.com/b/beautiful-new-home-exterior-clear-evening-provides-setting-luxurious-34711767.jpg',
          title: 'Affordable Excellence',
          subtitle: 'Quality homes within your reach'
        }
      ];
      useEffect(() => {
          const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
          }, 5000);
          return () => clearInterval(interval);
        }, [heroSlides.length]);

         const handleSlideChange = (index: number): void => {
    setActiveSlide(index);
  };
      
       



   return(
      <>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${ index === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${ slide.image })` }}
            />
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