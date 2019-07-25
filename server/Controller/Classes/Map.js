"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartiesList_1 = require("./PartiesList");
class Map {
    static async getPartiesPoints() {
        let pattern = {
            "type": "FeatureCollection",
            "features": []
        };
        let parties = await PartiesList_1.PartiesList.getAllParties();
        parties.forEach(i => {
            pattern.features.push({
                "type": "Feature",
                "properties": { "id": `${i.id}` },
                "geometry": {
                    "type": "Point",
                    "coordinates": [i.location[0], i.location[1]]
                }
            });
        });
        return pattern;
    }
}
exports.Map = Map;
//# sourceMappingURL=Map.js.map