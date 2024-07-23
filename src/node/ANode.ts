import { ICoord, PosToString } from "./ICoord";

export abstract class ANode {

    /**类型 */
    public type: Type;

    /**链接的节点 */
    public connection: ANode;

    /**G代价 表示当前节点到初始节点的距离 */
    public G: number = 0;

    /**H代价 表示当前节点到终点的乐观估计距离 */
    public H: number = 0;

    /**F代价 表示g+h的总和 越小寻路选择越有吸影力 */
    public get F() { return this.G + this.H };

    /**坐标 */
    public coord: ICoord;

    /**领居列表 */
    public neighbors: ANode[] = [];

    constructor(type: number, coord: ICoord) {
        this.type = type;
        this.coord = coord;
    }

    /**暂存领居列表*/
    public abstract cacheNeighbors();

    /**获取距离 */
    public GetDir(node: ANode) {
        return this.coord.getDir(node.coord);
    }

    /**获取名称 */
    public GetName() {
        return PosToString(this.coord.pos);
    }

}

export enum Type {
    /**无障碍 */
    ACCESSIBLE,
    /**障碍 */
    OBSTACLE,
}