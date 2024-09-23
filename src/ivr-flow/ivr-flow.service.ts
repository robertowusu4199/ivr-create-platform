import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateIVRFlowDto } from "./dto/create-ivr-flow.dto";
import { UpdateIVRFlowDto } from "./dto/update-ivr-flow.dto";

@Injectable()
export class IVRFlowService {
  constructor(private prisma: PrismaService) {}

  async create(createIVRFlowDto: CreateIVRFlowDto, userId: string) {
    const latestFlow = await this.prisma.iVRFlow.findFirst({
      where: { name: createIVRFlowDto.flowName, userId },
      orderBy: { version: 'desc' },
    });

    const newVersion = latestFlow ? latestFlow.version + 1 : 1;

    return this.prisma.iVRFlow.create({
      data: {
        name: createIVRFlowDto.flowName,
        steps: createIVRFlowDto.steps,
        userId: userId,
        version: newVersion,
      },
    });
  }

  async findOne(id: string) {
    const flow = await this.prisma.iVRFlow.findUnique({ where: { id } });
    if (!flow) throw new NotFoundException('IVR Flow not found');
    return flow;
  }

  async simulate(id: string) {
    const flow = await this.findOne(id);

    const steps = flow.steps as Array<{
      type: string;
      options?: { [key: string]: string };
    }>;
    const log = steps.map((step, index) => {
      if (step.type === 'Menu') {
        const option = Math.random() > 0.5 ? '1' : '2'; // Simulate random user input
        const action = step.options?.[option] || 'Invalid option';
        return `Step ${index + 1}: Menu option selected: ${option}, Action: ${action}`;
      } else {
        return `Step ${index + 1}: ${JSON.stringify(step)}`;
      }
    });

    return log;
  }

  async update(id: string, updateIVRFlowDto: UpdateIVRFlowDto) {
    const flow = await this.prisma.iVRFlow.update({
      where: { id },
      data: { ...updateIVRFlowDto },
    });
    return flow;
  }

  async remove(id: string) {
    return this.prisma.iVRFlow.delete({ where: { id } });
  }

  async findAll({
    page,
    limit,
    name,
  }: {
    page: number;
    limit: number;
    name?: string;
  }) {
    const skip = (page - 1) * limit;
    const where = name ? { name: { contains: name } } : {};

    const flows = await this.prisma.iVRFlow.findMany({
      where,
      skip,
      take: limit,
    });

    return flows;
  }
}
