import React from 'react';
import './Lookbook.css';

const Lookbook = () => {
    return (
        <section className="section lookbook-section">
            <div className="container">
                <div className="lookbook-header">
                    <h2 className="section-title">Shop The Look</h2>
                    <p className="section-subtitle">Curated ensembles for the modern aesthete.</p>
                </div>

                <div className="lookbook-grid">
                    <div className="lookbook-main">
                        <img
                            src="/yellow_modest_dress.png"
                            alt="Spring Collection Look"
                            className="lookbook-img"
                        />

                        {/* Hotspots */}
                        <div className="hotspot" style={{ top: '35%', left: '45%' }}>
                            <div className="hotspot-dot"></div>
                            <div className="hotspot-card">
                                <img src="/bestseller_sweater.png" alt="Sweater" />
                                <div className="hc-info">
                                    <h4>Oversized Cardigan</h4>
                                    <p>$245</p>
                                </div>
                            </div>
                        </div>

                        <div className="hotspot" style={{ top: '65%', left: '55%' }}>
                            <div className="hotspot-dot"></div>
                            <div className="hotspot-card">
                                <img src="/hotspot_skirt.png" alt="Skirt" />
                                <div className="hc-info">
                                    <h4>Pleated Midi Skirt</h4>
                                    <p>$185</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lookbook;
