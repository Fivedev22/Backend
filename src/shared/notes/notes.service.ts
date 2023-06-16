import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    return this.noteRepository.findOne(
        {
            where: {id: id}
        }
    );
  }

  async create(note: Note): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async update(id: number, note: Note): Promise<Note> {
    await this.noteRepository.update(id, note);
    return this.noteRepository.findOne(
        {
            where: {id: id}
        }
    );
  }

  async delete(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
