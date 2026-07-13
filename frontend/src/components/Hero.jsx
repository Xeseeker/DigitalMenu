import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/assets/hero/W_breakfast.png",
    "/assets/hero/W_lunch.png",
    "/assets/hero/w_dinner.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="hero bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-white/10">
          {/* Sliding track */}
          <div
            className="absolute inset-0 z-0 flex h-[420px] lg:h-[520px] transition-transform duration-500"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide} className="w-[calc(100%/3)] flex-shrink-0">
                <img
                  src={slide}
                  alt="hero"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center px-6 py-12 lg:px-16 lg:py-20">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex rounded-full bg-emerald-100/80 px-4 py-2 text-sm font-semibold text-emerald-950 backdrop-blur-sm shadow-sm ring-1 ring-white/20">
                Fresh menu · Green restaurant · Local flavors
              </span>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Delicious meals made greener.
                </h1>
                <p className="mt-4 max-w-xl text-base text-emerald-100 sm:text-lg">
                  Discover seasonal dishes, bright salads, and crafted plates
                  built around the restaurant’s green brand.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-200 px-8 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-100"
                >
                  View Menu
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  About Us
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">
                  Today’s favorites
                </p>
                <div className="mt-6 grid gap-4 text-left text-emerald-50">
                  <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                    <h3 className="font-semibold">Signature Breakfast</h3>
                    <p className="mt-1 text-sm text-emerald-200">
                      A fresh morning plate with herbs & citrus.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                    <h3 className="font-semibold">Fresh Lunch Bowl</h3>
                    <p className="mt-1 text-sm text-emerald-200">
                      Vibrant greens, grains, and seasonal veggies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white shadow-lg shadow-black/25 transition hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white shadow-lg shadow-black/25 transition hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`${index === currentSlide ? "h-3 w-10 rounded-full bg-emerald-200 shadow-xl" : "h-3 w-3 rounded-full bg-white/50"} transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
