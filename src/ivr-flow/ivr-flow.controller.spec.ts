import { Test, TestingModule } from '@nestjs/testing';
import { IVRFlowController } from './ivr-flow.controller';
import { IVRFlowService } from './ivr-flow.service';
import { CreateIVRFlowDto } from './dto/create-ivr-flow.dto';

describe('IVRFlowController', () => {
  let controller: IVRFlowController;
  let service: IVRFlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IVRFlowController],
      providers: [
        {
          provide: IVRFlowService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IVRFlowController>(IVRFlowController);
    service = module.get<IVRFlowService>(IVRFlowService);
  });

  it('should create a new IVR flow', async () => {
    
    const createDto: CreateIVRFlowDto = { flowName: 'Test Flow', steps: [] };
    const userId = 'user-id'; 
    const mockCreatedFlow = { id: '1', name: 'Test Flow', version: 1, steps: [], userId: 'user-id',
        createdAt: new Date(), updatedAt: new Date()
     };

    jest.spyOn(service, 'create').mockResolvedValue(mockCreatedFlow);

    const result = await controller.create(createDto, { user: { id: userId } } as any);

    expect(result).toEqual(mockCreatedFlow);
    expect(service.create).toHaveBeenCalledWith(createDto, userId);
  });
});

