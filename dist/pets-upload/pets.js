"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFiles = exports.uploadPetsFile = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const uploadPetsFile = (req, file, callback) => {
    if (!file.originalName.match(/\.(jpeg|jpg|png)$/)) {
        return new common_1.HttpException('Try again', 404);
    }
    callback(null, true);
};
exports.uploadPetsFile = uploadPetsFile;
const editFiles = (req, file, callback) => {
    const name = file.originalName.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalName);
    const requiredLenght = 6;
    const randomArr = [];
    for (let i = 0; i <= requiredLenght; i++) {
        const randomString = (Math.floor(Math.random() * 16).toString(16));
        randomArr.push(randomString);
    }
    const string = randomArr.join('');
    callback(null, `${name}, ${string}, ${fileExtName}`);
};
exports.editFiles = editFiles;
//# sourceMappingURL=pets.js.map