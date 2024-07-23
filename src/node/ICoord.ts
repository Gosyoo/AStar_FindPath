export abstract class ICoord {
    pos: Pos;
    abstract getDir(other: ICoord);

    constructor(pos: Pos) {
        this.pos = pos
    }
}

export class Pos {
    x: number;
    y: number;
}

export function PosToString(pos: Pos): string {
    return pos.x + "_" + pos.y;
}

export class ListTools {

    public static Add(list: any[], data: any) {
        list.push(data);
    }

    public static Remove(list: any[], data: any) {
        let index = list.indexOf(data);
        if (index != -1) {
            list.splice(index, 1);
        }
    }

    public static Has(list: any[], data: any) {
        return list.indexOf(data) != -1;
    }
}