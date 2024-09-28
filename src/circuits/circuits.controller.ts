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

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

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
}
