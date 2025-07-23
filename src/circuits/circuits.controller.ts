import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CircuitsService } from './circuits.service';
import { CreateCircuitDto } from './dto/create-circuit.dto';
import { UpdateCircuitDto } from './dto/update-circuit.dto';
import { CircuitFilterQuery } from './interfaces/CircuitFilterQuery';
import { Owner } from '../auth/owner.decorator';
import { CircuitCommentsService } from './circuitComments.service';
import { CreateCircuitCommentDto } from './dto/create-circuitComment.dto';

@Controller('circuits')
export class CircuitsController {
  constructor(
    private readonly circuitsService: CircuitsService,
    private readonly circuitCommentsService: CircuitCommentsService,
  ) {}

  @Post()
  @Owner()
  create(@Body() createCircuitDto: CreateCircuitDto) {
    console.log('POST circuit endpoint');

    return this.circuitsService.create(createCircuitDto);
  }

  @Get()
  findAll(@Query() circuitFilterQuery: CircuitFilterQuery) {
    console.log('GET circuit endpoint');

    return this.circuitsService.findAll(circuitFilterQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('GET by id circuit endpoint');

    return this.circuitsService.findOne(id);
  }

  @Patch(':id')
  @Owner()
  update(@Param('id') id: string, @Body() updateCircuitDto: UpdateCircuitDto) {
    console.log('PATCH circuit endpoint');

    return this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  @Owner()
  remove(@Param('id') id: string) {
    console.log('DELETE circuit endpoint');

    return this.circuitsService.remove(id);
  }

  @Get(':id/comments')
  findAllCircuitComments(@Param('id') id: string) {
    console.log('GET circuit comments endpoint');

    return this.circuitCommentsService.findAll({
      circuitId: id,
    });
  }

  @Post(':id/comments')
  createCircuitComment(
    @Param('id') id: string,
    @Body() createCircuitCommentDto: CreateCircuitCommentDto,
  ) {
    console.log('POST circuit comments endpoint');

    return this.circuitCommentsService.create({
      circuitId: id,
      text: createCircuitCommentDto.text,
      userId: createCircuitCommentDto.userId,
      userName: createCircuitCommentDto.userName,
    });
  }
}
