"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSignupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const signup_dto_1 = require("./signup.dto");
class UpdateSignupDto extends (0, mapped_types_1.PartialType)(signup_dto_1.SignupDto) {
}
exports.UpdateSignupDto = UpdateSignupDto;
//# sourceMappingURL=update-signup.dto.js.map