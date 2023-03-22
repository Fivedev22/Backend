import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from 'src/modules/client/dto';
import { Client } from 'src/modules/client/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) { }

  async findByDocument(document_number: string) {
    const documentFound = await this.clientRepository.findOne({ where: { document_number } });
    return documentFound;
  }

  async findAll() {
    const clients = await this.clientRepository.find({
      relations: ['gender_type', 'document_type', 'province'],
      where: { is_active: true },
      order: { id_client: 'ASC' }
    });
    return clients;
  }

  async findOne(id_client: number) {
    const client = await this.clientRepository.findOne({
      relations: ['gender_type', 'document_type', 'province'],
      where: { id_client, is_active: true }
    });
    return client;
  }

  async create(createClientDto: CreateClientDto) {
    const { document_number } = createClientDto;
    if (await this.findByDocument(document_number)) throw new HttpException('Repeating client', HttpStatus.NOT_ACCEPTABLE);
    try {
      await this.clientRepository.save(createClientDto);
    } catch {
      throw new HttpException('A problem occurred while creating the client', HttpStatus.NOT_FOUND);
    }
  }

  async update(id_client: number, updateClientDto: UpdateClientDto) {
    if (!await this.findOne(id_client)) throw new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
    const client = await this.clientRepository.preload({ id_client, ...updateClientDto });
    try {
      await this.clientRepository.update(id_client, client);
    } catch {
      throw new HttpException('A problem occurred while updating the client', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id_client: number) {
    if (!await this.findOne(id_client)) throw new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
    try {
      await this.clientRepository.delete(id_client);
    } catch {
      throw new HttpException('A problem occurred while deleting the client', HttpStatus.NOT_FOUND);
    }
  }

  async archive(id_client: number) {
    const client = await this.findOne(id_client);
    if (!client) throw new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
    try {
      client.is_active = false;
      await this.clientRepository.update(id_client, client);
    } catch {
      throw new HttpException('A problem occurred while archiving the client', HttpStatus.NOT_FOUND);
    }
  }

  async unarchive(id_client: number) {
    const client = await this.findOne(id_client);
    if (!client) throw new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
    try {
      client.is_active = true;
      await this.clientRepository.update(id_client, client);
    } catch {
      throw new HttpException('A problem occurred while unarchiving the client', HttpStatus.NOT_FOUND);
    }
  }

}