"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square_ICoord = exports.Square_Node = void 0;
const MapManager_1 = require("../MapManager");
const ANode_1 = require("./ANode");
const ICoord_1 = require("./ICoord");
class Square_Node extends ANode_1.ANode {
    cacheNeighbors() {
        for (let i in Square_Node.neightDir) {
            let mapMgr = MapManager_1.MapManager.Instance();
            let dir = Square_Node.neightDir[i];
            let pos = {};
            pos.x = this.coord.pos.x + dir.x;
            pos.y = this.coord.pos.y + dir.y;
            if (mapMgr.getTileNode(pos)) {
                this.neighbors.push(mapMgr.getTileNode(pos));
            }
        }
    }
}
exports.Square_Node = Square_Node;
//正方形相对于自身 8方向的领居坐标
Square_Node.neightDir = [
    { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 },
    { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
];
class Square_ICoord extends ICoord_1.ICoord {
    getDir(other) {
        let o_pos = other.pos;
        let vec = { x: Math.abs(this.pos.x - o_pos.x), y: Math.abs(this.pos.y - o_pos.y) };
        let low = Math.min(vec.x, vec.y);
        let high = Math.max(vec.x, vec.y);
        let require_move = high - low;
        return low * 14 + require_move * 10;
    }
}
exports.Square_ICoord = Square_ICoord;
//# sourceMappingURL=square_node.js.map