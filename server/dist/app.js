"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const port = process.env.PORT || 3100;
app.use(express_1.default.json());
mongoose_1.default
    .connect('mongodb://localhost/feeds', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
    console.log('Connected to local Mongo');
    app.use('/api/feeds', routes_1.default);
    app.listen(port, () => {
        console.log('Server listening on port', port);
    });
})
    .catch((err) => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
});
//# sourceMappingURL=app.js.map