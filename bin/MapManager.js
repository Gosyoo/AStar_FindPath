"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapManager = void 0;
const FindPath_1 = require("./FindPath");
const ANode_1 = require("./node/ANode");
const ICoord_1 = require("./node/ICoord");
const square_node_1 = require("./node/square_node");
class MapManager {
    constructor() {
        this.accessibleArr = [];
        this.map = new Map;
    }
    static Instance() {
        if (!this.mapMgr) {
            this.mapMgr = new MapManager();
        }
        return this.mapMgr;
    }
    createMap(w, h) {
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                let type = Math.random() > 0.6 ? ANode_1.Type.OBSTACLE : ANode_1.Type.ACCESSIBLE;
                let pos = {};
                pos.x = i;
                pos.y = j;
                let coord = new square_node_1.Square_ICoord(pos);
                let node = new square_node_1.Square_Node(type, coord);
                this.map.set((0, ICoord_1.PosToString)(pos), node);
                if (type == ANode_1.Type.ACCESSIBLE) {
                    this.accessibleArr.push(node);
                }
            }
        }
    }
    getTileNode(pos) {
        var _a;
        return ((_a = this.map) === null || _a === void 0 ? void 0 : _a.get((0, ICoord_1.PosToString)(pos))) || null;
    }
    mapToArr(map) {
        let list = [];
        map.forEach((v, key) => {
            let x = v.coord.pos.x;
            if (!list[x]) {
                list[x] = [];
            }
            list[x].push(v);
            v.cacheNeighbors();
        });
        for (let i in list) {
            list[i].sort((a, b) => { return a.coord.pos.y - b.coord.pos.y; });
        }
        return list;
    }
    findPath() {
        return FindPath_1.FindPath.finding(this.startNode, this.endNode);
    }
    static wirte(list) {
        for (let i in list) {
            let row = list[i];
            let text = "";
            for (let j in row) {
                // console.log((row[j] as ANode).type);
                let node = row[j];
                text += node.type + "(" + node.coord.pos.x + "," + node.coord.pos.y + ")" + "\t";
                // text += "(" + node.coord.pos.x + "," + node.coord.pos.y + ")" + "\t";
            }
            console.log(text);
            console.log("\n");
        }
    }
}
exports.MapManager = MapManager;
//# sourceMappingURL=MapManager.js.map