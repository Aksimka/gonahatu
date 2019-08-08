"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartySchema_1 = require("../../Models/PartySchema");
const UserkKeysSchema_1 = require("../../Models/UserkKeysSchema");
let MailParser = require("mailparser").MailParser;
let mailparser = new MailParser();
class Party {
    constructor(description, weWant, weHave, peopleNow, peopleMax, address, price, phone, ownerName, location, images, publicationDate, vkLink) {
        this.id = new Date().getTime() + 2;
        this.description = description;
        this.weWant = weWant;
        this.weHave = weHave;
        this.peopleNow = peopleNow;
        this.peopleMax = peopleMax;
        this.address = address;
        this.price = price;
        this.phone = phone;
        this.ownerName = ownerName;
        this.location = location;
        this.images = images;
        this.publicationDate = publicationDate;
        this.vkLink = vkLink;
    }
    save(key) {
        let newParty = new PartySchema_1.PartySchema({
            id: new Date().getTime() + 2,
            description: this.description,
            weWant: this.weWant,
            weHave: this.weHave,
            peopleNow: this.peopleNow,
            peopleMax: this.peopleMax,
            address: this.address,
            price: this.price,
            phone: this.phone,
            ownerName: this.ownerName,
            location: this.location,
            images: this.images,
            publicationDate: new Date().getTime(),
            vkLink: this.vkLink
        });
        newParty.save(function (err) {
            if (err)
                return 'Some error occurred';
        });
        let userKey = new UserkKeysSchema_1.UserKeysSchema({
            key
        });
        userKey.save();
    }
    static async oneMoreMember(id) {
        try {
            return await PartySchema_1.PartySchema.update({ id }, { $inc: { peopleNow: 1 } });
        }
        catch (e) {
            return e;
        }
    }
    static async update(id, body) {
        try {
            return await PartySchema_1.PartySchema.findOneAndUpdate({ id }, { $set: JSON.parse(body) });
        }
        catch (e) {
            return e;
        }
    }
    static async delete(id, key) {
        console.log(key);
        let res = await UserkKeysSchema_1.UserKeysSchema.findOneAndDelete({ key });
        if (res && res.key === key) {
            try {
                return await PartySchema_1.PartySchema.findOneAndDelete({ id });
            }
            catch (e) {
                return e;
            }
        }
        else {
            return {
                code: 500,
                status: 'failed',
                message: 'bad userKey'
            };
        }
    }
    static async report(id) {
    }
}
exports.Party = Party;
//# sourceMappingURL=Party.js.map