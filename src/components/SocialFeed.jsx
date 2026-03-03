import React from 'react';
import { Instagram } from 'lucide-react';
import './SocialFeed.css';

const instagramPosts = [
    { id: 1, image: '/social_1.jpg', likes: '1.2k', comments: '45' },
    { id: 2, image: '/social_2.jpg', likes: '956', comments: '23' },
    { id: 3, image: '/social_3.jpg', likes: '2.4k', comments: '112' },
    { id: 4, image: '/social_4.jpg', likes: '845', comments: '19' },
    { id: 5, image: '/social_5.jpg', likes: '3.1k', comments: '204' }
];

const SocialFeed = () => {
    return (
        <section className="section social-feed">
            <div className="container-fluid" style={{ padding: '0 1rem' }}>
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h2 className="section-title">@LUXEAURA</h2>
                    <p className="section-subtitle">Follow us on Instagram for daily inspiration.</p>
                </div>

                <div className="social-grid">
                    {instagramPosts.map(post => (
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={post.id} className="social-item">
                            <img src={post.image} alt="Instagram post" loading="lazy" />
                            <div className="social-overlay">
                                <Instagram size={32} color="white" />
                                <div className="social-stats">
                                    <span>♥ {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialFeed;
