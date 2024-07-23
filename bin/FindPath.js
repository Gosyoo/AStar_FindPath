"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPath = void 0;
const ANode_1 = require("./node/ANode");
const ICoord_1 = require("./node/ICoord");
class FindPath {
    static finding(start, end) {
        //路径中的节点列表
        let inPath = [start];
        //检查过的节点列表
        let checkList = [];
        while (inPath.length > 0) {
            let currNode = inPath[0];
            //筛选邻居节点，寻找路径中最佳的节点
            for (let i in inPath) {
                let node = inPath[i];
                //比较F代价 和 H代价
                if (node.F <= currNode.F && node.H < currNode.H) {
                    currNode = node;
                }
            }
            ICoord_1.ListTools.Add(checkList, currNode);
            ICoord_1.ListTools.Remove(inPath, currNode);
            //找到终点
            if (currNode == end) {
                return this.BackTrace(start, end);
            }
            for (let i in currNode.neighbors) {
                //排除 障碍 和 检查过的节点
                let neighbor = currNode.neighbors[i];
                if (neighbor.type == ANode_1.Type.OBSTACLE || ICoord_1.ListTools.Has(checkList, neighbor))
                    continue;
                let isPath = ICoord_1.ListTools.Has(inPath, neighbor);
                let neighbor_G = currNode.G + currNode.GetDir(neighbor);
                //如果不在路径中 或者 G代价更小
                if (!isPath || neighbor_G < currNode.G) {
                    //设置领居的G代价
                    neighbor.G = neighbor_G;
                    //将当前邻居节点 串入链中
                    neighbor.connection = currNode;
                    //将符合条件的邻居都加入路径选择
                    if (!isPath) {
                        neighbor.H = neighbor.GetDir(end);
                        ICoord_1.ListTools.Add(inPath, neighbor);
                    }
                }
            }
        }
        return null;
    }
    static BackTrace(start, end) {
        let path = [];
        let currNode = end;
        //防跑死
        let count = 100;
        while (currNode != start) {
            try {
                path.push(currNode);
                currNode = currNode.connection;
            }
            catch (e) {
                console.log(e);
            }
            count--;
            if (count < 0)
                return path;
        }
        if (currNode == start) {
            path.push(start);
        }
        return path;
    }
}
exports.FindPath = FindPath;
//# sourceMappingURL=FindPath.js.map