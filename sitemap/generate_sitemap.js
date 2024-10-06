// generate_sitemap.js

const fs = require('fs');
const path = require('path');

// Define array of URLs
const urls = [
    'https://ufirst.jp/JapanCastleMap/',
    'https://ufirst.jp/JapanCastleMap/en/',
    'https://ufirst.jp/JapanCastleMap/map',
    'https://ufirst.jp/JapanCastleMap/map/en/',
    'https://ufirst.jp/JapanCastleMap/list/en/'
];

// Read JSON file
const filePath = path.join(__dirname, 'shiro.geojson');
const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

json.features.forEach(feature => {
    urls.push(`https://ufirst.jp/JapanCastleMap/map/ja/${encodeURIComponent(feature.properties.title)}`);
    urls.push(`https://ufirst.jp/JapanCastleMap/map/en/${encodeURIComponent(feature.properties.title)}`);
});

// Start of sitemap.xml output
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Loop through each URL and generate the sitemap entry
urls.forEach(url => {
    sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
});

// End of sitemap.xml output
sitemap += '\n</urlset>';

// Write sitemap to file or console
console.log(sitemap);
// fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf8');