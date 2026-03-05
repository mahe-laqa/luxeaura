import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroCarousel.css';

// Local, reliable image assets to avoid broken Unsplash links
const slides = [
    {
        id: 1,
        image: '/new_hero_1.png',
        title: 'THE NEW ELEGANCE',
        subtitle: 'Spring / Summer 2026 Collection',
        cta: 'Discover More'
    },
    {
        id: 2,
        image: '/new_hero_2.png',
        title: 'LUXURY REDEFINED',
        subtitle: 'Timeless pieces for the modern wardrobe',
        cta: 'Shop Collection'
    },
    {
        id: 3,
        image: '/new_hero_3_perfume.png',
        title: 'SIGNATURE SCENTS',
        subtitle: 'Elevate your daily ritual',
        cta: 'Explore Beauty'
    }
];

const HeroCarousel = () => {
    return (
        <div className="hero-section">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                speed={800}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={true}
                className="hero-swiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="hero-slide">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="hero-bg-image"
                            />
                            <div className="hero-overlay"></div>
                            <div className="hero-content container">
                                <span className="hero-subtitle">{slide.subtitle}</span>
                                <h2 className="hero-title">{slide.title}</h2>
                                <Link to="/shop" className="btn btn-primary hero-btn">
                                    {slide.cta} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
