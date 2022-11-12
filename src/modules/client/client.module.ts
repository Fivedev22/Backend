import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from 'src/modules/client/client.service';
import { ClientController } from 'src/modules/client/client.controller';
import { Client } from 'src/modules/client/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client
    ])
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule { }
