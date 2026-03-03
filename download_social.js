import https from 'https';
import fs from 'fs';

const urls = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', // Fashion woman 1
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', // Fashion shopping
    'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop', // Elegant dress
    'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop', // Fashion pose
    'https://images.unsplash.com/photo-1485230895905-efd5b76da134?q=80&w=800&auto=format&fit=crop'  // Fashion aesthetic
];

urls.forEach((url, i) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Failed to download ${url}: ${res.statusCode}`);
            return;
        }
        const file = fs.createWriteStream(`public/social_${i + 1}.jpg`);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded social_${i + 1}.jpg`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${url}:`, err.message);
    });
});
