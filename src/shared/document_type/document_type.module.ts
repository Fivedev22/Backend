import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentTypeController } from 'src/shared/document_type/document_type.controller';
import { DocumentTypeService } from 'src/shared/document_type/document_type.service';
import { DocumentType } from 'src/shared/document_type/document_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentType])],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService]
})

export class DocumentTypeModule { }
