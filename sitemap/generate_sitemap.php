<?php
// generate_sitemap.php

// URLの配列を定義
$urls = array(
    'https://ufirst.jp/JapanCastleMap/',
    'https://ufirst.jp/JapanCastleMap/en/',
    'https://ufirst.jp/JapanCastleMap/map',
    'https://ufirst.jp/JapanCastleMap/map/en/',
    'https://ufirst.jp/JapanCastleMap/list/en/'
);

$json = json_decode(file_get_contents("/app/shiro.geojson"),true);

foreach($json['features'] as $feature) {
    $urls[] = 'https://ufirst.jp/JapanCastleMap/map/ja/'.urlencode($feature['properties']['title']);
    $urls[] = 'https://ufirst.jp/JapanCastleMap/map/en/'.urlencode($feature['properties']['title']);
}

// sitemap.xmlの開始部分を出力
echo '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

// 各URLに対してループしてsitemapエントリを生成
foreach ($urls as $url) {
    echo '
    <url>
        <loc>' . htmlspecialchars($url) . '</loc>
        <lastmod>' . date('c') . '</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>';
}

// sitemap.xmlの終了部分を出力
echo '
</urlset>';
?>
