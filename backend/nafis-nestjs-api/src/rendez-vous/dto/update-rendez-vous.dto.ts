import { PartialType } from '@nestjs/mapped-types';
import { CreateRendezVousDto } from './create-rendez-vous.dto';

export class UpdateRendezVousDto extends PartialType(CreateRendezVousDto) {}
