import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from 'src/modules/client/dto';
import { Client } from 'src/modules/client/client.entity';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) { }

  async create(createClientDto: CreateClientDto) {
    const { document } = createClientDto;
    if (!await this.clientRepository.findOne({ where: { document } })) {
      try {
        await this.clientRepository.save(createClientDto);
        return new HttpException('Created client', HttpStatus.OK);
      } catch {
        return new HttpException('A problem occurred while creating the client', HttpStatus.NOT_FOUND);
      }
    }
    return new HttpException('Repeating client', HttpStatus.NOT_ACCEPTABLE);
  }

  async findAll() {
    const clients = await this.clientRepository.find({ relations: ['gender_type', 'document_type', 'province'], where: { is_active: true }, order: { name: 'ASC' } });
    return clients;
  }

  async findOne(id_client: number) {
    const client = await this.clientRepository.findOne({ relations: ['gender_type', 'document_type', 'province'], where: { id_client, is_active: true } });
    return client;
  }

  async update(id_client: number, updateClientDto: UpdateClientDto) {
    if (await this.clientRepository.findOne({ where: { id_client } })) {
      try {
        const client = await this.clientRepository.preload({ id_client, ...updateClientDto });
        await this.clientRepository.save(client);
        return new HttpException('Updated client', HttpStatus.OK);
      } catch {
        return new HttpException('A problem occurred while updating the client', HttpStatus.NOT_FOUND);
      }
    }
    return new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
  }

  async remove(id_client: number) {
    if (await this.clientRepository.findOne({ where: { id_client } })) {
      try {
        await this.clientRepository.delete(id_client);
        return new HttpException('Deleted client', HttpStatus.OK);
      } catch {
        return new HttpException('A problem occurred when deleting the client', HttpStatus.NOT_FOUND);
      }
    }
    return new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
  }

  async archive(id_client: number) {
    if (await this.clientRepository.findOne({ where: { id_client, is_active: true } })) {
      try {
        const client = await this.clientRepository.findOne({ where: { id_client } });
        client.is_active = false;
        await this.clientRepository.update(id_client, client);
        return new HttpException('Archived client', HttpStatus.OK);
      } catch {
        return new HttpException('A problem occurred when archiving the client', HttpStatus.NOT_FOUND);
      }
    }
    return new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
  }

  async unarchive(id_client: number) {
    if (await this.clientRepository.findOne({ where: { id_client, is_active: false } })) {
      try {
        const client = await this.clientRepository.findOne({ where: { id_client } });
        client.is_active = true;
        await this.clientRepository.update(id_client, client);
        return new HttpException('Unarchived client', HttpStatus.OK);
      } catch {
        return new HttpException('A problem occurred when unarchiving the client', HttpStatus.NOT_FOUND);
      }
    }
    return new HttpException(`Client with id ${id_client} does not exist`, HttpStatus.NOT_FOUND);
  }

}






// https://www.tutorialspoint.com/postgresql/postgresql_select_query.htm