/*
 * @Author: your name
 * @Date: 2021-06-01 09:56:22
 * @LastEditTime: 2021-06-01 17:44:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\deckglLayer\layers\NormalBuildingLayer.ts
 */
// @ts-ignore 隐藏 .ts 文件中的错误
// @ts-ignore 
import { PolygonLayer } from "@deck.gl/layers";
// @ts-ignore
import { MapboxLayer } from "@deck.gl/mapbox";
// @ts-ignore
import { LayerExtension } from '@deck.gl/core';
const uuid = require('uuid')

// 图层拓展器，用于对Shader进行重写与拓展
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
                // vec4 color1 = vec4(0.05, 0.98, 1.0, 0.5);
                vec4 color1 = vec4(0.18, 0.43, 0.93, 0.5);
                vec4 color2 = vec4(0.03, 0.26, 0.61, 0.5);
                color = vec4(0.25, 0.6, 1.0, 0.6);
                if(vPosition.y >= 0.95){
                    float p = (1.0-vPosition.y)/0.05;
                    color = color2 * p + color * (1.0 - p);
                }
                if(vPosition.y < 0.95){
                    float p = vPosition.y/0.95;
                    color = color2 * p + color1 * pow((1.0 - p),2.0);
                }

                `
            }
        }
    }
}

export class NormalBuildingLayer extends MapboxLayer {
    constructor(data: number[], name: string) {
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
            getPolygon: d => d.geometry.coordinates[0][0],
            // @ts-ignore
            getElevation: d => d.properties.Floor,
            getFillColor: [0, 32, 130, 255],
            extensions: [new BuildingFilter()],
            parameters: {
                depthTest: true
            },
            name: name
        })
    }
}