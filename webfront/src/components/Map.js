import React, {useRef, useEffect, useState} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import ShiroJson from  "../asset/shiro.geojson";
import shiroIcon from "../asset/shiro_1.png";
import { useGsiTerrainSource }  from "maplibre-gl-gsi-terrain";
import * as pmtiles from 'pmtiles';

import './Map.css';
import axios from "axios";
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);


const Map = ({CastleName, lang}) => {
    const mapContainer = useRef(null);
    const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);
//    const [exactMatchFeatures, setExactMatchFeatures] = useState(null);
    console.log(CastleName);
    console.log(lang);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: mapContainer.current,
//            style:"https://mierune.github.io/rekichizu-style/styles/street/style.json",

            style: {
                version: 8,
                glyphs: 'https://glyphs.geolonia.com/{fontstack}/{range}.pbf',
                sources: {
                    gsistandard: {
                        type: 'raster',
//                        tiles: ["https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"],
                        tiles: ['https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejdueG92YjAwZHUzMnA5ZWIyMW1zcDQifQ.acDRLVcqW0LZfWQXvC3-pw'],
                        tileSize: 512,
                        maxzoom: 21,
                        attribution: 'mapbox'
                    },
                    shiroJson: {
                        type: 'geojson',
                        data: ShiroJson,
                        attribution: '<a href="https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E5%9F%8E%E4%B8%80%E8%A6%A7">wikipedia</a>'
                    },
                    rekisiChimei: {
                        type:'vector',
                        url: `pmtiles://${window.location.href.replace(/map.*/,'')}asset/pmtile/chimei.pmtiles`,
                        attribution: '<a href="https://geonlp.ex.nii.ac.jp/dictionary/geoshape-nrct/" target="_blank">『日本歴史地名大系』地名項目データセット地名辞書</a>'
                    },
                    // temples: {
                    //     type:'vector',
                    //     url: `pmtiles://${window.location.href.replace(/map.*/,'')}asset/pmtile/temple.pmtiles`,
                    // },
                    kunichizu: {
                        type:'vector',
                        url: `pmtiles://${window.location.href.replace(/map.*/,'')}asset/pmtile/kunichizu.pmtiles`,
                        attribution: '<a href="https://gunmap.booth.pm/" target="_blank">郡地図研究会</a>'
                    },
                    terrain: gsiTerrainSource,
                },
                terrain: {
                    source: 'terrain',
                    exaggeration: 1.2,
                },
                layers: [
                    {
                        id: "gsi-standard",
                        source: "gsistandard",
                        type: 'raster'
                    },
                    // 郡ポリゴン
                    {
                        id:"kunichizu",
                        source: 'kunichizu',
                        'source-layer': 'gun',
                        type: 'fill',
                        paint: {
                            'fill-color': '#000000',
                            'fill-opacity': 0.1,
                        },
                        minzoom:10
                    },
                    {
                        id:"kunichizu-boder",
                        source: 'kunichizu',
                        'source-layer': 'gun',
                        type: 'line',
                        paint: {
                            'line-color': '#ffffff',
                        },
                        minzoom:10
                    },
                    {
                        id: 'kunichizu-label',
                        type: 'symbol',
                        source: 'kunichizu',
                        'source-layer': 'gun',
                        layout: {
                            'text-font': ['Noto Sans CJK JP Bold'],
                            'text-size': 20,
                            'text-field': ['get', 'gun'],
                            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                            'text-radial-offset': 0.5,
                            'text-justify': 'auto',
                            'icon-image': ['concat', ['get', 'icon'], '_15'],
                            // 'text-color': '#FFFFFF'  // 赤色
                        },
                        paint:{
                            'text-halo-width': 1,
                            'text-halo-color': '#fff',
                            'text-opacity': 0.7
                        },
                        minzoom:10
                    },
                    // 国ポリゴン
                    {
                        id:"gunichizu",
                        source: 'kunichizu',
                        'source-layer': 'kuni',
                        type: 'fill',
                        paint: {
                            'fill-color': '#000000',
                            'fill-opacity': 0.1,
                        },
                        minzoom:1,
                        maxzoom:10
                    },
                    {
                        id:"gunichizu-boder",
                        source: 'kunichizu',
                        'source-layer': 'kuni',
                        type: 'line',
                        paint: {
                            'line-color': '#ffffff',
                        },
                        minzoom:1,
                        maxzoom:10
                    },
                    {
                        id: 'gunichizu-label',
                        type: 'symbol',
                        source: 'kunichizu',
                        'source-layer': 'kuni',
                        layout: {
                            'text-font': ['Noto Sans CJK JP Bold'],
                            'text-size': 20,
                                'text-field': ['get', 'kuni'],
                            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                            'text-radial-offset': 0.7,
                            'text-justify': 'auto',
                            'icon-image': ['concat', ['get', 'icon'], '_15'],
                            // 'text-color': '#FFFFFF'  // 赤色
                        },
                        paint:{
                            'text-halo-width': 1,
                            'text-halo-color': '#fff',
                            'text-opacity': 0.5
                        },
                        minzoom:1,
                        maxzoom:10
                    },

                    // {
                    //     id: 'temple-label',
                    //     type: 'symbol',
                    //     source: 'temples',
                    //     'source-layer': 'temple-layer',
                    //     layout: {
                    //         'text-font': ['Noto Sans CJK JP Bold'],
                    //         'text-size': 24,
                    //         'text-field': ['get', 't_name'],
                    //         'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    //         'text-radial-offset': 1,
                    //         'text-justify': 'auto',
                    //         'icon-image': ['concat', ['get', 'icon'], '_15'],
                    //         // 'text-color': '#FFFFFF'  // 赤色
                    //     },
                    //     paint:{
                    //         'text-halo-width': 1,
                    //         'text-halo-color': '#fff',
                    //         'text-opacity': 1
                    //     },
                    //     minzoom:5,
                    //     maxzoom:19
                    // },

                    {
                        id: 'chimei-label',
                        type: 'symbol',
                        source: 'rekisiChimei',
                        'source-layer': 'chimei',
                        layout: {
                            'text-font': ['Noto Sans CJK JP Bold'],
                            'text-size': 12,
                            'text-field': ['get', 'body'],
                            'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                            'text-radial-offset': 1,
                            'text-justify': 'auto',
                            'icon-image': ['concat', ['get', 'icon'], '_15'],
                            // 'text-color': '#FFFFFF'  // 赤色
                        },
                        paint:{
                            'text-halo-width': 1,
                            'text-halo-color': '#fff',
                            'text-opacity': 1
                        },
                        minzoom:10,
                        maxzoom:19
                    },

                ]
            },
            center: [139.754367 ,35.688325],
            zoom: 8,
            pitch: 45
        });

        // map.on('moveend', function () {
        //     console.log(map.getZoom());
        // });

        map.on('load', function () {

            let defaultCastleFeature = null;
            console.log("defaultCastleFeature",defaultCastleFeature);
            // 城名が指定されていた場合 ズームして回転
            if(CastleName !== undefined){
                console.log("CastleName",CastleName);
                // geojson から検索して座標を取得
                axios.get(ShiroJson)
                    .then(response => {
                        console.log("response",response);

                        const exactMatchFeatures = response.data.features.filter(feature => feature.properties.title === CastleName);
                        defaultCastleFeature = exactMatchFeatures[0];
                        console.log("defaultCastleFeature",defaultCastleFeature);

                        map.flyTo({
                            center: defaultCastleFeature.geometry.coordinates,
                            zoom: 16,
                            bearing: 0,
                            speed: 0.6,
                            curve: 1,
                            essential: true,
                        });

                    })
                    .catch(error => {
                        console.error('Error fetching JSON file:', error);
                    });
            }

            map.loadImage(shiroIcon, function (error, image) {
                if (error) throw error;
                map.addImage('shiro_icon', image);
            });

            map.addLayer({
                id: 'shiro-label',
                type: 'symbol',
                source: 'shiroJson',
                minzoom: 10,
                layout: {
                    'text-field': ['get', (lang==="ja" || !lang)?'title':'title_en'],
                    'text-font': ['Noto Sans CJK JP Bold'],
                    'text-offset':
                        [
                            0,3
                        ],
                    'text-size': [
                        'interpolate',
                        ['linear'],['zoom'],
                        10,
                        14
                    ]
                },
                paint: {
                    'text-halo-width': 1,
                    'text-halo-color': '#fff',
                }
            });

            map.addLayer({
                id: 'shiro-icon',
                type: 'symbol',
                source: 'shiroJson',
//                minzoom: 1,
                layout: {
                    'icon-image': 'shiro_icon',
                    'icon-size': [
                        'interpolate',
                        ['linear'],['zoom'],
                        1,
                        0.01,
                        5,
                        0.05,
                        13,
                        0.4
                    ],
                }
            });

        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        map.addControl(new maplibregl.ScaleControl(), 'bottom-left');
        map.addControl(new maplibregl.GeolocateControl(), 'top-right');
        map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('body')}));
        map.addControl(new maplibregl.TerrainControl({
            source: "terrain"
        }));

        map.on('click', 'shiro-icon', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();

            map.flyTo({
                center: e.features[0].geometry.coordinates,
                essential: true,
                zoom: (map.getZoom() < 10) ? 15:map.getZoom(),
                bearing: 0,
                speed: 0.6,
                curve: 1
            });

            var title = e.features[0].properties.title;
            var apiUrl = 'https://ja.wikipedia.org/api/rest_v1/page/summary/' + e.features[0].properties.title;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
//                        setWikiSummary(data.extract);

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
//                     const content = `<img class="popup-image" src="${data.thumbnail.source}" /><br/>${truncateString(data.extract,200)}
// <a href="https://ja.wikipedia.org/wiki/${title}" target="_blank">詳細</a>`

                    let content = ``;
                    if (data.thumbnail && data.thumbnail.source) {
                        content = `<div class="popup-image-container">
    <img src="${data.thumbnail.source}" alt="Image" class="popup-image" id="image">
</div>${truncateString(data.extract,50)} <a href="https://ja.wikipedia.org/wiki/${title}" target="_blank">詳細</a>`
                    } else {
                        content = `${truncateString(data.extract,50)} <a href="https://ja.wikipedia.org/wiki/${title}" target="_blank">詳細</a>`
                    }
//                    console.log(content);
                    // ポップアップを表示する
                    new maplibregl.Popup({
                        offset: 10, // ポップアップの位置
                        closeButton: true, // 閉じるボタンの表示
                        maxWidth:"300px"
                    })
                        .setLngLat(coordinates)
                        .setHTML(content)
                        .addTo(map);
                })
                .catch(error => {
                    console.error('There was a problem fetching the data:', error);
                });

            });

        // Cleanup function to remove the map on component unmount
        return () => map.remove();
    }, []);

    return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

function truncateString(inputString, maxLength) {
    if (inputString.length <= maxLength) {
        return inputString;
    } else {
        return inputString.slice(0, maxLength) + '...';
    }
}
export default Map;
