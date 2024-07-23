"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTools = exports.PosToString = exports.Pos = exports.ICoord = void 0;
class ICoord {
    constructor(pos) {
        this.pos = pos;
    }
}
exports.ICoord = ICoord;
class Pos {
}
exports.Pos = Pos;
function PosToString(pos) {
    return pos.x + "_" + pos.y;
}
exports.PosToString = PosToString;
class ListTools {
    static Add(list, data) {
        list.push(data);
    }
    static Remove(list, data) {
        let index = list.indexOf(data);
        if (index != -1) {
            list.splice(index, 1);
        }
    }
    static Has(list, data) {
        return list.indexOf(data) != -1;
    }
}
exports.ListTools = ListTools;
//# sourceMappingURL=ICoord.js.map