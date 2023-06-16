import { Module } from '@nestjs/common';
import { NoteController } from './notes.controller';
import { NoteService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NotesModule {}
