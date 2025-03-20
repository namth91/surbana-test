import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    let path = '/';

    const { parentId, ...updateData } = dto;

    if (parentId) {
      const parent = await this.locationRepository.findOneById(parentId);
      if (!parent) {
        throw new NotFoundException('Parent location not found.');
      }
      path = `${parent.path}${parent.id}/`;
    }

    return this.locationRepository.create({ ...updateData, path });
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

    const { parentId, ...updateData } = dto;

    const updatedFields: Partial<CreateLocationDto> & { path?: string } = { ...updateData };

    if (parentId === id) {
      throw new BadRequestException('Cannot set the location itself as parent.');
    }

    if(parentId){
      const newParent = await this.locationRepository.findOneById(parentId);
      if (!newParent) {
        throw new BadRequestException('Specified parent location does not exist.');
      }

      if (newParent.path.startsWith(`${location.path}${location.id}/`)) {
        throw new BadRequestException('Cannot set a descendant location as the parent.');
      }

      updatedFields.path = `${newParent.path}${newParent.id}/`;
    }

    return this.locationRepository.update(id, updatedFields);
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
