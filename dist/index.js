"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banRealmSpread_1 = __importDefault(require("./rules/banRealmSpread"));
module.exports = {
    rules: {
        "ban-realm-spread": banRealmSpread_1.default,
    },
};
//# sourceMappingURL=index.js.map