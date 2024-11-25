import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';
import { get } from 'http';

@Controller('book')  // Certifique-se de que está no caminho correto
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() data: BookDTO) {
    return this.bookService.create(data);  // Chama o serviço para criar um livro
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  // http://localhost:3000/id
  @Put(":id")
  async update(@Param("id") id: string, @Body() data: BookDTO){
    return this.bookService.update(id, data);
  }
  @Delete(":id")
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

}

