import { PartialType } from '@nestjs/mapped-types';
import { CreateConstantesVitalesDto } from './create-constantes-vitale.dto';
export class UpdateConstantesVitaleDto extends PartialType(CreateConstantesVitalesDto) {}
