import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const record = this.brands.find((brand) => brand.id === id);
    if (!record)
      throw new NotFoundException(`Brand with id "${id}" not found.`);
    return record;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let record = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        record.updatedAt = new Date().getTime();
        record = { ...record, ...updateBrandDto, id };
        return record;
      }
      return brand;
    });

    return record;
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }

  fillCarsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
