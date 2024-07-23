import { MapManager } from "./MapManager";
import { Pos } from "./node/ICoord";



export function main() {
    let mapMgr = MapManager.Instance();
    mapMgr.createMap(5, 5);
    let list = mapMgr.mapToArr(mapMgr.map);
    MapManager.wirte(list);

    // let node = mapMgr.getTileNode({ x: 0, y: 0 });
    // for (let i in node.neighbors) {
    //     console.log("node:" + PosToString(node.coord.pos) + "\t" + i + "\t" + "neighbor:" + PosToString(node.neighbors[i].coord.pos));
    // }


    mapMgr.startNode = mapMgr.accessibleArr[2];
    mapMgr.endNode = mapMgr.accessibleArr[mapMgr.accessibleArr.length - 2];

    console.log("start:" + mapMgr.startNode.GetName() + "\t");
    console.log("end:" + mapMgr.endNode.GetName() + "\t");

    let path = mapMgr.findPath();

    if(!path){
        console.log("no path...");
    }

    for (let i in path) {
        console.log("coord:" + path[i].GetName() + "\t" + "connection:" + path[i]?.connection?.GetName() || "" + "\t" + "G:" + path[i].G + "H:" + path[i].H + "F:" + path[i].F);
    }

    // let node1 = new Square_ICoord;
    // node1.pos = { x: 0, y: 0 };

    // let node2 = new Square_ICoord;
    // node2.pos = { x: 0, y: 5 };

    // console.log(node1.getDir(node2));
}


main();
console.log("====end=====")