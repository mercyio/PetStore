"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const profile_dto_1 = require("./profile.dto");
class UpdateProfileDto extends (0, mapped_types_1.PartialType)(profile_dto_1.ProfileDto) {
}
exports.UpdateProfileDto = UpdateProfileDto;
//# sourceMappingURL=update-profile.dto.js.map