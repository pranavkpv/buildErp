import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchAllBannerApi } from "../../../api/banner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
function Banner() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [heroSlides, setHeroSlides] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (heroSlides.length === 0)
            return;
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);
    const handleSlideChange = (index) => {
        setActiveSlide(index);
    };
    const fetchBanner = async () => {
        const response = await fetchAllBannerApi();
        if (response.success) {
            setHeroSlides(response.data);
        }
        else {
            toast.error(response.message);
        }
    };
    useEffect(() => {
        fetchBanner();
    }, []);
    return (_jsxs("section", { className: "relative h-[70vh] md:h-[85vh] overflow-hidden bg-slate-950 border-b-4 border-orange-500", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1.5 z-20", style: {
                    backgroundImage: `repeating-linear-gradient(45deg, #f97316, #f97316 10px, #27272a 10px, #27272a 20px)`
                } }), heroSlides.map((slide, index) => (_jsxs("div", { className: `absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeSlide
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-105 pointer-events-none'}`, children: [_jsx("div", { className: "absolute inset-0", children: _jsx("img", { src: slide.image, className: "w-full h-full object-cover filter brightness-[0.4] contrast-[1.05]", alt: slide.title, loading: index === 0 ? "eager" : "lazy" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" }), _jsx("div", { className: "relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left", children: _jsxs("div", { className: "max-w-3xl space-y-6", children: [_jsxs("div", { className: `inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-md text-orange-400 font-mono text-xs tracking-widest uppercase transition-all duration-1000 delay-100 ${index === activeSlide ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`, children: [_jsx("span", { className: "w-2 h-2 bg-orange-500 rounded-full animate-pulse" }), _jsx("span", { children: "Active Venture Profile" })] }), _jsx("h1", { className: `text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none transition-all duration-1000 delay-200 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: slide.title }), _jsx("p", { className: `text-lg md:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed border-l-4 border-orange-500 pl-4 transition-all duration-1000 delay-300 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: slide.subtitle }), _jsx("div", { className: `pt-4 transition-all duration-1000 delay-400 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`, children: _jsxs("button", { onClick: () => navigate('/project'), className: "inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-orange-500", "aria-label": "Explore projects", children: [_jsx("span", { children: "Explore Portfolio" }), _jsx(ArrowUpRight, { className: "w-5 h-5 stroke-[2.5]" })] }) })] }) })] }, index))), _jsx("div", { className: "absolute bottom-8 right-4 sm:right-6 lg:right-8 z-20 flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700/50", children: heroSlides.map((_, index) => (_jsx("button", { onClick: () => handleSlideChange(index), className: `h-2 transition-all duration-300 rounded-full ${index === activeSlide
                        ? 'w-8 bg-gradient-to-r from-orange-500 to-yellow-500'
                        : 'w-2 bg-slate-600 hover:bg-slate-400'}`, "aria-label": `Go to deployment slide ${index + 1}` }, index))) })] }));
}
export default Banner;
