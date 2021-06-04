<!--
 * @Author: your name
 * @Date: 2020-12-07 10:37:52
 * @LastEditTime: 2021-06-04 17:35:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\pages\home\index.vue
-->
<template>
    <div class="calculation-box">
        <div id="map"></div>
        <div id="calculated-area"></div>
        <div id="menu"></div>
    </div>
</template>
 
<script>
import mapboxgl, { Map, GeoJSONSourceRaw, AnySourceImpl } from "mapbox-gl"
import axios from 'axios'
import { drawMixin } from '@utils/map_draw_mixin.js';
import { LayerFactory } from '../../utils/deckglLayer/LayerFactory.ts'
import { ACCESS_TOKEN, STYLE, CENTER } from '../../constant/map.js'
import location from '../../assets/location.png'
import factory from '../../assets/factory.png'

import '../../style/mapboxgl.less'

const builddata = [
    {
        id: "ljsz1",
        url: "/src/utils/geojson/ljsz.geojson", // 两江数字
        color: "#4a79ff",
        type: "height",
        name: '两江数字'
    },
    {
        id: "zhaomushan",
        url: "/src/utils/geojson/zhaomushan.geojson", // 照母山
        color: "#4a79ff",
        type: "Floor",
        name: '照母山'
    },
    {
        id: "shuitu",
        url: "/src/utils/geojson/shuitu.geojson", // 水土
        color: "#4a79ff",
        type: "Floor",
        name: '水土'
    },
    {
        id: "yufu",
        url: "/src/utils/geojson/yufu.geojson", // 鱼复
        color: "#4a79ff",
        type: "Floor",
        name: '鱼复'
    },
    {
        id: "longxing",
        url: "/src/utils/geojson/longxing.geojson", // 龙兴
        color: "#4a79ff",
        type: "Floor",
        name: '龙兴'
    },
];
const linedata = [
    {
        id: "alllk1",
        url: "/src/utils/geojson/alllk1.geojson",
        color: "#186895",
        linewidth: 4,
    },
    {
        id: "kglk1",
        url: "/src/utils/geojson/kglk1.geojson",
        color: "#1574b0",
        linewidth: 4,
    },
    {
        id: "kglk2",
        url: "/src/utils/geojson/kglk2.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "ljszlk1",
        url: "/src/utils/geojson/ljszlk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "lxlk1",
        url: "/src/utils/geojson/lxlk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "sglk1",
        url: "/src/utils/geojson/sglk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "stlk1",
        url: "/src/utils/geojson/stlk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "zmslk1",
        url: "/src/utils/geojson/zmslk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "yflk1",
        url: "/src/utils/geojson/yflk1.geojson",
        color: "#1574b0",
        linewidth: 2,
    },
    {
        id: "jbzlk1",
        url: "/src/utils/geojson/jbzlk1.geojson",
        color: "#104d74",
        linewidth: 2,
    },
    {
        id: "yllk1",
        url: "/src/utils/geojson/yllk1.geojson",
        color: "#104d74",
        linewidth: 2,
    },
]
const imgs = {
    'location': location, 
    'factory': factory
}

export default {
    name: 'map',
    mixins: [drawMixin],
    data() {
        return {
            map: null,
            ids: [],
        }
    },
    methods:{
        // 更新路线
        updateRoute() {
            const { draw, getMatch} = this
            // Set the profile
            var profile = "driving";
            // Get the coordinates that were drawn on the map
            var data = draw.getAll();
            var lastFeature = data.features.length - 1;
            var coords = data.features[lastFeature].geometry.coordinates;
            // Format the coordinates
            var newCoords = coords.join(';')
            // Set the radius for each coordinate pair to 25 meters
            var radius = [];
            coords.forEach(element => {
                radius.push(25);
            });
            getMatch(newCoords, radius, profile);
        },
        // 根据路线获取匹配点
        getMatch(coordinates, radius, profile) {
            // Separate the radiuses with semicolons
            var radiuses = radius.join(';')
            // Create the query
            var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
            // $.ajax({
            //     method: 'GET',
            //     url: query
            // }).done(function(data) {
            //     // Get the coordinates from the response
            //     var coords = data.matchings[0].geometry;
            //     console.log(coords);
            //     // Code from the next step will go here
            // });
            axios.get(query).then(res => {
                 // Get the coordinates from the response
                var coords = res.data.matchings[0].geometry;
                // Draw the route on the map
                console.log(JSON.stringify(coords));
                // this.addRoute(coords)
            })
        },
        // 添加路由点
        addRoute() {
            const coords = {"coordinates":[[106.631361,29.681802],[106.629193,29.677241],[106.626115,29.678125],[106.626058,29.677967],[106.622664,29.670799],[106.622957,29.670648],[106.622984,29.670356],[106.622752,29.670174],[106.622434,29.670217],[106.618167,29.661452],[106.615556,29.662648],[106.61558,29.662697],[106.618058,29.668112],[106.62097,29.673897],[106.621037,29.674031],[106.618895,29.674777],[106.618705,29.674843],[106.623516,29.681286],[106.624038,29.681745],[106.624167,29.681696],[106.627577,29.680433],[106.627615,29.680422],[106.628688,29.682561]],"type":"LineString"}
            const { map } = this;
            if(map.getSource('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            }else{
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {}, 
                            'geometry': coords 
                        }
                    },
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#00ACE6',
                        'line-width': 3,
                        'line-opacity': 0.5,
                        'line-dasharray': [0.5, 2]
                    }
                })
            }
        },
        // 展示弹框
        showPopup({ className = 'popup-container-common', coordinates, description}) {
            const { map } = this;
            new mapboxgl.Popup({
                maxWidth: 'none',
                className: `${className}`, 
                anchor: 'left' // 弹框居右
            }).setLngLat(coordinates)
                .setHTML(description) 
                .addTo(map)
        }
    },
    mounted() {
        mapboxgl.accessToken = ACCESS_TOKEN;
        let map = new Map({
            container: 'map',
            style: STYLE,
            center: CENTER,
            zoom: 11,
            attributionControl: false
        });

        const { showPopup } = this;

        // 添加全屏控制图标
        // map.addControl(new mapboxgl.FullscreenControl())

        // map.addControl(new mapboxgl.AttributionControl({
        //     compact: false
        // }))

        // marker图标
        // var marker = new mapboxgl.Marker({
        //     color: 'red',
        //     draggable: true,
        // }).setLngLat([106.6507, 29.6679])
        // .addTo(map);

        // 大小控制工具
        var nav = new mapboxgl.NavigationControl({
            visualizePitch: true
        });
        map.addControl(nav, 'top-left');
    
        // 添加定位图标
        // map.addControl(new mapboxgl.GeolocateControl({
        //     positionOptions: {
        //         enableHighAccuracy: true
        //     },
        //     trackUserLocation: true
        // }));

        // popup弹框， 展示信息
        // var markerHeight = 50, markerRadius = 10, linearOffset = 25;
        // var popupOffsets = {
        //     'top': [0, 0],
        //     'top-left': [0,0],
        //     'top-right': [0,0],
        //     'bottom': [0, -markerHeight],
        //     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        //     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        //     'left': [markerRadius, (markerHeight - markerRadius) * -1],
        //     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
        // };
        // var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
        //             .setLngLat([106.6507, 29.6679])
        //             .setHTML("<h1>Hello World!</h1>")
        //             .setMaxWidth("300px")
        //             .addTo(map);

        // 第一次加载，加载图标
        map.on('load', function(){
            // Load an image from an external URL.
            Object.keys(imgs).forEach(item => {
                map.loadImage(imgs[item], function(error, image) {
                    if (error) throw error;
                    // Add the loaded image to the style's sprite with the ID item.
                    if (!map.hasImage(item)) map.addImage(item, image);
                });
            })
        })
        map.on('load', async function() {
            let ids = [];
            // 添加建筑物
            await builddata.forEach(item => {
                LayerFactory.CreateNormalBuildingLayer({DataURL: item.url, name: item.name}).then(layer => {
                    map.addLayer(layer)
                    ids.push({id: layer.id, name: layer.props.name + '低建筑物'})
                })
                LayerFactory.CreateTopBuildingLayer({ DataURL: item.url, name: item.name }).then(layer => {
                    map.addLayer(layer)
                    // ids.push({id: layer.id, name: layer.props.name + '高建筑物'})
                })
            })
            this.ids = ids;

            linedata.forEach(item => {
                map.addSource(item.id, {
                    type: 'geojson',
                    lineMetrics: true,
                    data: item.url
                })
                map.addLayer({
                    type: 'line',
                    source: item.id,
                    id: item.id,
                    paint: {
                        'line-color': 'red',
                        'line-width': item.linewidth,
                        "line-opacity": 0.8,
                        'line-gradient': [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                            0,
                            'blue',
                            0.1,
                            'royalblue',
                            0.3,
                            'cyan',
                            0.5,
                            'lime',
                            0.7,
                            'yellow',
                            1,
                            'red'
                        ]
                    },
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'miter'
                    }
                })
            })

            // 添加数据展示
            map.addSource('places', {
                // This GeoJSON contains features that include an "icon"
                // property. The value of the "icon" property corresponds
                // to an image in the Mapbox Streets style's sprite.
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                'description': '<div class="name"><strong>我是复盛街道</strong></div>',
                                'icon': 'location'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [106.794719,29.646757]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description': '<div class="name"><strong>我是人和街道</strong></div>',
                                'icon': 'factory' // 当前点图标
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [106.53723,29.627022]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description': '<div class="name"><strong>我是人和街道-康居1期</strong></div>',
                                'icon': 'factory' // 当前点图标
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [106.536028,29.625922]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description': '<div class="name"><strong>我是金科天湖美镇</strong></div>',
                                'icon': 'factory' // 当前点图标
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [106.528411,29.628029]
                            }
                        },
                    ]
                }
            })
            map.addLayer({
                id: 'places',
                type: 'symbol', // 
                source: 'places',
                'layout': {
                    'icon-image': '{icon}', // 对应source的icon
                    'icon-size': 1,
                    'icon-allow-overlap': true
                }
            })

            map.addSource('my-data', {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [106.678994,29.60157]
                    },
                    "properties": {
                        "title": "Mapbox DC",
                        "marker-symbol": "monument"
                    }
                }
            });
            map.addLayer({
                id: 'my-data',
                type: 'circle', // 圆
                source: 'my-data',
                paint: {
                    // Mapbox Style Specification paint properties
                    "circle-color": "red", // 内圆的颜色
                    "circle-stroke-width": 20, // 外圆的直径大小
                    'circle-stroke-color': 'yellow' // 外圆填充的颜色
                },
                layout: {
                    // Mapbox Style Specification layout properties
                }
            })

            map.on('click', 'places', function(e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var description = e.features[0].properties.description;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                showPopup({coordinates, description})
            })

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', function () {
                map.getCanvas().style.cursor = '';
            });

            // 路线添加
            const coords = {"coordinates":[[106.631361,29.681802],[106.629193,29.677241],[106.626115,29.678125],[106.626058,29.677967],[106.622664,29.670799],[106.622957,29.670648],[106.622984,29.670356],[106.622752,29.670174],[106.622434,29.670217],[106.618167,29.661452],[106.615556,29.662648],[106.61558,29.662697],[106.618058,29.668112],[106.62097,29.673897],[106.621037,29.674031],[106.618895,29.674777],[106.618705,29.674843],[106.623516,29.681286],[106.624038,29.681745],[106.624167,29.681696],[106.627577,29.680433],[106.627615,29.680422],[106.628688,29.682561]],"type":"LineString"}
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {}, 
                        'geometry': coords 
                    }
                },
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#00ACE6',
                    'line-width': 3,
                    'line-opacity': 1,
                    'line-dasharray': [1, 2] // 单个线条长度，间隔
                }
            })

        });

        map.on('idle', function() {
            let toggleableLayerIds = this.ids;
            toggleableLayerIds?.forEach(item => {
                if(!document.getElementById(item.id)) {
                    let link = document.createElement('a')
                    link.id = item.id;
                    link.href = "#";
                    link.textContent = item.name;
                    link.className = 'active';
                    link.onclick = function(e) {
                        let clickedLayer = this.id;
                        e.preventDefault();
                        e.stopPropagation();
                        let visibility = map.getLayoutProperty(clickedLayer, 'visibility') || 'visible'
                        if(visibility === 'visible') {
                            this.className = '';
                            map.setLayoutProperty(clickedLayer, 'visibility', 'none')
                        }else{
                            this.className = 'active';
                            map.setLayoutProperty(clickedLayer, 'visibility', 'visible')
                        }
                    }
                    let layers = document.getElementById('menu');
                    layers.appendChild(link);
                }
            })
        });
        
        // 绘画工具添加
        this.initDraw(map);

        this.map = map;
    }
}
</script>

<style lang="less">
    body { 
        margin: 0; 
        padding: 0; 
    }
    .calculation-box{
        width: 100%;
        height: 100%;
    }
    #map { 
        position: absolute; 
        top: 0; 
        right: 0;
        bottom: 0; 
        width: 100%; 
    }
    #calculated-area {
        height: 1.8rem;
        width: 2.5rem;
        position: absolute;
        bottom: 10%;
        left: 5%;
        background-color: rgba(0, 0, 0, 0.4);
        padding: .15rem;
        text-align: center;
        color: #fff;
    }
    p {
        font-family: 'Open Sans';
        margin: 0;
        font-size: 13px;
    }
    #menu {
        background: #fff;
        position: absolute;
        z-index: 1;
        top: 150px;
        right: 20px;
        border-radius: 3px;
        width: 208px;
        height: auto;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-family: 'Open Sans', sans-serif;
    }
    #menu a {
        font-size: 13px;
        color: #404040;
        display: block;
        margin: 0;
        padding: 0;
        padding: 10px;
        text-decoration: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        text-align: center;
    }
    #menu a:last-child {
        border: none;
    }
    #menu a:hover {
        background-color: #f8f8f8;
        color: #404040;
    }
    #menu a.active {
        background-color: #3887be;
        color: #ffffff;
    }
    #menu a.active:hover {
        background: #3074a4;
    }
    .name{
        color: #fff;
        background: #000;
        opacity: 0.6;
        width: 300px;
        height: 200px;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
    }
</style>