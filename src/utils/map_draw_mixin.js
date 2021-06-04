/*
 * @Author: your name
 * @Date: 2021-06-03 14:08:10
 * @LastEditTime: 2021-06-04 16:13:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\map_draw_utils.js
 */

import MapboxDraw from "@mapbox/mapbox-gl-draw";

// 多边形绘画
export const drawMixin = {
    data() {
        return {
            draw: null
        }
    },
    methods: {
        // 获取多边形面积
        getArea(e) {
            const d = {
                type: "FeatureCollection",
                features: e.features,
            }
            let area = turf.area(d);
            let rounded_area = `${Math.round(area * 100) / 100}平方米`;
            console.log('面积: ', rounded_area)
        },
        // 获取线条长度
        getLength(e) {
            const d = {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': e.features[0].geometry.coordinates
                }
            }
            let length = turf.length(d);
            let l = `${Math.round(length * 100) / 100}千米`
            console.log('长度：', l)
        },
        // 获取点位置
        getPoint(e) {
            console.log(e)
            const p = e.features[0].geometry.coordinates;
            console.log('坐标：', JSON.stringify(p))
        },
        selectionchange() {
            this.draw.deleteAll();
        },
        updateCall(e) {
            const { draw, getArea, getLength, getPoint } = this;
            let drawMode = draw.getMode();
            // console.log(drawMode, e)
            // 根据不同的操作，执行不同的方法
            switch(drawMode) {
                // 绘画点
                case 'draw_point':
                    getPoint(e);
                    break;
                // 绘画线
                case 'draw_line_string': 
                    getLength(e);
                    break;
                // 绘画多边形
                case 'draw_polygon': 
                    getArea(e);
                    break;
                default: 
                    break;
            }
        },
        initDraw(map) {
            const { selectionchange, updateCall } = this;
            let draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    point: true,
                    polygon: true,
                    line_string: true,
                    trash: true,
                    // combine_features: true,
                    // uncombine_features: true
                },
                keybindings: false,
                touchEnabled: false,
                defaultMode: 'simple_select',
                styles: [
                    // 点的颜色
                    {
                        "id": "gl-draw-point",
                        "type": "circle",
                        "filter": ["all", 
                            ["==", "$type", "Point"], 
                            ["!=", "mode", "static"],
                            ['==', 'active', 'true']
                        ],
                        "paint": {
                            "circle-color": "#FFFF3D",
                            "circle-stroke-width": 5,
                            "circle-stroke-color": "#FF3D3D"
                        }
                    },
                    // line stroke 线的颜色
                    {
                        "id": "gl-draw-line",
                        "type": "line",
                        "filter": ["all", 
                            ["==", "$type", "LineString"], 
                            ["!=", "mode", "static"], 
                            ['==', 'active', 'true'], 
                        ],
                        "layout": {
                            "line-cap": "round",
                            "line-join": "round"
                        },
                        "paint": {
                            "line-color": "#D40C0C",
                            "line-width": 2
                        }
                    },
                    // polygon fill 多边形填充颜色
                    {
                        "id": "gl-draw-polygon-fill",
                        "type": "fill",
                        "filter": ["all", 
                            ["==", "$type", "Polygon"], 
                            ["!=", "mode", "static"], 
                            ['==', 'active', 'true']
                        ],
                        "paint": {
                            "fill-color": "#D20C0C",
                            "fill-outline-color": "#D20C0C",
                            "fill-opacity": 0.1
                        }
                    },
                    // polygon mid points 多边形每条边的中点样式
                    {
                        'id': 'gl-draw-polygon-midpoint',
                        'type': 'circle',
                        'filter': ['all', 
                            ['==', '$type', 'Point'], 
                            ['==', 'meta', 'midpoint']
                        ],
                        'paint': {
                            'circle-radius': 5,
                            'circle-color': '#0000FF'
                        },
                    },
                    // polygon outline stroke 多边形每条边的颜色
                    {
                        "id": "gl-draw-polygon-stroke-active",
                        "type": "line",
                        "filter": ["all", 
                            ["==", "$type", "Polygon"], 
                            ["!=", "mode", "static"], 
                            ['==', 'active', 'true']
                        ],
                        "layout": {
                            "line-cap": "round",
                            "line-join": "round"
                        },
                        "paint": {
                            "line-color": "#D20C0C",
                            // "line-dasharray": [0.2, 2], // 虚线
                            "line-width": 2
                        }
                    },
                ]
            });
            map.addControl(draw)
            map.on('draw.create', updateCall);
            map.on('draw.delete', updateCall); 
            map.on('draw.update', updateCall);
            // map.on('draw.selectionchange', selectionchange);
            this.draw = draw;
        }
    }
}