import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from 'src/modules/client/dto';
import { JwtAuthGuard } from '../auth/jwt';


@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }
  @Post('/create')
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('/')
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.findOne(+id_client);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id_client: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id_client, updateClientDto);
  }

  @Patch('archive/:id')
  archive(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.archive(+id_client);
  }

  @Patch('unarchive/:id')
  unarchive(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.unarchive(+id_client);
  }

  @Delete('remove/:id')
  remove(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.remove(+id_client);
  }
}
