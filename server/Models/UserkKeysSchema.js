"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userkeysschema = new Schema({
    key: { type: String },
});
exports.UserKeysSchema = mongoose.model('UserKeys', userkeysschema);
//# sourceMappingURL=UserkKeysSchema.js.map