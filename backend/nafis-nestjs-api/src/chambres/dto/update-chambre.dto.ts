import { PartialType } from '@nestjs/mapped-types';
import { CreateChambreDto } from './create-chambre.dto';

export class UpdateChambreDto extends PartialType(CreateChambreDto) {}
