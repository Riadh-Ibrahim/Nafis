import { PartialType } from '@nestjs/mapped-types';
import { CreateConstantesVitaleDto } from './create-constantes-vitale.dto';

export class UpdateConstantesVitaleDto extends PartialType(CreateConstantesVitaleDto) {}
