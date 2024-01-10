import { PartialType } from '@nestjs/mapped-types';
import { SignupDto } from './signup.dto';

export class UpdateSignupDto extends PartialType(SignupDto) {}
