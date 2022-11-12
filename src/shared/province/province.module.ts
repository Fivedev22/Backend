import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceController } from 'src/shared/province/province.controller';
import { ProvinceService } from 'src/shared/province/province.service';
import { Province } from 'src/shared/province/province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService]
})

export class ProvinceModule { }
