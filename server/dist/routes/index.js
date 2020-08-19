"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feeds_1 = require("../models/feeds");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    feeds_1.SiteModel.find({}, (err, docs) => {
        if (err)
            return res.json({ error: err });
        return res.json({ feeds: docs, error: null });
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map