/*
 * @Author: your name
 * @Date: 2021-06-03 14:08:10
 * @LastEditTime: 2021-06-03 17:45:18
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
        selectionchange() {
            this.draw.deleteAll();
        },
        updateCall() {
            const { draw } = this;
            let drawMode = draw.getMode();
            console.log('drawMode', drawMode)
            // 根据不同的操作，执行不同的方法
            switch(drawMode) {
                // 绘画点
                case 'draw_point':
                    
                    break;
                // 绘画线
                case 'draw_line_string': 
        
                    break;
                // 绘画多边形
                case 'draw_polygon': 
        
                    break;
                default: 
                    break;
            }
            let data = draw?.getAll();
            let answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                let area = turf.area(data);
                let rounded_area = Math.round(area * 100) / 100;
                answer.innerHTML =
                    '<p><strong>' +
                        rounded_area +
                    '</strong></p><p>square meters</p>';
            } else {
                answer.innerHTML = '';
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
                // keybindings: false,
                // touchEnabled: false,
                defaultMode: 'draw_polygon',
                // styles: [
                //     // ACTIVE (being drawn)
                //     // line stroke
                //     {
                //         "id": "gl-draw-line",
                //         "type": "line",
                //         "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                //         "layout": {
                //           "line-cap": "round",
                //           "line-join": "round"
                //         },
                //         "paint": {
                //           "line-color": "#D40C0C",
                //         //   "line-dasharray": [0.2, 2],
                //           "line-width": 2
                //         }
                //     },
                //     // polygon fill
                //     {
                //         "id": "gl-draw-polygon-fill",
                //         "type": "fill",
                //         "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                //         "paint": {
                //             "fill-color": "#D20C0C",
                //             "fill-outline-color": "#D20C0C",
                //             "fill-opacity": 0.1
                //         }
                //     },
                //     // polygon mid points
                //     {
                //         'id': 'gl-draw-polygon-midpoint',
                //         'type': 'circle',
                //         'filter': ['all',
                //         ['==', '$type', 'Point'],
                //         ['==', 'meta', 'midpoint']],
                //         'paint': {
                //             'circle-radius': 3,
                //             'circle-color': '#fbb03b'
                //         },
                //     },
                //     // polygon outline stroke
                //     // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
                //     {
                //         "id": "gl-draw-polygon-stroke-active",
                //         "type": "line",
                //         "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
                //         "layout": {
                //             "line-cap": "round",
                //             "line-join": "round"
                //         },
                //         "paint": {
                //             "line-color": "#D20C0C",
                //             "line-dasharray": [0.2, 2],
                //             "line-width": 2
                //         }
                //     },
                //     // vertex point halos
                //     {
                //         "id": "gl-draw-polygon-and-line-vertex-halo-active",
                //         "type": "circle",
                //         "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                //         "paint": {
                //             "circle-radius": 5,
                //             "circle-color": "#FFF"
                //         }
                //     },
                //     // vertex points
                //     {
                //         "id": "gl-draw-polygon-and-line-vertex-active",
                //         "type": "circle",
                //         "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                //         "paint": {
                //             "circle-radius": 3,
                //             "circle-color": "#D20C0C",
                //         }
                //     },
                //     // INACTIVE (static, already drawn)
                //     // line stroke
                //     {
                //         "id": "gl-draw-line-static",
                //         "type": "line",
                //         "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
                //         "layout": {
                //             "line-cap": "round",
                //             "line-join": "round"
                //         },
                //         "paint": {
                //             "line-color": "#000",
                //             "line-width": 3
                //         }
                //     },
                //     // polygon fill
                //     {
                //         "id": "gl-draw-polygon-fill-static",
                //         "type": "fill",
                //         "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //         "paint": {
                //             "fill-color": "#000",
                //             "fill-outline-color": "#000",
                //             "fill-opacity": 0.1
                //         }
                //     },
                //     // polygon outline
                //     {
                //         "id": "gl-draw-polygon-stroke-static",
                //         "type": "line",
                //         "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
                //         "layout": {
                //             "line-cap": "round",
                //             "line-join": "round"
                //         },
                //         "paint": {
                //             "line-color": "#000",
                //             "line-width": 3
                //         }
                //     }
                // ]
                // styles: [
                //     // Set the line style for the user-input coordinates
                //     {
                //         "id": "gl-draw-line",
                //         "type": "line",
                //         "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                //         "layout": {
                //             "line-cap": "round",
                //             "line-join": "round"
                //         },
                //         "paint": {
                //             "line-color": "#438EE4",
                //             "line-dasharray": [0.2, 2], // 虚线
                //             "line-width": 4,
                //             "line-opacity": 0.7
                //         }
                //     },
                //     // Style the vertex point halos
                //     {
                //         "id": "gl-draw-polygon-and-line-vertex-halo-active",
                //         "type": "circle",
                //         "filter": ["all", ["==", "meta", "vertex"],
                //             ["==", "$type", "Point"],
                //             ["!=", "mode", "static"]
                //         ],
                //         "paint": {
                //             "circle-radius": 12,
                //             "circle-color": "#FFF"
                //         }
                //     },
                //     // Style the vertex points
                //     {
                //         "id": "gl-draw-polygon-and-line-vertex-active",
                //         "type": "circle",
                //         "filter": ["all", ["==", "meta", "vertex"],
                //             ["==", "$type", "Point"],
                //             ["!=", "mode", "static"]
                //         ],
                //         "paint": {
                //             "circle-radius": 8,
                //             "circle-color": "#438EE4",
                //         }
                //     },
                // ]
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