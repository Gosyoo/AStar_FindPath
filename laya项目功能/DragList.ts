module mvc {

    /**
     * @class: DragList
     * @description: 拖拽列表 
     * @author: gaoyuan
     * @time: 2024-07-11 17:52:06
     */
    export class DragList {

        private _list: Laya.List;
        private _item: any = null;
        private _view: sg.ViewBase;

        /**是否长按 */
        private _isLongClick: boolean = false;
        /**是否移动中 */
        private _isItemMove: boolean = false;
        /**滚动速度 */
        private _speed: number = 20;


        private _upBox: Laya.Box;
        private _downBox: Laya.Box;

        private _onUpFunc: Function;
        private _onDownFunc: Function;

        public constructor(list: Laya.List, parent: sg.ViewBase) {
            this._list = list;
            this._view = parent;
        }

        public Init() {

            this._list.on(Laya.Event.MOUSE_DOWN, this, this._onListDown);
            this._list.on(Laya.Event.MOUSE_UP, this, this._onListUp);
            this._list.on(Laya.Event.MOUSE_OUT, this, this._onListOut);
            this._list.on(Laya.Event.MOUSE_MOVE, this, this._onListMove);

            this._upBox = new Laya.Box;
            this._upBox.x = this._list.x;
            this._upBox.y = this._list.y - 200;
            this._upBox.width = this._list.width
            this._upBox.height = 200;
            this._view.addChild(this._upBox);

            this._downBox = new Laya.Box;
            this._downBox.x = this._list.x;
            this._downBox.y = this._list.y + this._list.height;
            this._downBox.width = this._list.width
            this._downBox.height = 200;
            this._view.addChild(this._downBox);

            this._doBoxThrough(true);

            this._upBox.on(Laya.Event.MOUSE_OVER, this, this._onUpBoxOver);
            this._upBox.on(Laya.Event.MOUSE_OUT, this, this._onBoxOut);
            this._downBox.on(Laya.Event.MOUSE_OVER, this, this._onDownBoxOver);
            this._downBox.on(Laya.Event.MOUSE_OUT, this, this._onBoxOut);

            this._view.on(Laya.Event.MOUSE_UP, this, this._onListUp);
        }


        public set speed(s: number) {
            this._speed = s;
        }

        public set OnUpFunc(func: Function) {
            this._onUpFunc = func;
        }

        public set OnDownFunc(func: Function) {
            this._onDownFunc = func;
        }


        Destroy() {
            if (this._item) {
                this._item.removeSelf();
            }
            if (this._upBox) {
                this._upBox.removeSelf()
            }
            if (this._downBox) {
                this._downBox.removeSelf();
            }

            Laya.timer.clear(this, this._scrollList);
        }

        //===============================================================================

        //下滑
        private _onDownBoxOver() {
            if (this._isItemMove) {
                this._view.frameLoop(1, this, this._scrollList, [false]);
            }
        }

        //上滑
        private _onUpBoxOver() {
            if (this._isItemMove) {
                this._view.frameLoop(1, this, this._scrollList, [true]);
            }
        }

        //在列表内不滑动
        private _onBoxOut() {
            Laya.timer.clear(this, this._scrollList);
        }

        //列表滚动
        private _scrollList(isup: boolean) {
            if (isup)
                this._list.scrollBar.value = Math.max(0, this._list.scrollBar.value - this._speed);
            else
                this._list.scrollBar.value = Math.min(this._list.scrollBar.max, this._list.scrollBar.value + this._speed);
        }

        private _onListOut(e: any) {
            this._isLongClick = false;
        }

        //抬起销毁悬浮item
        private _onListUp(e: any) {
            let cell = e.target;

            if (this._item) {
                this._item.removeSelf();
                this._item = null;
                this._isItemMove = false;
                this._doBoxThrough(true);
                if (this._onUpFunc) {
                    this._onUpFunc.apply(this._view, [cell]);
                }
            }
            this._isLongClick = false;
            cell.onDragItemUp && cell.onDragItemUp(e);
            Laya.timer.clear(this, this._scrollList);

        }

        //长按选中拖拽目标
        private _onListDown(e: any) {
            let cell = e.target;
            this._isLongClick = true;
            cell.on(Laya.Event.MOUSE_OUT, this, () => { this._isLongClick = false; });
            this._view.after(200, () => {
                if (this._isLongClick) {
                    if (this._item == null) {
                        this._item = new this._list.itemRender();
                        Laya.stage.addChild(this._item);
                    }
                    this._item.x = Laya.stage.mouseX;
                    this._item.y = Laya.stage.mouseY;
                    this._isItemMove = true;
                    this._doBoxThrough(false);
                    if (this._onDownFunc) {
                        this._onDownFunc.apply(this._view, [cell]);
                    }
                }
            });
            cell.onDragItemDown && cell.onDragItemDown(e);
        }

        //元素跟随鼠标移动
        private _onListMove() {
            if (this._isItemMove && this._item) {
                this._list.scrollBar.stopScroll();
                this._item.x = Laya.stage.mouseX;
                this._item.y = Laya.stage.mouseY;
            }
        }

        //box是否可穿透 设置true后的mouse out, mouse over 不触发
        private _doBoxThrough(b: boolean) {
            this._upBox.mouseThrough = b;
            this._downBox.mouseThrough = b;
        }

    }

}