import { Test, TestingModule } from "@nestjs/testing";
import { IVRFlowController } from "./ivr-flow.controller";
import { IVRFlowService } from "./ivr-flow.service";
import { PrismaService } from "../prisma/prisma.service";

jest.setTimeout(150000);
describe('IVRFlowController', () => {
  let controller: IVRFlowController;
  let service: IVRFlowService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IVRFlowController],
      providers: [IVRFlowService, PrismaService],
    }).compile();

    controller = module.get<IVRFlowController>(IVRFlowController);
    service = module.get<IVRFlowService>(IVRFlowService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.user.create({
      data: {
        id: 'user-id', 
        email: 'test@test.com',
        password: 'hashedpassword',
      },
    });
  });

  it('should create a new IVR flow', async () => {
    const createDto = { flowName: 'Test Flow', steps: [] };
    const result = await service.create(createDto, 'user-id');
    expect(result).toBeDefined();
  }, 150000);
});
