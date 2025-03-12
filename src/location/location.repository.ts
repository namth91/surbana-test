import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
  ) {}

  async create(location: Partial<Location>): Promise<Location> {
    const entity = this.repository.create(location);
    return this.repository.save(entity);
  }

  async findOneById(id: number): Promise<Location | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Location[]> {
    return this.repository.find();
  }

  async findDescendants(id: number): Promise<Location[]> {
    return this.repository.find({
      where: { path: Like(`%/${id}/%`) },
    });
  }

  async update(id: number, data: Partial<Location>): Promise<Location> {
    await this.repository.update(id, data);
    return this.findOneById(id);
  }

  async deleteWithDescendants(id: number): Promise<void> {
    const descendants = await this.findDescendants(id);
    const idsToRemove = descendants.map((d) => d.id).concat(id);
    await this.repository.delete(idsToRemove);
  }

  async findParent(location: Location): Promise<Location | null> {
    const parentId = this.getParentIdFromPath(location.path);
    if (!parentId) return null;

    return this.repository.findOne({ where: { id: parentId } });
  }

  private getParentIdFromPath(path: string): number | null {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return null;
    return +segments[segments.length - 1];
  }
}
