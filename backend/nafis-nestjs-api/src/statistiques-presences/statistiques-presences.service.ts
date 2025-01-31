import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatistiquesPresenceDto } from './dto/create-statistiques-presence.dto';
import { UpdateStatistiquesPresenceDto } from './dto/update-statistiques-presence.dto';
import { StatistiquesPresence } from './entities/statistiques-presence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresencesService } from 'src/presences/presences.service';
import { CongeDetail } from './entities/conge-detail.entity';
import { AbsenceDetail } from './entities/absence-detail.entity';
import { MissionDetail } from './entities/mission-detail.entity';

@Injectable()
export class StatistiquesPresencesService {
  constructor(
    @InjectRepository(StatistiquesPresence)
    private readonly statsRepository: Repository<StatistiquesPresence>,
    private readonly presenceService: PresencesService,  // Inject PresenceService
    @InjectRepository(CongeDetail)
    private readonly congeRepository: Repository<CongeDetail>,
    @InjectRepository(AbsenceDetail)
    private readonly absenceRepository: Repository<AbsenceDetail>,
    @InjectRepository(MissionDetail)
    private readonly missionRepository: Repository<MissionDetail>,
  ) {}

  async create(createStatistiquesPresenceDto: CreateStatistiquesPresenceDto) {
    const { presencesDetaillees, conges, absences, missions, joursPresent, joursAbsent, joursMission, joursConge, ...rest } = createStatistiquesPresenceDto;

    // Fetch presences related to the personnelId in the statistiques presence
    const presences = await Promise.all(
      presencesDetaillees.map(async (personnelId) => {
        return await this.presenceService.findByPersonnelId(personnelId); // Use findByPersonnelId
      }),
    );

    // Calculate tauxPresence
    const totalDays = joursPresent + joursAbsent + joursMission + joursConge;
    const tauxPresence = totalDays > 0 ? joursPresent / totalDays : 0;

    const stat = this.statsRepository.create({
      ...rest,
      presencesDetaillees: presences.flat(), // Flatten the result if needed
      conges: await this.congeRepository.findByIds(conges),
      absences: await this.absenceRepository.findByIds(absences),
      missions: await this.missionRepository.findByIds(missions),
      joursPresent,
      joursAbsent,
      joursMission,
      joursConge,
      tauxPresence, // Assign the calculated tauxPresence
    });

    return await this.statsRepository.save(stat);
  }


  async findAll() {
    return await this.statsRepository.find({
      relations: ['presencesDetaillees', 'conges', 'absences', 'missions', 'personnel'],
    });
  }

  async findOne(id: number) {
    const stat = await this.statsRepository.findOne({
      where: { id },
      relations: ['presencesDetaillees', 'conges', 'absences', 'missions', 'personnel'],
    });
    if (!stat) {
      throw new NotFoundException(`StatistiquesPresence with ID ${id} not found`);
    }
    return stat;
  }

  async update(id: number, updateStatistiquesPresenceDto: UpdateStatistiquesPresenceDto) {
    const { presencesDetaillees, conges, absences, missions, ...rest } = updateStatistiquesPresenceDto;

    const stat = await this.findOne(id);
    if (!stat) {
      throw new NotFoundException(`StatistiquesPresence with ID ${id} not found`);
    }

    Object.assign(stat, rest);

    // Fetch presences related to the personnelId in the statistiques presence
    if (presencesDetaillees) {
      const presences = await Promise.all(
        presencesDetaillees.map(async (personnelId) => {
          return await this.presenceService.findByPersonnelId(personnelId); // Use findByPersonnelId
        }),
      );
      stat.presencesDetaillees = presences.flat(); // Flatten the result if needed
    }
    if (conges) {
      stat.conges = await this.congeRepository.findByIds(conges);
    }
    if (absences) {
      stat.absences = await this.absenceRepository.findByIds(absences);
    }
    if (missions) {
      stat.missions = await this.missionRepository.findByIds(missions);
    }

    return await this.statsRepository.save(stat);
  }

  async remove(id: number) {
    const stat = await this.findOne(id);
    if (!stat) {
      throw new NotFoundException(`StatistiquesPresence with ID ${id} not found`);
    }
    return await this.statsRepository.remove(stat);
  }
}
