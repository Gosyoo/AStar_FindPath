import { MapManager } from "../MapManager";
import { ANode } from "./ANode";
import { ICoord, Pos } from "./ICoord";

export class Square_Node extends ANode {

    //正方形相对于自身 8方向的领居坐标
    public static neightDir = [
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 },
        { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
    ]

    public cacheNeighbors() {
        for (let i in Square_Node.neightDir) {
            let mapMgr = MapManager.Instance();
            let dir = Square_Node.neightDir[i];
            let pos = {} as Pos;
            pos.x = this.coord.pos.x + dir.x;
            pos.y = this.coord.pos.y + dir.y;
            if (mapMgr.getTileNode(pos)) {
                this.neighbors.push(mapMgr.getTileNode(pos));
            }
        }
    }

}

export class Square_ICoord extends ICoord {

    pos: Pos;

    getDir(other: ICoord) {
        let o_pos = other.pos;
        let vec: Pos = { x: Math.abs(this.pos.x - o_pos.x), y: Math.abs(this.pos.y - o_pos.y) };
        let low = Math.min(vec.x, vec.y);
        let high = Math.max(vec.x, vec.y);
        let require_move = high - low;
        return low * 14 + require_move * 10;
    }

}