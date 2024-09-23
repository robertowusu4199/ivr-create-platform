import { PartialType } from '@nestjs/mapped-types';
import { CreateIVRFlowDto } from './create-ivr-flow.dto';

export class UpdateIVRFlowDto extends 
PartialType(CreateIVRFlowDto) {}