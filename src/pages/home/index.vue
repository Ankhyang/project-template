<!--
 * @Author: your name
 * @Date: 2020-12-07 10:37:52
 * @LastEditTime: 2021-05-28 18:12:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\pages\home\index.vue
-->
<template>
    <div class="calculation-box">
        <div id="map"></div>
        <div id="calculated-area"></div>
    </div>
</template>
 
<script>
    
export default {
    name: 'map',
    data() {
        return {

        }
    },
    mounted() {
        var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = 'pk.eyJ1IjoieWFuZ2h1YW5mb3JtYXBib3giLCJhIjoiY2twODRyYTFmMDFhMDJwcGlsdnk5YWZmZyJ9.xsV7A10qvz9XKYsNBOlJwA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/yanghuanformapbox/ckp85houo593d17nxdjbmxuy4',
            center: [106.499548,29.616224]
        });

        var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });
        map.addControl(draw)

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);
        
        function updateArea(e) {
            var data = draw.getAll();
            var answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                var area = turf.area(data);
                // restrict to area to 2 decimal points
                var rounded_area = Math.round(area * 100) / 100;
                answer.innerHTML =
                    '<p><strong>' +
                        rounded_area +
                    '</strong></p><p>square meters</p>';
            } else {
                answer.innerHTML = '';
            if (e.type !== 'draw.delete')
                alert('Use the draw tools to draw a polygon!');
            }
        }
    }
}
</script>

<style>
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
        bottom: 0; 
        width: 100%; 
    }
    #calculated-area {
        height: 75px;
        width: 150px;
        position: absolute;
        bottom: 40px;
        left: 10px;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 15px;
        text-align: center;
    }
    p {
        font-family: 'Open Sans';
        margin: 0;
        font-size: 13px;
    }
</style>