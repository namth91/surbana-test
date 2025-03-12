import { Injectable, NotFoundException } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    let path = '/';

    if (dto.parentId) {
      const parent = await this.locationRepository.findOneById(dto.parentId);
      if (!parent) {
        throw new NotFoundException('Parent location not found.');
      }
      path = `${parent.path}${parent.id}/`;
    }

    return this.locationRepository.create({ ...dto, path });
  }

  async findOne(id: number): Promise<Location> {
    return this.locationRepository.findOneById(id);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.findAll();
  }

  async findDescendants(id: number): Promise<Location[]> {
    return this.locationRepository.findDescendants(id);
  }

  async update(id: number, dto: Partial<CreateLocationDto>): Promise<Location> {
    const location = await this.locationRepository.findOneById(id);
    if (!location) {
      throw new NotFoundException('Location not found.');
    }

    return this.locationRepository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    return this.locationRepository.deleteWithDescendants(id);
  }

  async getParent(id: number): Promise<Location | null> {
    const location = await this.locationRepository.findOneById(id);
    if (!location) {
      throw new NotFoundException('Location not found.');
    }

    return this.locationRepository.findParent(location);
  }
}
