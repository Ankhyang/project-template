/*
 * @Author: your name
 * @Date: 2021-06-01 09:55:38
 * @LastEditTime: 2021-06-01 17:44:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project-template\src\utils\deckglLayer\layerFactory.ts
 */
import Axios from 'axios'
import { RoadLineLayer } from './layers/RoadLineLayer'
import { NormalBuildingLayer } from './layers/NormalBuildingLayer'
import { TopBuildingLayer } from './layers/TopBuildingLayer'
import { SignBuildingLayer } from './layers/SignBuildingLayer'
import { Vector2, CurvePath, LineCurve } from 'three'

interface RoadLineConfig {
    DataURL: string, // geojson数据
    RoadColor: number[], // 基础颜色
    opacity: number, // 透明度
    widthMinPixels: number, // 线条宽度 默认5 
    currentTime: number, //当前时间(当前位置) 默认起点0
    trailLength: number,    //线条拖拽长度 默认20
    speed: number   //自定义参数,道路运行速度 默认1  最大10
    colors: Array<Array<number>>,  //道路颜色数组
    // name: string
}

interface BuildConfig {
    //FeatureCollection封装的GeoJson数据，这里是URL
    DataURL: string,
    //房子的高度倍增，默认为1
    HeightScale?: number,
    name: string
}
interface dataConfig {
    waypoints: any[],
    RoadColor: number,
    currentTime: number
}

export class LayerFactory {
    static async CreateRoadLineLayer(config: RoadLineConfig) {
        let data1 = await Axios.get(config.DataURL, { headers: { disableInterceptors: true } }) as any
        let {features} = data1
        let data: dataConfig[] = []
        for(let j = 0; j< features.length; j++) {
            let feature = features[j], waypoints: any[] = [];
            let Curvepath = new CurvePath(), coordinates = feature.geometry.coordinates[0];
            for(let i = 0; i< coordinates.length; i++) {
                if(i < coordinates.length - 1) {
                    // 添加到Curvepath中
                    Curvepath.add(new LineCurve(new Vector2(coordinates[i][0], coordinates[i][1]), new Vector2(coordinates[i+1][0], coordinates[i+1][1])))
                }
            }   
            // 使用Curvepath将道路均分成1000段，解决运行时忽快忽慢的现象
            let newcoordinates = Curvepath.getSpacedPoints(1000);
            for(let i = 0; i<newcoordinates.length; i++) {
                 // @ts-ignore
                 waypoints.push({ coordinates: [newcoordinates[i].x, newcoordinates[i].y], timestamp: i });
            }
            let currentTime: number = config.currentTime;
            //每一条道路单独赋颜色
            let RoadColor: any = config.RoadColor;
            if(j % 2 === 0) {
                RoadColor = config.colors[0]
            }else{
                RoadColor = config.colors[1]
            }
            let dataone:dataConfig = { waypoints: waypoints, RoadColor: RoadColor, currentTime: currentTime };
            data.push(dataone)
        }
        return new RoadLineLayer(data, config.RoadColor, config.opacity, config.widthMinPixels, config.trailLength, config.speed, config.currentTime)
    }

    // 普通建筑的构造器
    static async CreateNormalBuildingLayer(config: BuildConfig) {
        let res = await Axios.get(config.DataURL, { headers: { disableInterceptors: true } }) as any
        let features = res.data.features
        let arrayHeight: any
        // console.log(data, data.features)
        // 处理不规范数据
        features = features.filter((item: { geometry: { coordinates: any[][] } }) => {
            //@ts-ignore
            return item.geometry && item.geometry.coordinates && item.geometry.coordinates[0] && item.geometry.coordinates[0][0]
        })
        // 构造Layer
        //@ts-ignore
        arrayHeight = features.filter((item: { geometry: { coordinates: any[][] } }) => {
            //@ts-ignore
            if (item.properties.Floor < 20.0) {
                //@ts-ignore
                return Number(item.properties.Floor)
            }
        });
        return new NormalBuildingLayer(arrayHeight, config.name);
    }

    // 高层建筑的构造器
    static async CreateTopBuildingLayer(config: BuildConfig) {
        //获取原始数据
        let res = await Axios.get(config.DataURL, { headers: { disableInterceptors: true } }) as any;
        let features = res.data.features
        let arrayHeight: any;
        // 处理不规范数据
        features = features.filter((item: { geometry: { coordinates: any[][] } }) => {
            //@ts-ignore
            return item.geometry && item.geometry.coordinates && item.geometry.coordinates[0] && item.geometry.coordinates[0][0]
        });
        //构造Layer
        //@ts-ignore
        arrayHeight = features.filter((item: { geometry: { coordinates: any[][] } }) => {
            //@ts-ignore
            if (item.properties.Floor >= 20.0) {
                //@ts-ignore
                return Number(item.properties.Floor)
            }
        });
        return new TopBuildingLayer(arrayHeight, config.name);
    }
}
