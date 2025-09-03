import { IEstimationmapper } from '../../domain/IMappers/IEstimation.mapper';
import { listEstimationDTO, publicEstimationDTO, specListInProjectDTO } from '../dto/estimation.dto';
import { estiomationAggregatebyProject, estiomationAggregateByspec } from '../Entities/estimation.entity';

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

}