import React from 'react';
import './BrandLogos.css';

const brandLogos = [
    { name: "VOGUE", src: "/vogue-logo.svg" },
    { name: "ELLE", src: "/elle-logo.svg" },
    { name: "ZARA", src: "/zara-logo.svg" },
    { name: "REDTAG", src: "/redtag-logo.svg" },
    { name: "H&M", src: "/hm-logo.svg" },
    { name: "MANGO", src: "/mango-logo.svg" },
    { name: "DEBENHAMS", src: "/debenhams-logo.svg" }
];

const BrandLogos = () => {
    // To create a seamless infinite CSS loop, the content must be duplicated 
    // so the second set follows the first without a gap.
    const loopContent = [...brandLogos, ...brandLogos];

    return (
        <section className="brand-logos-section">
            <div className="brand-logos-container">
                <div className="brand-track">
                    {loopContent.map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="brand-logo-item">
                            <img
                                src={brand.src}
                                alt={`${brand.name} logo`}
                                className="brand-logo-img"
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span className="brand-logo-fallback" style={{ display: 'none' }}>
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
