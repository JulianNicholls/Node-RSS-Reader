"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteModel = void 0;
const mongoose_1 = require("mongoose");
const siteSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
});
exports.SiteModel = mongoose_1.model('site', siteSchema);
//# sourceMappingURL=feeds.js.map