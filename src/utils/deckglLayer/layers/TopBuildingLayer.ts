/*
 * @Author: your name
 * @Date: 2021-06-01 09:57:15
 * @LastEditTime: 2021-06-01 17:42:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\deckglLayer\layers\TopBuildingLayer.ts
 */
// @ts-ignore
import { PolygonLayer } from "@deck.gl/layers";
// @ts-ignore
import { MapboxLayer } from "@deck.gl/mapbox";
// @ts-ignore
import { LayerExtension, AmbientLight, LightingEffect } from '@deck.gl/core';
const uuid = require('uuid')

//图层拓展器，用于对Shader进行重写与拓展
class BuildingFilter extends LayerExtension {
    getShaders() {
        return {
            inject: {
                //注入顶点着色器声明
                'vs:#decl': `
                    varying vec2 vPosition;
                    varying vec4 vLineColor;
                `,
                //注入顶点着色器，对varying变量赋值
                'vs:#main-end': `
                    vPosition = vertexPositions;
                    vLineColor = props.lineColors;
                `,
                //注入片元着色器声明
                'fs:#decl': `
                    varying vec2 vPosition;
                    varying vec4 vLineColor;
                    uniform float uLineWidth;
                `,
                //重写颜色绘制函数
                'fs:DECKGL_FILTER_COLOR': `
                vec4 colorL = vec4(0.145, 0.372, 0.949, 1.0);
                //颜色分层
                if(vPosition.y > 0.999 && color.x > 0.2){
                
                    color = vec4(0.247 , 0.615 , 1.0, 0.8);
                }
                float p = vPosition.y;
                float x2 = p * color.x + (1.0 -p)*colorL.x;
                float y2 = p * color.y + (1.0 -p)*colorL.y;
                float z2 = p * color.z + (1.0 -p)*colorL.z;
                color = vec4(x2, y2, z2, 0.8 * ( p + 0.2));
                // 分段线条显示
                float xx;
                float yy ;
                float zz ;
                float ww ;
                if(vPosition.y > 0.2 && vPosition.y < 0.25){
                    float s = (vPosition.y - 0.225) /0.225;
                    if(s > 0.0){
                        xx = color.x * s + vLineColor.x * ( 1.0- s);
                        yy = color.y * s + vLineColor.y * ( 1.0- s);
                        zz = color.z * s + vLineColor.z * ( 1.0- s);
                        ww = color.w ;
                    }
                    if(s < 0.0){
                        xx = -color.x * s + vLineColor.x * ( 1.0 + s);
                        yy = -color.y * s + vLineColor.y * ( 1.0 + s);
                        zz = -color.z * s + vLineColor.z * ( 1.0 + s);
                        ww = color.w ;
                    }
                    color = vec4( xx, yy, zz, ww);
                }
                if(vPosition.y > 0.3 && vPosition.y < 0.35){
                    float s = (vPosition.y - 0.325) /0.325;
                    if(s > 0.0){
                        xx = color.x * s + vLineColor.x * ( 1.0- s);
                        yy = color.y * s + vLineColor.y * ( 1.0- s);
                        zz = color.z * s + vLineColor.z * ( 1.0- s);
                        ww = color.w ;
                    }
                    if(s < 0.0){
                        xx = -color.x * s + vLineColor.x * ( 1.0 + s);
                        yy = -color.y * s + vLineColor.y * ( 1.0 + s);
                        zz = -color.z * s + vLineColor.z * ( 1.0 + s);
                        ww = color.w ;
                    }
                    color = vec4( xx, yy, zz, ww);
                }
                if(vPosition.y > 0.6 && vPosition.y < 0.65){
                    float s = (vPosition.y - 0.625) /0.625;
                    if(s > 0.0){
                        xx = color.x * s + vLineColor.x * ( 1.0- s);
                        yy = color.y * s + vLineColor.y * ( 1.0- s);
                        zz = color.z * s + vLineColor.z * ( 1.0- s);
                        ww = color.w ;
                    }
                    if(s < 0.0){
                        xx = -color.x * s + vLineColor.x * ( 1.0 + s);
                        yy = -color.y * s + vLineColor.y * ( 1.0 + s);
                        zz = -color.z * s + vLineColor.z * ( 1.0 + s);
                        ww = color.w;
                    }
                    color = vec4( xx, yy, zz, ww);
                }
                if(vPosition.y > 0.7 && vPosition.y < 0.75){
                    float s = (vPosition.y - 0.725) /0.725;
                    if(s > 0.0){
                        xx = color.x * s + vLineColor.x * ( 1.0- s);
                        yy = color.y * s + vLineColor.y * ( 1.0- s);
                        zz = color.z * s + vLineColor.z * ( 1.0- s);
                        ww = color.w ;
                    }
                    if(s < 0.0){
                        xx = -color.x * s + vLineColor.x * ( 1.0 + s);
                        yy = -color.y * s + vLineColor.y * ( 1.0 + s);
                        zz = -color.z * s + vLineColor.z * ( 1.0 + s);
                        ww = color.w ;
                    }
                    color = vec4( xx, yy, zz, ww);
                }
                if(vPosition.y > 0.8 && vPosition.y < 0.85){
                    float s = (vPosition.y - 0.825) /0.825;
                    if(s > 0.0){
                        xx = color.x * s + vLineColor.x * ( 1.0- s);
                        yy = color.y * s + vLineColor.y * ( 1.0- s);
                        zz = color.z * s + vLineColor.z * ( 1.0- s);
                        ww = color.w ;
                    }
                    if(s < 0.0){
                        xx = -color.x * s + vLineColor.x * ( 1.0 + s);
                        yy = -color.y * s + vLineColor.y * ( 1.0 + s);
                        zz = -color.z * s + vLineColor.z * ( 1.0 + s);
                        ww = color.w ;
                    }
                    color = vec4( xx, yy, zz, ww);
                }
                `
            }
        };
    }
}

export class TopBuildingLayer extends MapboxLayer {
    constructor(data: any, name: string) {
        super({
            id: uuid.v1(),
            type: PolygonLayer,
            data: data,
            extruded: true,
            pickable: true,
            stroked: true,
            filled: true,
            wireframe: false,
            lineWidthMinPixels: 1,
            // @ts-ignore
            getPolygon: d => {
              return   d.geometry.coordinates[0][0];
            },
            // @ts-ignore
            getElevation: d => d.properties.Floor,
            // @ts-ignore
            getFillColor: [80, 177, 255, 255],
            getLineColor: [16, 123, 252, 255],
            extensions: [new BuildingFilter()],
            parameters: {
                depthTest: true
            },
            name: name
        });
    }
}