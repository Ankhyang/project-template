/*
 * @Author: your name
 * @Date: 2021-06-01 09:57:01
 * @LastEditTime: 2021-06-01 10:39:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\deckglLayer\layers\SignBuildingLayer.ts
 */
// @ts-ignore
import { SolidPolygonLayer } from "@deck.gl/layers";
// @ts-ignore
import { MapboxLayer } from "@deck.gl/mapbox";
// @ts-ignore
import { LayerExtension, AmbientLight, LightingEffect } from '@deck.gl/core';
import uuid from "uuid";

//图层拓展器，用于对Shader进行重写与拓展
class BuildingFilter extends LayerExtension {
    getShaders() {
        return {
            inject: {
                //注入顶点着色器声明
                'vs:#decl': `
                    varying vec2 vPosition;
                    varying vec4 vLineColor;
                    attribute float bases;
                    attribute float instanceBases;
                `,
                //注入顶点着色器，对varying变量赋值
                'vs:#main-end': `
                    vPosition = vertexPositions;
                    vLineColor = props.lineColors;
                    props.positions.z = props.positions.z + bases;
                    props.positions.z = props.positions.z + instanceBases;
                    props.nextPositions.z = props.nextPositions.z + bases ;
                    props.nextPositions.z = props.nextPositions.z + instanceBases; 
                    calculatePosition(props);
                `,
                //注入片元着色器声明
                'fs:#decl': `
                    varying vec2 vPosition;
                    varying vec4 vLineColor;
                    uniform float uLineWidth;
                `,
                //重写颜色绘制函数
                'fs:DECKGL_FILTER_COLOR': `
                float edge_size = 0.02;
                float top_edge_size = 0.01;
                color = vec4(color.xyz, 0.8);
                // vec4 color1 = vec4(0.15, 0.3, 0.8, 1.0);
                vec4 color1 = vec4(0.68, 1.0, 1.0, 0.8);

                for(float i=0.04 ; i<=1.0 ; i += 0.08){
                    //建筑分层线
                    if(0.994 - i <= vPosition.y && vPosition.y < 0.996 - i ){
                        float p = (0.996-i-vPosition.y)/0.002;
                        color = color1*p + color*(1.0-p);
                    }
                    if(0.992 - i <= vPosition.y && vPosition.y < 0.994 - i ){
                        color = color1;
                    }
                    if(0.990 - i <= vPosition.y && vPosition.y < 0.992 - i ){
                        float p = (0.992-i-vPosition.y)/0.002;
                        color = color*p + color1*(1.0-p);
                    }
                    // 建筑拐角线
                    if(vPosition.x < edge_size ){
                        float p = (edge_size-vPosition.x)/edge_size;
                        color = color1*p + color*(1.0-p);
                    }
                    if(vPosition.x > 1.0 - edge_size ){
                        float p = (1.0-vPosition.x)/edge_size;
                        color = color*p + color1*(1.0-p);
                    }
                }

                //建筑顶层线高亮
                if(vPosition.y > 1.0-top_edge_size ){
                    float p = (1.0-vPosition.y)/top_edge_size;
                    color = color*p + color1*(1.0-p);
                }
                `
            }
        };
    }
    // @ts-ignore
    updateState() {
        const ATTRIBUTE_TRANSITION = {
            // @ts-ignore
            enter: (value, chunk) => {
                return chunk.length ? chunk.subarray(chunk.length - value.length) : value;
            }
        };
        // @ts-ignore
        const attributeManager = this.getAttributeManager();
        attributeManager.add({
            bases: {
                size: 1,
                transition: ATTRIBUTE_TRANSITION,
                accessor: 'getBase',
                shaderAttributes: {
                    bases: {
                        divisor: 0
                    },
                    instanceBases: {
                        divisor: 1
                    }
                }
            },
        })
    }
}

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 3
});
const light = new LightingEffect({ ambientLight });

//建筑的类型
export class SignBuildingLayer extends MapboxLayer {
    constructor(data: any, HeightScale: number | undefined) {
        let height = HeightScale ? HeightScale : 1;
        super({
            id: uuid.v1(),
            type: SolidPolygonLayer,
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
            getElevation: d => d.properties.height * 250 * height,
            // @ts-ignore
            getBase: (d) => {
                if (d.properties.base != 0) {
                    return d.properties.base * 50;
                }
            },
            // @ts-ignore
            getFillColor: d => {
                //普通楼
                return [46, 110, 237, 255];
            },
            // @ts-ignore
            getLineColor: d => {
                //普通边框
                return [40, 217, 245, 255];
            },
            //应用图层拓展器
            extensions: [new BuildingFilter()],
            effects: [light],
            parameters: {
                depthTest: true
            },
        });
    }
}