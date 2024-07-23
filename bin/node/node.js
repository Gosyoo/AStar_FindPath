"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.ANode = void 0;
class ANode {
    constructor(type) {
        this.type = type;
    }
}
exports.ANode = ANode;
var Type;
(function (Type) {
    /**普通 */
    Type[Type["POS"] = 0] = "POS";
    /**障碍 */
    Type[Type["OBS"] = 1] = "OBS";
    /**选中 */
    Type[Type["SEL"] = 2] = "SEL";
})(Type = exports.Type || (exports.Type = {}));
//# sourceMappingURL=node.js.map