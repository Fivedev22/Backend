import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderTypeController } from 'src/shared/gender_type/gender_type.controller';
import { GenderTypeService } from 'src/shared/gender_type/gender_type.service';
import { GenderType } from 'src/shared/gender_type/gender_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenderType])],
  controllers: [GenderTypeController],
  providers: [GenderTypeService]
})

export class GenderTypeModule { }
