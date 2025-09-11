import { IEstimationRepository } from '../../../domain/Entities/IRepository/IEstimation';
import { ISpecRepository } from '../../../domain/Entities/IRepository/ISpecification';
import { commonOutput } from '../../dto/common';
import { saveRequirementInput } from '../../Entities/requirement.entity';
import { ISaveRequirementUseCase } from '../../IUseCases/IRquirement/ISaveRequirement';
import { IBrandRepository } from '../../../domain/Entities/IRepository/IBrand';
import { IMaterialRepository } from '../../../domain/Entities/IRepository/IMaterial';
import { ILabourRepository } from '../../../domain/Entities/IRepository/ILabour';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { MaterialFailedMessage } from '../../../Shared/Messages/Material.Message';
import { BrandFailedMessage } from '../../../Shared/Messages/Brand.Message';
import { LabourFailedMessage } from '../../../Shared/Messages/Labour.Message';
import { EstimationFailedMessage, EstimationSuccessMessage } from '../../../Shared/Messages/Estimation.Message';
import { IprojectRepository } from '../../../domain/Entities/IRepository/IProject';
import { Role } from '../../../Shared/Constants/Role.constant';
import { IProjectmapper } from '../../../domain/IMappers/IProject.mapper';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';
import { userBaseProjectDTO } from '../../dto/project.dto';


export class SaveRequirementUseCase implements ISaveRequirementUseCase {
    constructor(
      private _estimationRepository: IEstimationRepository,
      private _specRepository: ISpecRepository,
      private _brandRepository: IBrandRepository,
      private _materialRepository: IMaterialRepository,
      private _labourRepository: ILabourRepository,
      private _projectRepository: IprojectRepository,
      private _projectmapper: IProjectmapper,
    ) { }
    async execute(input: saveRequirementInput): Promise<commonOutput | commonOutput<userBaseProjectDTO>> {
        const { materialDetails, spec_id, projectId } = input;
        const specData = [];
        for (const element of spec_id) {
            const materials = [];
            const labours = [];
            const specDetails = await this._specRepository.getSpecById(element);
            if (!specDetails?.materialDetails) {
                return ResponseHelper.conflictData(MaterialFailedMessage.NO_EXIST);
            }
            for (const item of specDetails.materialDetails) {
                const materialData = await this._materialRepository.getMaterialById(item.material_id);
                for (const char of materialDetails) {
                    const brandId = await this._brandRepository.getBrandByName(char.brand_name);
                    if (!brandId?._id) {
                        return ResponseHelper.conflictData(BrandFailedMessage.NO_EXIST);
                    }
                    if (materialData?.material_name === char.material_name) {
                        const materialBynameandBrand = await this._materialRepository.getMaterialBynameAndBrand(char.material_name, brandId?._id);
                        materials.push({ material_id: materialBynameandBrand?._id, quantity: item.quantity, unit_rate: materialBynameandBrand?.unit_rate });
                    }
                }
            }
            for (const item of specDetails.labourDetails) {
                const labourData = await this._labourRepository.getLabourById(item.labour_id);
                labours.push({ labour_id: item.labour_id, daily_wage: labourData?.daily_wage, numberoflabour: item.numberoflabour });
            }
            const materialSum = materials.reduce((sum, num) => sum += num.quantity * (num.unit_rate || 1), 0);
            const labourSum = labours.reduce((sum, num) => sum += (num.daily_wage || 1) * num.numberoflabour, 0);
            const additionalAmount = specDetails.additionalExpense_per * (labourSum + materialSum) / 100;
            const profitAmount = specDetails.profit_per * (labourSum + materialSum + additionalAmount) / 100;
            const specFinalAmount = materialSum + labourSum + additionalAmount + profitAmount;

            specData.push({
                spec_id: element, quantity: 1, materialDetails: materials, labourDetails: labours,
                additional_expense_per: specDetails.additionalExpense_per, profit_per: specDetails.profit_per,
                additionalExpense_amount: additionalAmount, profit_amount: profitAmount, unit_rate: specFinalAmount,
            });
        }
        for (const element of specData) {
            const estimationSave = await this._estimationRepository.saveEstimation(element.spec_id, projectId, element.unit_rate, element.quantity);
            const estimationAdditionSave = await this._estimationRepository.saveAdditionalEstimation(element.additionalExpense_amount, element.additional_expense_per, element.profit_amount, element.profit_per, projectId);
            for (const item of element.materialDetails) {
                if (!item.material_id || !item.unit_rate) {
                    return ResponseHelper.conflictData(MaterialFailedMessage.NO_EXIST);
                }
                const estimationMaterialSave = await this._estimationRepository.saveMaterialEstimation(item.material_id, item.quantity, item.unit_rate, projectId);
                if (!estimationMaterialSave) {
                    return ResponseHelper.conflictData(EstimationFailedMessage.REQUIREMENT_FAIL);
                }
            }
            for (const item of element.labourDetails) {
                if (!item.daily_wage) {
                    return ResponseHelper.conflictData(LabourFailedMessage.FETCH);
                }
                const estimationLabourSave = await this._estimationRepository.saveLabourEstimation(item.labour_id, item.daily_wage, item.numberoflabour, projectId);
                if (!estimationLabourSave) {
                    return ResponseHelper.conflictData(EstimationFailedMessage.REQUIREMENT_FAIL);
                }
            }
            if (!estimationSave || !estimationAdditionSave) {
                return ResponseHelper.conflictData(EstimationFailedMessage.REQUIREMENT_FAIL);
            }
        }

        await this._projectRepository.updateEstimatedUser(Role.USER, projectId);
        const projectData = await this._projectRepository.getProjectById(projectId);
        if (!projectData) {
            return ResponseHelper.conflictData(ProjectFailedMessage.FETCH);
        }
        const mappedData = this._projectmapper.toUserBaseOneProjectDto(projectData);
        return ResponseHelper.success(EstimationSuccessMessage.REQUIREMENT_ADD, mappedData);

    }
} 