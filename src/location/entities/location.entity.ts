import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('locations')
export class Location {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Building A' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 'BLDA' })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  locationNumber: string;

  @ApiProperty({ example: 5000 })
  @Column({ type: 'float', nullable: false })
  area: number;

  @ApiProperty({ example: '/' })
  @Column({ type: 'text', default: '/', nullable: false })
  path: string;

  @ApiProperty({ example: '2025-03-12T09:00:00Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-03-12T09:00:00Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
