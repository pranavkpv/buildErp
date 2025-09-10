import { IEstimationAdditionalModalEntity } from '../../domain/Entities/modelEntities/estimationAdditional.entity';
import { IEstimationmapper } from '../../domain/IMappers/IEstimation.mapper';
import { additionEstimateDTO, estimateByProjectDTO, labourEstimateDTO, listEstimationDTO, materialEstimateDTO, publicEstimationDTO, specListInProjectDTO } from '../dto/estimation.dto';
import { estimationAggregatebyLabour, estimationAggregatebymaterialbrandunit, estimationAggregatebySpec, estiomationAggregatebyProject, estiomationAggregateByspec } from '../Entities/estimation.entity';

export class EstimationMapper implements IEstimationmapper {
    topublicEstimateData(estimation: estiomationAggregateByspec[]): publicEstimationDTO[] {
        return estimation.map((element) => ({
            project_id: element.project_id,
            spec_id: element.spec_id,
            specDetails: {
                spec_name: element.specDetails.spec_name,
                description: element.specDetails.description,
            },
        }));
    }
    tolistEstimationDTO(estimation: estiomationAggregatebyProject[]): listEstimationDTO[] {
        return estimation.map((element) => ({
            budgeted_cost: element.budgeted_cost,
            project_id: element._id,
            projectObjectId: element.projectObjectId,
            projectDetails: {
                project_name: element.projectDetails.project_name,
                expected_image: element.projectDetails.expected_image,
            },
        }));
    }
    toSpecListDTO(estimation: estiomationAggregateByspec[]): specListInProjectDTO[] {
        return estimation.map((element)=>({
            _id:element._id,
            spec_name:element.specDetails.spec_name,
            spec_id:element.specDetails.spec_id,
            quantity:element.quantity,
            unitrate:element.unit_rate,
            total:element.unit_rate * element.quantity,
        }));
    }
    toEstimateByProjectDTO(estimation: estimationAggregatebySpec[]): estimateByProjectDTO[] {
        return estimation.map((element)=>({
            _id:element.spec_id,
            spec_name:element.specDetails.spec_name,
            unit_rate:element.unit_rate,
            quantity:element.quantity,
            approvalStatus:element.approvalStatus
        }))
    }
    toMaterialEstimateDTO(estimation: estimationAggregatebymaterialbrandunit[]): materialEstimateDTO[] {
        return estimation.map((element)=>({
            _id:element.material_id,
            brand_name:element.brandDetails.brand_name,
            material_name:element.materialDetails.material_name,
            unit_name:element.unitDetails.unit_name,
            quantity:element.quantity,
            unit_rate:element.unit_rate
        }))
    }
    toadditionEstimateDTO(estimation: IEstimationAdditionalModalEntity[]): additionEstimateDTO[] {
        return estimation.map((element)=>({
            additionalExpense_amount:element.additionalExpense_amount || 0,
            additionalExpense_per:element.additionalExpense_per || 0,
            profit_amount:element.profit_amount || 0,
            profit_per:element.profit_per || 0
        }))
    }
    tolabourEstimateDTO(estimation: estimationAggregatebyLabour[]): labourEstimateDTO[] {
        return estimation.map((element)=>({
            _id : element.labour_id,
            daily_wage:element.daily_wage,
            labour_name:element.labourDetails.labour_type,
            numberoflabour:element.numberoflabour,
        }))
    }

}