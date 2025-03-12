import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of locations.',
    type: [Location],
  })
  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: 200, description: 'Location found', type: Location })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    const location = await this.locationService.findOne(id);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  @ApiOperation({ summary: 'Get descendants of a location by ID' })
  @ApiResponse({
    status: 200,
    description: 'List of descendant locations',
    type: [Location],
  })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id/descendants')
  async findDescendants(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Location[]> {
    return this.locationService.findDescendants(id);
  }

  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({
    status: 201,
    description: 'Location created successfully',
    type: Location,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or parent not found',
  })
  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Update existing location by ID' })
  @ApiResponse({
    status: 200,
    description: 'Location updated successfully',
    type: Location,
  })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiParam({ name: 'id', example: 1 })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete location and its descendants by ID' })
  @ApiResponse({
    status: 200,
    description: 'Location and descendants deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiParam({ name: 'id', example: 1 })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.locationService.remove(id);
  }

  @ApiOperation({ summary: 'Get parent location by ID' })
  @ApiResponse({ status: 200, description: 'Parent location', type: Location })
  @ApiResponse({ status: 404, description: 'Location not found' })
  @ApiParam({ name: 'id', example: 1 })
  @Get(':id/parent')
  async getParent(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    const parent = await this.locationService.getParent(id);
    if (!parent) {
      throw new NotFoundException(
        'Parent location not found or it is a root location.',
      );
    }
    return parent;
  }
}
