import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Floor A-01' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'FL-A01' })
  @IsNotEmpty()
  @IsString()
  locationNumber: string;

  @ApiProperty({ example: 500 })
  @IsNotEmpty()
  @IsNumber()
  area: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
