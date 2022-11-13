import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientService } from 'src/modules/client/client.service';
import { CreateClientDto, UpdateClientDto } from 'src/modules/client/dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.findOne(+id_client);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id', ParseIntPipe) id_client: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id_client, updateClientDto);
  }

  @Patch('archive/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  archive(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.archive(+id_client);
  }

  @Patch('unarchive/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  unarchive(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.unarchive(+id_client);
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.remove(+id_client);
  }
}
