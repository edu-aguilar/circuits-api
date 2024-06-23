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

@Controller('circuits')
export class CircuitsController {
  constructor(private readonly circuitsService: CircuitsService) {}

  @Post()
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
  update(@Param('id') id: string, @Body() updateCircuitDto: UpdateCircuitDto) {
    return this.circuitsService.update(id, updateCircuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('DELETE circuit endpoint');

    return this.circuitsService.remove(id);
  }
}
