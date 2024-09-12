module mvc {

    /**
     * @class: HexGridBuilder
     * @description: 六边形网格生成器
     * @author: gaoyuan
     * @time: 2024-07-24 15:06:06
     */

    export class HexGridBuilder {

        private _width: number;
        private _height: number;
        private _side: number;
        private _render: any;
        private _parent: Laya.Node;
        private _dir: HEX_DIR = HEX_DIR.SIDE_UP;

        private _gridMap: Map<string, any> = new Map;
        private _filterList: any[];
        private _nodeData: any[];
        private _dataSource: any[];
        private _exData: any;

        private _paddingX: number = 0;
        private _paddingY: number = 0;

        //计算宽
        private get _calW() {
            return this._side + this._paddingX;
        }
        //计算高
        private get _calY() {
            return this._side + this._paddingY;
        }


        constructor(data: HexData) {
            this._width = data.width
            this._height = data.height
            this._side = data.side
            this._parent = data.parent
            this._render = data.render
            this._dir = data.dir ? data.dir : this._dir;

            if (!isNaN(data.paddingX)) {
                this._paddingX = data.paddingX;
            }
            if (!isNaN(data.paddingY)) {
                this._paddingY = data.paddingY;
            }
            this.createGrid();
        }

        //==================================================================================

        public set ExData(data: any) {
            this._exData = data;
        }

        public set DataSource(data: any) {
            this._dataSource = data;
            this._refresh();
        }

        /**获取网格地图 */
        public get GridMap() {
            return this._gridMap;
        }

        /**刷新 -- 如果进行了筛选，只刷新筛选的地块*/
        public Refresh() {
            this._refresh();
        }

        /**
         * 获取某一个地块
         * @param key "x_y" 字符串形式
         * @returns 
         */
        public GetUnit(key: string) {
            if (!this._gridMap.has(key)) return null;
            return this._gridMap.get(key);
        }

        /**
         *  筛选需要更新的地块
         *  不在此列的地块保持默认属性，选出来的会随着refresh更新 
         * @param list 数据列表 初始化数据
         * @param func 筛选方法（没有就全选）
         */
        public FilterUnit(list: any[], func?: (unit: any) => boolean) {
            this._nodeData = list;
            this._filterList = [];

            let arr = [...this._gridMap.values()];
            for (let i in arr) {
                if (func ? func(arr[i]) : true) {
                    this._filterList.push(arr[i]);
                }
            }

            this._initAllNode();
        }

        public destroy() {
            this._parent.destroy(true);
            this._gridMap.clear();
            this._gridMap = null;
        }


        //====================================================================

        private createGrid() {
            let w = this._width;
            let h = this._height;

            this._parent.removeChildren();

            let key_x;
            let key_y;

            let index = 0;

            for (let r = 0; r < h; r++) {
                key_y = r;
                key_x = 0;
                let rOffer = r >> 1;
                for (let q = -rOffer; q < w - rOffer; q++) {
                    let pos
                    if (this._dir == HEX_DIR.ANGLE_UP) {
                        pos = this.getPos(r, q);
                    } else if (this._dir == HEX_DIR.SIDE_UP) {
                        pos = this.getPos2(r, q);
                    }

                    let unit = new this._render;
                    this._parent.addChild(unit);

                    this._gridMap.set(key_x + "_" + key_y, unit);
                    key_x++;

                    unit.x = pos.x;
                    unit.y = pos.y;
                    unit.coord = { x: key_x, y: key_y };
                    unit.itemIndex = index;
                    index++;
                }
            }
        }

        /**获取位置 
         *    /\
         *   |  | 
         *    \/
        */
        private getPos(r: number, q: number) {
            let x = q * 1.732 * this._calW + r * 0.866 * this._calW;
            let y = r * 1.5 * this._calY;
            return { x: x, y: y };
        }

        /**获取位置2  
         *    ___
         *   /   \
         *   \   /
         *    ———
        */
        private getPos2(r: number, q: number) {
            let x = q * 3 * this._calW + r * 1.5 * this._calW;
            let y = r * 0.866 * this._calY;
            return { x: x, y: y };
        }

        /**刷新 */
        private _initAllNode() {
            let list = this._filterList;
            for (let i in list) {
                let unit = list[i];
                if (unit?.initNode) {
                    let data = this._nodeData && this._nodeData[i]
                    unit.initNode(data);
                }
            }
        }
        /**刷新 */
        private _refresh() {
            let list = this._filterList;
            for (let i in list) {
                let unit = list[i];
                if (unit?.updateChange) {
                    let data = this._dataSource && this._dataSource[i]
                    unit.exData = this._exData;
                    unit.updateChange(data);
                }
            }
        }
    }

    export interface INode {
        coord: { x, y };
        itemIndex: number;
        exData: any;
        initNode(data: any);
        updateChange(data: any);
    }

    /**六边形网生成器子项方向 */
    export enum HEX_DIR {
        /**尖在上 */
        ANGLE_UP,
        /**边在上 */
        SIDE_UP,
    }

    export interface HexData {
        /**网格宽 */
        width: number,
        /**网格高 */
        height: number,
        /**6边形边长 */
        side: number,
        /**容器 */
        parent: Laya.Node,
        /**地块  需要实现INode接口 */
        render: any,
        /**类型 */
        dir?: HEX_DIR,
        /**偏移x */
        paddingX?: number,
        /**偏移y */
        paddingY?: number
    }
}