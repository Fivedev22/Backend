import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DocumentTypeService } from 'src/shared/document_type/document_type.service';

@Controller('document-type')
export class DocumentTypeController {

    constructor(
        private readonly documentTypeService: DocumentTypeService
    ) { }

    @Get('/')
    findAll() {
        return this.documentTypeService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id_document_type: number) {
        return this.documentTypeService.findOne(+id_document_type);
    }

}
