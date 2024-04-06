import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProvinceDocument } from './entities/province.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectModel('Province') private provinceModel: Model<ProvinceDocument>,
  ) {}

  async create(createProvinceDto: CreateProvinceDto) {
    try {
      const { name } = createProvinceDto;
      const newProvince = await this.provinceModel.create({
        name,
        createdAt: new Date().toISOString(),
      });
      return newProvince;
    } catch (error) {
      throw new HttpException(
        'Error while creating a province',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const provinces = await this.provinceModel.find().sort('-name');
      return {
        data: provinces,
        total: provinces.length,
      };
    } catch (error) {
      throw new HttpException(
        'Error while fetching provinces',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} province`;
  }

  update(id: number, updateProvinceDto: UpdateProvinceDto) {
    return `This action updates a #${id} province with ${updateProvinceDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
