import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from 'src/shared/document_type/document_type.entity';

@Injectable()
export class DocumentTypeService {

  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>
  ) { }

  async findAll() {
    const document_types = await this.documentTypeRepository.find({ order: { document_type_name: 'ASC' } });
    return document_types;
  }

  async findOne(id_document_type: number) {
    const document_type = await this.documentTypeRepository.findOne({ where: { id_document_type } });
    return document_type;
  }

}
