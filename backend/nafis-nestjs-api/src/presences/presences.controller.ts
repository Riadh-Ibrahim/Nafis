import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Controller()
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) {}

  @Post('personnel/presence')  
  create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presencesService.create(createPresenceDto);
  }

 
  @Get('presences')  
  findAll() {
    return this.presencesService.findAll();
  }


  @Get('presences/:id') 
  findOne(@Param('id') id: string) {
    return this.presencesService.findOne(+id);
  }

 
  @Patch('presences/:id') 
  update(@Param('id') id: string, @Body() updatePresenceDto: UpdatePresenceDto) {
    return this.presencesService.update(+id, updatePresenceDto);
  }

 
  @Delete('presences/:id')  
  remove(@Param('id') id: string) {
    return this.presencesService.remove(+id);
  }
}
