import { Controller, Get, Post, Body, 
Param, Put, Delete, Req, Query } from "@nestjs/common";
import { IVRFlowService } from "./ivr-flow.service";
import { CreateIVRFlowDto } from "./dto/create-ivr-flow.dto";
import { UpdateIVRFlowDto } from "./dto/update-ivr-flow.dto";

@Controller('ivr-flows')
export class IVRFlowController {
  constructor(private readonly ivrFlowService: IVRFlowService) {}

  @Post()
  create(@Body() createIVRFlowDto: CreateIVRFlowDto, @Req() req: any ) {
    const userId = req.user?.id; 
    return this.ivrFlowService.create(createIVRFlowDto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ivrFlowService.findOne(id);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('name') name?: string) {
    return this.ivrFlowService.findAll({ page, limit, name });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateIVRFlowDto: UpdateIVRFlowDto) {
    return this.ivrFlowService.update(id, updateIVRFlowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ivrFlowService.remove(id);
  }

  @Post(':id/simulate')
  simulate(@Param('id') id: string) {
    return this.ivrFlowService.simulate(id);
  }
}
