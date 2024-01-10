"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pet_dto_1 = require("./create-pet.dto");
class UpdatePetsDto extends (0, mapped_types_1.PartialType)(create_pet_dto_1.createPetsDto) {
}
exports.UpdatePetsDto = UpdatePetsDto;
//# sourceMappingURL=update-pets.dto.js.map