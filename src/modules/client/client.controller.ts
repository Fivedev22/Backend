/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientService } from 'src/modules/client/client.service';
import { CreateClientDto, UpdateClientDto } from 'src/modules/client/dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllClients() {
    return this.clientService.findAll();
  }

  @Get('/archived')
  @HttpCode(HttpStatus.OK)
  findAllArchived() {
    return this.clientService.findAllArchived();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOneClient(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.findOne(+id_client);
  }

  @Get('/archived/:id')
  @HttpCode(HttpStatus.OK)
  findOneArchived(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.findOneArchived(+id_client);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateClient(@Param('id', ParseIntPipe) id_client: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id_client, updateClientDto);
  }

  @Patch('/archive/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  archiveClient(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.archive(+id_client);
  }

  @Patch('unarchive/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  unarchiveClient(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.unarchive(+id_client);
  }

  @Delete('remove/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeClient(@Param('id', ParseIntPipe) id_client: number) {
    return this.clientService.remove(+id_client);
  }

  @Get('/search/:document_number')
  @HttpCode(HttpStatus.OK)
  searchByDocument(@Param('document_number') document_number: string) {
    return this.clientService.findByDocument(document_number);
  }

  @Get(':id/bookings')
  async getClientBookings(@Param('id') id: number) {
    return this.clientService.findClientBookings(id);
  }

  @Get(':id/payments')
  async getClientPayments(@Param('id') id: number) {
    return this.clientService.findClientPayments(id);
  }

}
