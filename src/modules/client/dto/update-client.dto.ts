import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from 'src/modules/client/dto/create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) { }
