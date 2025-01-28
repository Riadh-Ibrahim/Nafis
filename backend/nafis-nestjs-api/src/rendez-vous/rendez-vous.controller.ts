import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';

@Controller('rendez-vous')
export class RendezVousController {
  constructor(private readonly rendezVousService: RendezVousService) {}

  @Post()
  create(@Body() createRendezVousDto: CreateRendezVousDto) {
    return this.rendezVousService.create(createRendezVousDto);
  }

  @Get()
  findAll() {
    return this.rendezVousService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rendezVousService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRendezVousDto: UpdateRendezVousDto) {
    return this.rendezVousService.update(+id, updateRendezVousDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rendezVousService.remove(+id);
  }
  @Get('notifications/:id')
  getNotifications(@Param('id') id: string) {
    return this.rendezVousService.getNotifications(+id);
  }
  @Get('send-reminder/:id')
  async sendReminder(@Param('id') id: string) {
    try {
      const appointment = await this.rendezVousService.findOne(+id);
      if (!appointment) {
        throw new HttpException(
          `Appointment with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      await this.rendezVousService.sendReminder(appointment);

      return {
        message: `Reminder sent successfully for appointment ID ${id}`,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to send reminder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
