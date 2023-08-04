import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Note } from './note.entity';
import { NoteService } from './notes.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(Number(id));
  }

  @Post('create-note')
  create(@Body() note: Note): Promise<Note> {
    return this.noteService.create(note);
  }

  @Put('edit/:id')
  update(@Param('id') id: string, @Body() note: Note): Promise<Note> {
    return this.noteService.update(Number(id), note);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.noteService.delete(Number(id));
  }
}
