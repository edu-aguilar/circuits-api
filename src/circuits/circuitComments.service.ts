import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CircuitCommentDocument } from './entities/circuitComment.entity';
import { CreateCircuitCommentDto } from '../circuits/dto/create-circuitComment.dto';
import { UpdateCircuitCommentDto } from '../circuits/dto/update-circuitComment.dto';

@Injectable()
export class CircuitCommentsService {
  constructor(
    @InjectModel('CircuitComment')
    private circuitCommentModel: Model<CircuitCommentDocument>,
  ) {}

  async create(
    createCircuitCommentDto: CreateCircuitCommentDto & { circuitId: string },
  ) {
    try {
      const now = new Date().toISOString();
      const { userId, userName, text, circuitId } = createCircuitCommentDto;
      const newCircuitComment = await this.circuitCommentModel.create({
        circuitId,
        userId,
        userName,
        text,
        createdAt: now,
        updatedAt: now,
      });
      return newCircuitComment;
    } catch (error) {
      throw new HttpException(
        'Error while creating a circuit comment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll({ circuitId }: { circuitId: string }) {
    try {
      const circuitComments = await this.circuitCommentModel
        .find({ circuitId })
        .sort('-updatedAt')
        .limit(10);
      return {
        data: circuitComments,
        total: circuitComments.length,
      };
    } catch (error) {
      throw new HttpException(
        'Error while fetching circuit comments',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateCircuitCommentDto: UpdateCircuitCommentDto) {
    const updatedCircuitComment =
      await this.circuitCommentModel.findByIdAndUpdate(
        id,
        updateCircuitCommentDto,
        {
          new: true,
        },
      );

    if (!updatedCircuitComment) {
      throw new HttpException(
        'circuit comment not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedCircuitComment;
  }

  async remove(id: string) {
    const deletedCircuitComment =
      await this.circuitCommentModel.findByIdAndDelete(id);
    if (!deletedCircuitComment) {
      throw new HttpException(
        'Circuit comment not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
