import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from 'src/shared/province/province.entity';

@Injectable()
export class ProvinceService {

  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>
  ) { }

  async findAll() {
    const provinces = await this.provinceRepository.find({ 
      relations: ['clients','properties'],
      order: { province_name: 'ASC' } });
    return provinces;
  }

  async findOne(id_province: number) {
    const province = await this.provinceRepository.findOne({ 
      relations: ['clients','properties'],
      where: { id_province } });
    return province;
  }

}
