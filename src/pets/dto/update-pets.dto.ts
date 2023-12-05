import { createPetsDto } from "./create-pet.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePetsDto extends PartialType (createPetsDto){}