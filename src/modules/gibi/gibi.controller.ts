import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { GibiService } from './gibi.service';
import { GibiDTO } from './gibi.dto';
import { get } from 'http';

@Controller('gibi')  // Certifique-se de que está no caminho correto
export class GibiController {
  constructor(private readonly gibiService: GibiService) {}

  @Post()
  create(@Body() data: GibiDTO) {
    return this.gibiService.create(data);  // Chama o serviço para criar um livro
  }

  @Get()
  async findAll() {
    return this.gibiService.findAll();
  }

  // http://localhost:3000/id
  @Put(":id")
  async update(@Param("id") id: string, @Body() data: GibiDTO){
    return this.gibiService.update(id, data);
  }
  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.gibiService.delete(id);
  }

}

