"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const MapManager_1 = require("./MapManager");
function main() {
    var _a, _b;
    let mapMgr = MapManager_1.MapManager.Instance();
    mapMgr.createMap(5, 5);
    let list = mapMgr.mapToArr(mapMgr.map);
    MapManager_1.MapManager.wirte(list);
    // let node = mapMgr.getTileNode({ x: 0, y: 0 });
    // for (let i in node.neighbors) {
    //     console.log("node:" + PosToString(node.coord.pos) + "\t" + i + "\t" + "neighbor:" + PosToString(node.neighbors[i].coord.pos));
    // }
    mapMgr.startNode = mapMgr.accessibleArr[2];
    mapMgr.endNode = mapMgr.accessibleArr[mapMgr.accessibleArr.length - 2];
    console.log("start:" + mapMgr.startNode.GetName() + "\t");
    console.log("end:" + mapMgr.endNode.GetName() + "\t");
    let path = mapMgr.findPath();
    if (!path) {
        console.log("no path...");
    }
    for (let i in path) {
        console.log("coord:" + path[i].GetName() + "\t" + "connection:" + ((_b = (_a = path[i]) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.GetName()) || "" + "\t" + "G:" + path[i].G + "H:" + path[i].H + "F:" + path[i].F);
    }
    // let node1 = new Square_ICoord;
    // node1.pos = { x: 0, y: 0 };
    // let node2 = new Square_ICoord;
    // node2.pos = { x: 0, y: 5 };
    // console.log(node1.getDir(node2));
}
exports.main = main;
main();
console.log("====end=====");
//# sourceMappingURL=main.js.map