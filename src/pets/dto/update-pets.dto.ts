import { PartialType } from "@nestjs/mapped-types";
import { createPetsDto } from "./create-pet.dto";

export class UpdatePetsDto extends PartialType (createPetsDto){}