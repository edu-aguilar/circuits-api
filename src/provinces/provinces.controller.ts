import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Owner } from '../auth/owner.decorator';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @Owner()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provincesService.create(createProvinceDto);
  }

  @Get()
  findAll() {
    return this.provincesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  @Owner()
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provincesService.update(id, updateProvinceDto);
  }

  @Delete(':id')
  @Owner()
  remove(@Param('id') id: string) {
    return this.provincesService.remove(id);
  }
}
