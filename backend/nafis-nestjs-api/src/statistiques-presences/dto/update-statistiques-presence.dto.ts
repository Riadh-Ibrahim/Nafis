import { PartialType } from '@nestjs/mapped-types';
import { CreateStatistiquesPresenceDto } from './create-statistiques-presence.dto';

export class UpdateStatistiquesPresenceDto extends PartialType(CreateStatistiquesPresenceDto) {}
