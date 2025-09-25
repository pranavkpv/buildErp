import { ISpecSumUseCase } from '../../IUseCases/ISpecification/ISpecificationSum';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { SpecSuccessMessage } from '../../../Shared/Messages/Specification.Message';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { ILabourRepository } from '../../../domain/Entities/IRepository/ILabour';
import { mixMatAndLabour } from '../../entities/spec.entity';
import { commonOutput } from '../../dto/common';



export class SpecSumUseCase implements ISpecSumUseCase {
    constructor(
      private _materialRepository: IMaterialRepository,
      private _labourRepository: ILabourRepository,
    ) { }
    async execute(input: mixMatAndLabour): Promise<commonOutput<number> | commonOutput> {
        const { materialDetails, labourDetails } = input;
        let sumofMaterial = 0;
        let sumOfLabour = 0;
        for (const element of materialDetails) {
            const material = await this._materialRepository.getMaterialById(element.material_id);
            if (material) {
                sumofMaterial += (material?.unit_rate * element.quantity);
            }
        }
        for (const element of labourDetails) {
            const labour = await this._labourRepository.getLabourById(element.labour_id);
            if (labour) {
                sumOfLabour += (labour.daily_wage * element.numberoflabour);
            }

        }
        return ResponseHelper.success(SpecSuccessMessage.UNIT_RATE_FETCH, sumofMaterial + sumOfLabour);
    }
}