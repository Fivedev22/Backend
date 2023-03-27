import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenderType } from 'src/shared/gender_type/gender_type.entity';

@Injectable()
export class GenderTypeService {

  constructor(
    @InjectRepository(GenderType)
    private readonly genderTypeRepository: Repository<GenderType>
  ) { }

  async findAll() {
    const gender_types = await this.genderTypeRepository.find({ 
      relations:['clients'],
      order: { gender_type_name: 'ASC' } });
    return gender_types;
  }

  async findOne(id_gender_type: number) {
    const gender_type = await this.genderTypeRepository.findOne({ 
      relations: ['clients'],
      where: { id_gender_type } });
    return gender_type;
  }

}
