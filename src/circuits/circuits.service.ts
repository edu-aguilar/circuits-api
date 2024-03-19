import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CircuitDocument } from './entities/circuit.entity';

@Injectable()
export class CircuitsService {
  constructor(
    @InjectModel('Circuit') private circuitModel: Model<CircuitDocument>,
  ) {}

  async create(createCircuitDto: CreateCircuitDto) {
    try {
      const { name, length } = createCircuitDto;
      const newCircuit = await this.circuitModel.create({
        name,
        length,
        creationDate: new Date().toISOString(),
      });
      return newCircuit;
    } catch (error) {
      throw new HttpException(
        'Error while creating a circuit',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const circuits = await this.circuitModel
        .find()
        .sort('-creationDate')
        .exec();
      return circuits;
    } catch (error) {
      throw new HttpException(
        'Error while fetching circuits',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    const _id = new Types.ObjectId(id);
    const circuit = await this.circuitModel.findById(_id).exec();
    return circuit;
  }

  update(id: string, updateCircuitDto: UpdateCircuitDto) {
    return `This action updates a #${id} circuit`;
  }

  async remove(id: string) {
    try {
      const _id = new Types.ObjectId(id);
      return await this.circuitModel.findByIdAndDelete(_id).exec();
    } catch (error) {
      throw new HttpException(
        'Error deleting the circuit',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
