import mongoose from 'mongoose';
import { projectDB } from '../../api/models/ProjectModel';
import { transferDB } from '../../api/models/TransferModel';
import { ITransferModelEntity, materialData } from '../../domain/Entities/modelEntities/transfer.entity';
import { listTransferDTO, material, TransferOutput } from '../../application/dto/transfer.dto';
import { fetchProjectIdnameDTO } from '../../application/dto/project.dto';
import { transferInput } from '../../application/Entities/transfer.entity';
import { ITransferRepository } from '../../domain/Entities/IRepository/ITransfer';


export class TransferRepository implements ITransferRepository {

    // Fetch paginated transfer list for a site manager with search and filters
    async fetchTransferList(search: string, page: number, id: string):
        Promise<{ data: listTransferDTO[], totalPage: number }> {
        const skip = page * 5;
        const allTransfer = await transferDB.aggregate([
            { $addFields: { fromprojectObjectId: { $toObjectId: '$from_project_id' } } },
            { $lookup: { from: 'projects', localField: 'fromprojectObjectId', foreignField: '_id', as: 'fromprojectDetails' } },
            { $unwind: '$fromprojectDetails' },
            { $addFields: { toprojectObjectId: { $toObjectId: '$to_project_id' } } },
            { $lookup: { from: 'projects', localField: 'toprojectObjectId', foreignField: '_id', as: 'toprojectDetails' } },
            { $unwind: '$toprojectDetails' },
            {
                $match: {
                    $or: [
                        { 'fromprojectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'toprojectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'transfer_id': { $regex: search, $options: 'i' } },
                    ],
                    'fromprojectDetails.sitemanager_id': id,
                    'approval_status': false,
                    'reject_status': true,
                },
            },
            { $unwind: '$materialDetails' },
            { $addFields: { 'materialDetails.materialObjectId': { $toObjectId: '$materialDetails.material_id' } } },
            { $lookup: { from: 'materials', localField: 'materialDetails.materialObjectId', foreignField: '_id', as: 'materialDetails.materialInfo' } },
            { $unwind: '$materialDetails.materialInfo' },
            { $addFields: { 'materialDetails.brandObjectId': { $toObjectId: '$materialDetails.materialInfo.brand_id' } } },
            { $lookup: { from: 'brands', localField: 'materialDetails.brandObjectId', foreignField: '_id', as: 'materialDetails.brandInfo' } },
            { $unwind: '$materialDetails.brandInfo' },
            { $addFields: { 'materialDetails.unitObjectId': { $toObjectId: '$materialDetails.materialInfo.unit_id' } } },
            { $lookup: { from: 'units', localField: 'materialDetails.unitObjectId', foreignField: '_id', as: 'materialDetails.unitInfo' } },
            { $unwind: '$materialDetails.unitInfo' },
            {
                $group: {
                    _id: '$_id',
                    from_project_id: { $first: '$from_project_id' },
                    fromproject_name: { $first: '$fromprojectDetails.project_name' },
                    to_project_id: { $first: '$to_project_id' },
                    toproject_name: { $first: '$toprojectDetails.project_name' },
                    transfer_id: { $first: '$transfer_id' },
                    date: { $first: '$date' },
                    description: { $first: '$description' },
                    materialDetails: {
                        $push: {
                            material_id: '$materialDetails.material_id',
                            material_name: '$materialDetails.materialInfo.material_name',
                            brand_name: '$materialDetails.brandInfo.brand_name',
                            unit_name: '$materialDetails.unitInfo.unit_name',
                            quantity: '$materialDetails.quantity',
                            unit_rate: '$materialDetails.unit_rate',
                        },
                    },
                },
            },
            { $skip: skip },
            { $limit: 5 },
        ]);

        const data: listTransferDTO[] = allTransfer.map((element) => ({
            _id: element._id,
            from_project_id: element.from_project_id,
            fromproject_name: element.fromproject_name,
            to_project_id: element.to_project_id,
            toproject_name: element.toproject_name,
            transfer_id: element.transfer_id,
            date: element.date,
            description: element.description,
            materialDetails: element.materialDetails,
            finalAmount: element.materialDetails.reduce((sum: number, mat: { quantity: number, unit_rate: number }) => sum + (mat.quantity * mat.unit_rate), 0),
        }));

        const totalDocuments = await transferDB.aggregate([
            { $addFields: { fromprojectObjectId: { $toObjectId: '$from_project_id' } } },
            { $lookup: { from: 'projects', localField: 'fromprojectObjectId', foreignField: '_id', as: 'fromprojectDetails' } },
            { $unwind: '$fromprojectDetails' },
            { $addFields: { toprojectObjectId: { $toObjectId: '$to_project_id' } } },
            { $lookup: { from: 'projects', localField: 'toprojectObjectId', foreignField: '_id', as: 'toprojectDetails' } },
            { $unwind: '$toprojectDetails' },
            {
                $match: {
                    $or: [
                        { 'fromprojectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'toprojectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'transfer_id': { $regex: search, $options: 'i' } },
                    ],
                    'fromprojectDetails.sitemanager_id': id,
                    'approval_status': false,
                    'reject_status': true,
                },
            },
            { $count: 'total' },
        ]);

        const total = totalDocuments[0]?.total || 0;

        return {
            data,
            totalPage: Math.ceil(total / 5),
        };
    }

    // Fetch all projects except the given project ID
    async fectToproject(projectId: string): Promise<fetchProjectIdnameDTO[]> {
        const projectList = await projectDB.find({ _id: { $ne: projectId }, status: 'processing' }, { _id: 1, project_name: 1 });
        return projectList.map(project => ({
            _id: project._id.toString(),
            project_name: project.project_name,
        }));
    }

    // Save a new transfer record
    async saveTransfer(input: transferInput): Promise<boolean> {
        const { from_project_id, to_project_id, transfer_id, date, description, materialDetails } = input;
        const newTransfer = new transferDB({
            from_project_id,
            to_project_id,
            transfer_id,
            date,
            description,
            materialDetails,
            approval_status: false,
            reject_status: false,
            receive_status: false,
        });
        await newTransfer.save();
        return true;
    }

    // Update an existing transfer record
    async updateTransfer(input: transferInput): Promise<boolean> {
        const { _id, from_project_id, to_project_id, transfer_id, date, description, materialDetails } = input;
        await transferDB.findByIdAndUpdate(_id, {
            from_project_id, to_project_id, transfer_id, date, description, materialDetails,
            reject_status: false,
        });
        return true;
    }

    // Approve a transfer by ID
    async approveTransfer(id: string): Promise<void> {
        await transferDB.findByIdAndUpdate(id, { approval_status: true });
    }

    // Delete a transfer by ID
    async deleteTransfer(id: string): Promise<boolean> {
        await transferDB.findByIdAndDelete(id);
        return true;
    }

    // Find a transfer by its transfer ID
    async findTransferBytransferId(transferId: string):
        Promise<ITransferModelEntity | null> {
        const data = await transferDB.findOne({ transferId });
        return data ? data : null;
    }

    // Fetch approved transfers for a project up to a specific date that have not been received
    async findTransferDataByToProjectAndDate(id: string, date: string): Promise<TransferOutput[]> {
        const dt = new Date(date);
        const projectId = new mongoose.Types.ObjectId(id);
        const allTransfer = await transferDB.aggregate([
            { $addFields: { toprojectObjectId: { $toObjectId: '$to_project_id' } } },
            { $lookup: { from: 'projects', localField: 'toprojectObjectId', foreignField: '_id', as: 'toprojectDetails' } },
            { $unwind: '$toprojectDetails' },
            { $match: { 'toprojectObjectId': projectId, approval_status: true, date: { $lte: dt }, receive_status: false } },
            { $unwind: '$materialDetails' },
            { $addFields: { 'materialDetails.materialObjectId': { $toObjectId: '$materialDetails.material_id' } } },
            { $lookup: { from: 'materials', localField: 'materialDetails.materialObjectId', foreignField: '_id', as: 'materialDetails.materialInfo' } },
            { $unwind: '$materialDetails.materialInfo' },
            { $addFields: { 'materialDetails.brandObjectId': { $toObjectId: '$materialDetails.materialInfo.brand_id' } } },
            { $lookup: { from: 'brands', localField: 'materialDetails.brandObjectId', foreignField: '_id', as: 'materialDetails.brandInfo' } },
            { $unwind: '$materialDetails.brandInfo' },
            { $addFields: { 'materialDetails.unitObjectId': { $toObjectId: '$materialDetails.materialInfo.unit_id' } } },
            { $lookup: { from: 'units', localField: 'materialDetails.unitObjectId', foreignField: '_id', as: 'materialDetails.unitInfo' } },
            { $unwind: '$materialDetails.unitInfo' },
            {
                $group: {
                    _id: '$_id',
                    project_name: { $first: '$toprojectDetails.project_name' },
                    transfer_id: { $first: '$transfer_id' },
                    date: { $first: '$date' },
                    description: { $first: '$description' },
                    materialDetails: {
                        $push: {
                            material_id: '$materialDetails.material_id',
                            material_name: '$materialDetails.materialInfo.material_name',
                            brand_name: '$materialDetails.brandInfo.brand_name',
                            unit_name: '$materialDetails.unitInfo.unit_name',
                            quantity: '$materialDetails.quantity',
                            unit_rate: '$materialDetails.unit_rate',
                        },
                    },
                },
            },
        ]);

        const neededData = allTransfer.map(element => ({
            _id: element._id as string,
            date: element.date as Date,
            fromproject_name: element.project_name as string,
            transfer_id: element.transfer_id as string,
            materialDetails: element.materialDetails as material[],
            finalAmount: element.materialDetails.reduce((sum: number, num: materialData) => sum + (num.quantity * num.unit_rate), 0) as number,
        }));

        return neededData;
    }

    // Mark transfers as received
    async UpdateReceiveStatus(transferId: string[]): Promise<void> {
        await transferDB.updateMany({ _id: { $in: transferId } }, { receive_status: true });
    }

    // Mark transfers as not received
    async updateReceiveStatusToFalse(transferId: string[]): Promise<void> {
        await transferDB.updateMany({ _id: { $in: transferId } }, { receive_status: false });
    }

    // Fetch all approved transfers
    async findAllTransfer(): Promise<ITransferModelEntity[]> {
        const data = await transferDB.find({ approval_status: true });
        return data;
    }
    //get transfer data by material
    async getTransferByMaterialId(id: string): Promise<ITransferModelEntity | null> {
        return await transferDB.findOne({ materialDetails: { $elemMatch: { material_id: id } } });
    }
    //get transfer data by project id the project id as from or to project
    async getTransferByProjectId(id: string): Promise<ITransferModelEntity | null> {
        return await transferDB.findOne({ $or: [{ from_project_id: id }, { to_project_id: id }] });
    }
    //get un approved Transfer details by this project
    async getUnApprovedTransferByProjectId(id: string): Promise<ITransferModelEntity[]> {
        return await transferDB.find({ from_project_id: id, approval_status: false });
    }
    async getUserBaseTransfer(userId: string): Promise<listTransferDTO[]> {
        const allTransfer = await transferDB.aggregate([
            {
                $addFields: {
                    fromprojectObjectId: { $toObjectId: '$from_project_id' },
                },
            },
            { $lookup: { from: 'projects', localField: 'fromprojectObjectId', foreignField: '_id', as: 'fromprojectDetails' } },
            { $unwind: '$fromprojectDetails' },
            { $addFields: { toprojectObjectId: { $toObjectId: '$to_project_id' } } },
            { $lookup: { from: 'projects', localField: 'toprojectObjectId', foreignField: '_id', as: 'toprojectDetails' } },
            { $unwind: '$toprojectDetails' },
            {
                $match: {
                    'fromprojectDetails.user_id': userId,
                    'approval_status': false,
                    'reject_status': false,
                },
            },
            { $unwind: '$materialDetails' },
            { $addFields: { 'materialDetails.materialObjectId': { $toObjectId: '$materialDetails.material_id' } } },
            { $lookup: { from: 'materials', localField: 'materialDetails.materialObjectId', foreignField: '_id', as: 'materialDetails.materialInfo' } },
            { $unwind: '$materialDetails.materialInfo' },
            { $addFields: { 'materialDetails.brandObjectId': { $toObjectId: '$materialDetails.materialInfo.brand_id' } } },
            { $lookup: { from: 'brands', localField: 'materialDetails.brandObjectId', foreignField: '_id', as: 'materialDetails.brandInfo' } },
            { $unwind: '$materialDetails.brandInfo' },
            { $addFields: { 'materialDetails.unitObjectId': { $toObjectId: '$materialDetails.materialInfo.unit_id' } } },
            { $lookup: { from: 'units', localField: 'materialDetails.unitObjectId', foreignField: '_id', as: 'materialDetails.unitInfo' } },
            { $unwind: '$materialDetails.unitInfo' },
            {
                $group: {
                    _id: '$_id',
                    from_project_id: { $first: '$from_project_id' },
                    fromproject_name: { $first: '$fromprojectDetails.project_name' },
                    to_project_id: { $first: '$to_project_id' },
                    toproject_name: { $first: '$toprojectDetails.project_name' },
                    transfer_id: { $first: '$transfer_id' },
                    date: { $first: '$date' },
                    description: { $first: '$description' },
                    materialDetails: {
                        $push: {
                            material_id: '$materialDetails.material_id',
                            material_name: '$materialDetails.materialInfo.material_name',
                            brand_name: '$materialDetails.brandInfo.brand_name',
                            unit_name: '$materialDetails.unitInfo.unit_name',
                            quantity: '$materialDetails.quantity',
                            unit_rate: '$materialDetails.unit_rate',
                        },
                    },
                },
            },
        ]);


        const data: listTransferDTO[] = allTransfer.map((element) => ({
            _id: element._id,
            from_project_id: element.from_project_id,
            fromproject_name: element.fromproject_name,
            to_project_id: element.to_project_id,
            toproject_name: element.toproject_name,
            transfer_id: element.transfer_id,
            date: element.date,
            description: element.description,
            materialDetails: element.materialDetails,
            finalAmount: element.materialDetails.reduce((sum: number, mat: { quantity: number, unit_rate: number }) => sum + (mat.quantity * mat.unit_rate), 0),
        }));
        return data;
    }
    async rejectTransfer(transferId: string): Promise<void> {
        await transferDB.findByIdAndUpdate(transferId, { reject_status: true });
    }
}
