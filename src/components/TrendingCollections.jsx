import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './TrendingCollections.css';

// Sample data since these are curated collections rather than individual products
const collectionsData = [
    {
        id: 1,
        title: "Autumn Essentials",
        category: "New",
        image: "/turkish_abaya_neutral.png",
        description: "Embrace the changing season with our curated selection of warm tones and comfortable layers.",
        link: "/shop?category=Women"
    },
    {
        id: 2,
        title: "The Silk Edit",
        category: "Premium",
        image: "/turkish_abaya_sophisticated.png",
        description: "Discover the unparalleled luxury and drape of our finest silk garments, designed for elegance.",
        link: "/shop?category=Women"
    },
    {
        id: 3,
        title: "Monochrome Magic",
        category: "Trending",
        image: "/fashion_knit_dress.png",
        description: "Master the art of understated elegance with our black and white statement pieces.",
        link: "/shop?category=Men"
    },
    {
        id: 4,
        title: "Everyday luxury",
        category: "Sale",
        image: "/modest_1.png",
        description: "Elevate your daily wardrobe with pieces that combine supreme comfort with flawless styling.",
        link: "/shop?category=Accessories"
    },
    {
        id: 5,
        title: "Evening Glamour",
        category: "Trending",
        image: "/fashion_knit_dress.png",
        description: "Make an unforgettable entrance with our stunning evening wear collection.",
        link: "/shop?category=Women"
    },
    {
        id: 6,
        title: "Modern Modesty",
        category: "New",
        image: "/modest_5.png",
        description: "Contemporary silhouettes that respect tradition without compromising on style.",
        link: "/shop?category=Women"
    }
];

const FILTER_TABS = ["All", "New", "Trending", "Sale", "Premium"];

const TrendingCollections = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [filteredCollections, setFilteredCollections] = useState(collectionsData.slice(0, 4));
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Scroll animation observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    // Filter logic with animation
    const handleTabClick = (tab) => {
        if (tab === activeTab || isAnimating) return;

        setIsAnimating(true);
        setActiveTab(tab);

        // Wait for fade out
        setTimeout(() => {
            let newCollections = [];
            if (tab === "All") {
                newCollections = collectionsData.slice(0, 4);
            } else {
                newCollections = collectionsData.filter(c => c.category === tab).slice(0, 4);
                // If not enough items in category, pad with others
                if (newCollections.length < 4) {
                    const others = collectionsData.filter(c => c.category !== tab && !newCollections.find(n => n.id === c.id));
                    newCollections = [...newCollections, ...others].slice(0, 4);
                }
            }

            setFilteredCollections(newCollections);

            // Wait a tiny bit then fade back in
            setTimeout(() => {
                setIsAnimating(false);
            }, 50);
        }, 300); // Duration matches CSS transition
    };

    return (
        <section className="trending-collections-section" ref={sectionRef}>
            <div className="container">
                <div className={`tc-header ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="tc-title">Curated Collections</h2>
                    <p className="tc-subtitle">Explore our hand-selected edits for every occasion</p>

                    <div className="tc-filters">
                        {FILTER_TABS.map(tab => (
                            <button
                                key={tab}
                                className={`tc-filter-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`tc-grid ${isVisible ? 'animate-in' : ''} ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    {filteredCollections.map((collection, index) => (
                        <div key={`${collection.id}-${activeTab}`} className="tc-card-wrapper">
                            <div className="tc-card-inner">
                                {/* Front of Card */}
                                <div className="tc-card-front">
                                    <div className="tc-image-container">
                                        <img
                                            src={collection.image}
                                            alt={collection.title}
                                            className="tc-image"
                                            loading="lazy"
                                        />
                                        <div className="tc-front-overlay"></div>
                                    </div>
                                    <div className="tc-front-content">
                                        <span className="tc-badge">{collection.category}</span>
                                        <h3 className="tc-collection-name">{collection.title}</h3>
                                    </div>
                                </div>

                                {/* Back of Card (Shown on Flip) */}
                                <div
                                    className="tc-card-back"
                                    style={{ '--bg-image': `url(${collection.image})` }}
                                >
                                    <div className="tc-back-content">
                                        <h3 className="tc-back-title">{collection.title}</h3>
                                        <p className="tc-description">{collection.description}</p>
                                        <Link to={collection.link} className="tc-shop-btn">
                                            Discover <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingCollections;
