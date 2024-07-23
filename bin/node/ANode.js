"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.ANode = void 0;
const ICoord_1 = require("./ICoord");
class ANode {
    constructor(type, coord) {
        /**G代价 表示当前节点到初始节点的距离 */
        this.G = 0;
        /**H代价 表示当前节点到终点的乐观估计距离 */
        this.H = 0;
        /**领居列表 */
        this.neighbors = [];
        this.type = type;
        this.coord = coord;
    }
    /**F代价 表示g+h的总和 越小寻路选择越有吸影力 */
    get F() { return this.G + this.H; }
    ;
    /**获取距离 */
    GetDir(node) {
        return this.coord.getDir(node.coord);
    }
    /**获取名称 */
    GetName() {
        return (0, ICoord_1.PosToString)(this.coord.pos);
    }
}
exports.ANode = ANode;
var Type;
(function (Type) {
    /**无障碍 */
    Type[Type["ACCESSIBLE"] = 0] = "ACCESSIBLE";
    /**障碍 */
    Type[Type["OBSTACLE"] = 1] = "OBSTACLE";
})(Type = exports.Type || (exports.Type = {}));
//# sourceMappingURL=ANode.js.map