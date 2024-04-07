import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RegionDocument } from './entities/region.entity';
import { Model } from 'mongoose';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel('Region') private regionModel: Model<RegionDocument>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      const { name } = createRegionDto;
      const newRegion = await this.regionModel.create({
        name,
        createdAt: new Date().toISOString(),
      });
      return newRegion;
    } catch (error) {
      throw new HttpException(
        'Error while creating a region',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const regions = await this.regionModel.find().sort('+name');
      return {
        data: regions,
        total: regions.length,
      };
    } catch (error) {
      throw new HttpException(
        'Error while fetching regions',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    const region = await this.regionModel.findById(id).exec();

    if (!region) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const updatedRegion = await this.regionModel.findByIdAndUpdate(
      id,
      updateRegionDto,
      { new: true },
    );

    if (!updatedRegion) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }

    return updatedRegion;
  }

  async remove(id: string) {
    const deletedRegion = await this.regionModel.findByIdAndDelete(id);
    if (!deletedRegion) {
      throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
    }
  }
}
