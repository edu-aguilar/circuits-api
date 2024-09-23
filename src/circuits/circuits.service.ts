import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CircuitDocument } from './entities/circuit.entity';
import { CircuitFilterQuery } from './interfaces/CircuitFilterQuery';
import { ProvinceDocument } from 'src/provinces/entities/province.entity';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel('Circuit') private circuitModel: Model<CircuitDocument>,
    @InjectModel('Province') private provinceModel: Model<ProvinceDocument>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto) {
    try {
      const nameUrl = this.generateUrlName(createCircuitDto.name);
      const newCircuit = await this.circuitModel.create({
        ...createCircuitDto,
        nameUrl,
        createdAt: new Date().toISOString(),
      });
      console.log('circuit created: ', newCircuit);

      return newCircuit;
    } catch (error) {
      throw new HttpException(
        'Error while creating a circuit',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(circuitFilterQuery: CircuitFilterQuery) {
    const query: any = {};

    if (circuitFilterQuery.name) {
      query.name = { $regex: new RegExp(circuitFilterQuery.name, 'i') };
    }
    if (circuitFilterQuery.provinceId) {
      query.provinceId = circuitFilterQuery.provinceId;
    }
    if (circuitFilterQuery.regionId) {
      const provincesInRegion = await this.getProvincesByRegion(
        circuitFilterQuery.regionId,
      );
      query.provinceId = { $in: provincesInRegion };
    }

    try {
      const circuits = await this.circuitModel.find(query).sort('-name');
      console.log('circuits found: ', circuits);

      return {
        data: circuits,
        total: circuits.length,
      };
    } catch (error) {
      throw new HttpException(
        'Error while fetching circuits',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    const circuit = await this.circuitModel.findById(id).exec();

    if (!circuit) {
      throw new HttpException('Circuit not found', HttpStatus.NOT_FOUND);
    }

    console.log('circuit found: ', circuit);

    return circuit;
  }

  async update(id: string, updateCircuitDto: UpdateCircuitDto) {
    const updatedCircuit = await this.circuitModel.findByIdAndUpdate(
      id,
      updateCircuitDto,
      { new: true },
    );

    if (!updatedCircuit) {
      throw new HttpException('Circuit not found', HttpStatus.NOT_FOUND);
    }

    return updatedCircuit;
  }

  async remove(id: string) {
    const deletedCircuit = await this.circuitModel.findByIdAndDelete(id);

    if (!deletedCircuit) {
      throw new HttpException('Circuit not found', HttpStatus.NOT_FOUND);
    }

    console.log(`circuit with id ${id} removed successfully`);
  }

  private async getProvincesByRegion(regionId: string): Promise<string[]> {
    const provinces = await this.provinceModel
      .find({ regionId })
      .distinct('_id');
    return provinces.map((id) => id.toString());
  }

  private generateUrlName(name: string) {
    const nameUrl = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    return this.removeAccents(nameUrl);
  }

  private removeAccents(str: string): string {
    const accents: { [key: string]: string } = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
      ñ: 'n',
      Ñ: 'N',
    };

    return str
      .split('')
      .map((char) => accents[char] || char)
      .join('');
  }
}
