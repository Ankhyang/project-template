/*
 * @Author: your name
 * @Date: 2021-06-01 09:56:44
 * @LastEditTime: 2021-06-01 17:14:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\deckglLayer\layers\RoadLineLayer.ts
 */

// @ts-ignore
import { PathLayer } from '@deck.gl/layers';
// @ts-ignore
import { MapboxLayer } from "@deck.gl/mapbox";
// @ts-ignore
import { LayerExtension } from '@deck.gl/core';
import uuid from "uuid";

const normalcolor = [0, 255, 255, 0];

//重写着色器函数
class RedFilter1 extends LayerExtension {
    getShaders() {
        return {
            inject: {
                //重写颜色绘制函数
                'vs:#decl': `
                uniform float trailLength;
                attribute float instanceTimestamps;
                attribute float instanceNextTimestamps;
                varying float vTime;
                `,
                'vs:#main-end': `
                vTime = instanceTimestamps + (instanceNextTimestamps - instanceTimestamps) * vPathPosition.y / vPathLength;    
                `,
                'fs:#decl': `
                uniform float trailLength;
                uniform float currentTime;
                varying float vTime;
                `,
                'fs:#main-end': `
                `,
                'fs:DECKGL_FILTER_COLOR': `
                if(currentTime < 1000.0){
                    //第四段
                    if(vTime > currentTime-(trailLength * 2.0/5.0) && vTime < currentTime){
                        float m =  (currentTime - vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*m;
                    }
                    if(vTime < currentTime-(trailLength * 2.0/5.0) && vTime > currentTime-(trailLength * 3.0/5.0)){
                        color = vec4(color.xyz , 1.0);
                    }
                    if(vTime < currentTime-(trailLength * 3.0/5.0) && vTime > currentTime - trailLength){
                        float p = 1.0 - (currentTime-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*p;
                    }
                    //第三段
                    if(vTime > currentTime + 250.0 -(trailLength * 2.0/5.0) && vTime < currentTime + 250.0){
                        float m =  (currentTime + 250.0 - vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*m;
                    }
                    if(vTime < currentTime + 250.0-(trailLength * 2.0/5.0) && vTime > currentTime + 250.0-(trailLength * 3.0/5.0)){
                        color = vec4(color.xyz , 1.0);
                    }
                    if(vTime < currentTime + 250.0-(trailLength * 3.0/5.0) && vTime > currentTime + 250.0 - trailLength){
                        float p = 1.0 - (currentTime + 250.0-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*p;
                    }
                    //第二段
                    if(vTime > currentTime + 500.0 -(trailLength * 2.0/5.0) && vTime < currentTime + 500.0){
                        float m =  (currentTime + 500.0 - vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*m;
                    }
                    if(vTime < currentTime + 500.0-(trailLength * 2.0/5.0) && vTime > currentTime + 500.0-(trailLength * 3.0/5.0)){
                        color = vec4(color.xyz , 1.0);
                    }
                    if(vTime < currentTime + 500.0-(trailLength * 3.0/5.0) && vTime > currentTime + 500.0 - trailLength){
                        float p = 1.0 - (currentTime + 500.0-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*p;
                    }
                    //第一段
                    if(vTime > currentTime + 750.0 -(trailLength * 2.0/5.0) && vTime < currentTime + 750.0){
                        float m =  (currentTime + 750.0 - vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*m;
                    }
                    if(vTime < currentTime + 750.0-(trailLength * 2.0/5.0) && vTime > currentTime + 750.0-(trailLength * 3.0/5.0)){
                        color = vec4(color.xyz , 1.0);
                    }
                    if(vTime < currentTime + 750.0-(trailLength * 3.0/5.0) && vTime > currentTime + 750.0 - trailLength){
                        float p = 1.0 - (currentTime + 750.0-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                        color = vec4(color.xyz , 1.0)*p;
                    }
                }
                if(1000.0 <= currentTime + 750.0 && currentTime + 750.0 <= 1000.0 + trailLength){
                    float new_currentTime = currentTime + 750.0 - 1000.0;
                    if(vTime > currentTime + 750.0 - trailLength && vTime < 1000.0){
                        if(vTime > currentTime + 750.0-(trailLength * 2.0/5.0)){
                            float m =  (currentTime + 750.0 - vTime) / (trailLength * 2.0/ 5.0);
                            color = vec4(color.xyz , 1.0)*m;
                        }
                        if(vTime < currentTime + 750.0-(trailLength * 2.0/5.0) && vTime > currentTime + 750.0-(trailLength * 3.0/5.0)){
                            color = vec4(color.xyz , 1.0);
                        }
                        if(vTime < currentTime + 750.0-(trailLength * 3.0/5.0)){
                            float p = 1.0 - (currentTime + 750.0-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                            color = vec4(color.xyz , 1.0)*p;
                        }
                    }
                    if(vTime <= new_currentTime){
                        if(vTime > new_currentTime-(trailLength * 2.0/5.0)){
                            float m =  (new_currentTime - vTime) / (trailLength * 2.0/ 5.0);
                            color = vec4(color.xyz , 1.0)*m;
                        }
                        if(vTime < new_currentTime-(trailLength * 2.0/5.0) && vTime > new_currentTime-(trailLength * 3.0/5.0)){
                            color = vec4(color.xyz , 1.0);
                        }
                        if(vTime < new_currentTime-(trailLength * 3.0/5.0)){
                            float p = 1.0 - (new_currentTime-(trailLength * 3.0/5.0)- vTime) / (trailLength * 2.0/ 5.0);
                            color = vec4(color.xyz , 1.0)*p;
                        }
                    }                       
                }
                `
            }
        };
    }
    // @ts-ignore
    updateState(params) {
        // @ts-ignore
        const { trailLength, currentTime, getTimestamps } = params.props;
        // @ts-ignore
        for (const model of this.getModels()) {
            model.setUniforms({ trailLength, currentTime, getTimestamps });
        }
        // @ts-ignore
        const attributeManager = this.getAttributeManager();
        attributeManager.addInstanced({
            timestamps: {
                size: 1,
                accessor: 'getTimestamps',
                shaderAttributes: {
                    instanceTimestamps: {
                        vertexOffset: 0
                    },
                    instanceNextTimestamps: {
                        vertexOffset: 1
                    }
                }
            }
        });
    }
    // @ts-ignore
    getSubLayerProps() {
        // @ts-ignore
        const { trailLength, currentTime, getTimestamps } = this.props;
        return {
            trailLength,
            currentTime,
            getTimestamps
        };
    }
}

export class RoadLineLayer extends MapboxLayer {
    currentTime: number;
    ClickResult: number;
    tick: number;
    defutcurrentTime: number;
    sepeed: number;
    trailLength: number;
    constructor(data: any, RoadColor: Array<number>, opacity: number, widthMinPixels: number, trailLength: number, sepeed: number, currentTime: number) {
        for (let i = 0; i < data.length; i++) {
            data[i].color = normalcolor;
        }
        super({
            id: uuid.v1(),
            type: PathLayer,
            data: data,
            getPath: (d: { waypoints: any[]; }) => d.waypoints.map(p => p.coordinates),
            getTimestamps: (d: { waypoints: any[]; }) => d.waypoints.map(p => p.timestamp),   // - 1554772579000
            getColor: (d: {color: string}) => d.color,
            opacity: opacity ? opacity : 0.8,
            widthMinPixels: widthMinPixels ? widthMinPixels : 1,
            rounded: true,
            trailLength: trailLength ? trailLength : 200,
            currentTime: currentTime,
            extensions: [new RedFilter1()],
        })
        this.currentTime = currentTime,
        this.tick = 1;
        this.defutcurrentTime = currentTime,
        this.ClickResult = 0.0;
        this.sepeed = sepeed,
        this.trailLength = trailLength,
        this.Render();
    }

    Render() {
        requestAnimationFrame(() => {
            // @ts-ignore
            this.currentTime += this.sepeed;
            // @ts-ignore
            if (this.currentTime >= 250 + this.trailLength) {
                //定义的currentTime为[0,1000] 这里主要是循环播放不闭合路径
                // @ts-ignore
                this.currentTime = this.defutcurrentTime;
            }
            // @ts-ignore
            this.setProps({ currentTime: this.currentTime });
            this.Render();
        })
    }
}