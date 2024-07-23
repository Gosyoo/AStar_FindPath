import { FindPath } from "./FindPath";
import { ANode, Type } from "./node/ANode";
import { Pos, PosToString } from "./node/ICoord";
import { Square_ICoord, Square_Node } from "./node/square_node";

export class MapManager {

    private static mapMgr: MapManager;

    public map: Map<string, ANode>;

    public startNode: ANode;

    public endNode: ANode;

    public accessibleArr: ANode[] = [];

    private constructor() {
        this.map = new Map;
    }

    public static Instance() {
        if (!this.mapMgr) {
            this.mapMgr = new MapManager();
        }
        return this.mapMgr;
    }

    public createMap(w: number, h: number) {
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                let type = Math.random() > 0.6 ? Type.OBSTACLE : Type.ACCESSIBLE;
                let pos = {} as Pos;
                pos.x = i;
                pos.y = j;
                let coord = new Square_ICoord(pos);
                let node = new Square_Node(type, coord);
                this.map.set(PosToString(pos), node);

                if (type == Type.ACCESSIBLE) {
                    this.accessibleArr.push(node);
                }
            }
        }

    }

    public getTileNode(pos: Pos) {
        return this.map?.get(PosToString(pos)) || null;
    }

    public mapToArr(map: Map<string, ANode>) {
        let list = [];
        map.forEach((v: ANode, key: string) => {
            let x = v.coord.pos.x;
            if (!list[x]) {
                list[x] = [];
            }
            list[x].push(v);
            v.cacheNeighbors();
        })

        for (let i in list) {
            (list[i] as ANode[]).sort((a, b) => { return a.coord.pos.y - b.coord.pos.y });
        }
        return list;
    }

    public findPath() {
        return FindPath.finding(this.startNode, this.endNode);
    }



    public static wirte(list: any[]) {
        for (let i in list) {
            let row = list[i];
            let text = "";
            for (let j in row) {
                // console.log((row[j] as ANode).type);
                let node = row[j] as ANode;
                text += node.type + "(" + node.coord.pos.x + "," + node.coord.pos.y + ")" + "\t";
                // text += "(" + node.coord.pos.x + "," + node.coord.pos.y + ")" + "\t";
            }
            console.log(text);
            console.log("\n");
        }
    }

}