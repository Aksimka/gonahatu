"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let partyschema = new Schema({
    id: { type: Number },
    description: { type: String },
    weWant: { type: String },
    weHave: { type: String },
    peopleNow: { type: Number },
    peopleMax: { type: Number },
    address: { type: String },
    price: { type: Number },
    phone: { type: String },
    ownerName: { type: String },
    location: { type: Array },
    images: { type: Array },
    publicationDate: { type: Number },
    vkLink: { type: String }
});
exports.PartySchema = mongoose.model('Party', partyschema);
//# sourceMappingURL=PartySchema.js.map