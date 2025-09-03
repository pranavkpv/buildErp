import { purchaseDB } from '../../api/models/PurchaseModel';
import { PurchaseDTO } from '../../application/dto/purchase.dto';
import { purchaseInput } from '../../application/Entities/purchase.entity';
import { IPurchaseModelEntity } from '../../domain/Entities/modelEntities/purchase.entity';
import { IPurchaseRepository } from '../../domain/Entities/IRepository/IPurchase';

export class PurchaseRepository implements IPurchaseRepository {

    // Fetch all purchases with search and pagination (pending approval)
    async getPurchasesBySearchAndPage(search: string, page: number, siteManagerId: string):
        Promise<{ data: PurchaseDTO[], totalPage: number }> {
        const skip = page * 5;
        const allPurchase = await purchaseDB.aggregate([
            { $addFields: { projectObjectId: { $toObjectId: '$project_id' } } },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            {
                $match: {
                    $or: [
                        { 'projectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'invoice_number': { $regex: search, $options: 'i' } },
                    ],
                    'projectDetails.sitemanager_id': siteManagerId,
                    'approval_status': false,
                },
            },
            { $unwind: '$materialDetails' },
            {
                $addFields: {
                    'materialDetails.materialObjectId': { $toObjectId: '$materialDetails.material_id' },
                },
            },
            {
                $lookup: {
                    from: 'materials',
                    localField: 'materialDetails.materialObjectId',
                    foreignField: '_id',
                    as: 'materialDetails.materialInfo',
                },
            },
            { $unwind: '$materialDetails.materialInfo' },
            {
                $addFields: {
                    'materialDetails.brandObjectId': { $toObjectId: '$materialDetails.materialInfo.brand_id' },
                },
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'materialDetails.brandObjectId',
                    foreignField: '_id',
                    as: 'materialDetails.brandInfo',
                },
            },
            { $unwind: '$materialDetails.brandInfo' },
            {
                $addFields: {
                    'materialDetails.unitObjectId': { $toObjectId: '$materialDetails.materialInfo.unit_id' },
                },
            },
            {
                $lookup: {
                    from: 'units',
                    localField: 'materialDetails.unitObjectId',
                    foreignField: '_id',
                    as: 'materialDetails.unitInfo',
                },
            },
            { $unwind: '$materialDetails.unitInfo' },
            {
                $group: {
                    _id: '$_id',
                    project_id: { $first: '$project_id' },
                    project_name: { $first: '$projectDetails.project_name' },
                    invoice_number: { $first: '$invoice_number' },
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

        const data: PurchaseDTO[] = allPurchase.map((element: any) => ({
            _id: element._id,
            project_id: element.project_id,
            project_name: element.project_name,
            invoice_number: element.invoice_number,
            date: element.date,
            description: element.description,
            materialDetails: element.materialDetails,
            finalAmount: element.materialDetails.reduce(
                (sum: number, mat: any) => sum + (mat.quantity * mat.unit_rate),
                0,
            ),
        }));

        const totalDocuments = await purchaseDB.aggregate([
            { $addFields: { projectObjectId: { $toObjectId: '$project_id' } } },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            },
            { $unwind: '$projectDetails' },
            {
                $match: {
                    $or: [
                        { 'projectDetails.project_name': { $regex: search, $options: 'i' } },
                        { 'invoice_number': { $regex: search, $options: 'i' } },
                    ],
                    'projectDetails.sitemanager_id': siteManagerId,
                    'approval_status': false,
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

    // Create a new purchase
    async createPurchase(input: purchaseInput): Promise<boolean> {
        const { project_id, invoice_number, date, description, materialDetails } = input;
        console.log(input);
        console.log(input.materialDetails);

        const newPurchase = new purchaseDB({
            project_id,
            invoice_number,
            date: new Date(date),
            approval_status: false,
            description,
            materialDetails,
        });

        await newPurchase.save();
        return true;
    }

    // Update purchase by ID
    async updatePurchase(input: purchaseInput): Promise<boolean> {
        const { _id, project_id, invoice_number, date, description, materialDetails } = input;

        await purchaseDB.findByIdAndUpdate(_id, {
            project_id,
            invoice_number,
            date,
            description,
            materialDetails,
        });

        return true;
    }

    // Delete purchase by ID
    async deletePurchaseById(id: string): Promise<void> {
        await purchaseDB.findByIdAndDelete(id);
    }

    // Approve purchase by ID
    async approvePurchaseById(id: string): Promise<void> {
        await purchaseDB.findByIdAndUpdate(id, { approval_status: true });
    }

    // Get all approved purchases
    async getAllApprovedPurchases(): Promise<IPurchaseModelEntity[]> {
        return await purchaseDB.find({ approval_status: true });
    }
    //get one purchase by project id
    async getPurchaseByProjectId(id: string): Promise<IPurchaseModelEntity | null> {
        const result = await purchaseDB.findOne({ project_id: id });
        return result;
    }
    //get purchase data exist of material id
    async getPurchaseByMaterialId(id: string): Promise<IPurchaseModelEntity | null> {
        return await purchaseDB.findOne({ materialDetails: { $elemMatch: { material_id: id } } });
    }
    //get purchase by invoice
    async getPurchaseByInvoice(invoice: string): Promise<IPurchaseModelEntity | null> {
        return await purchaseDB.findOne({ invoice_number: invoice });
    }
    //get all purchase without aprove by projectId
    async getUnApprovedPurchaseByProjectId(id: string): Promise<IPurchaseModelEntity[]> {
        return await purchaseDB.find({ project_id:id,approval_status:false });
    }

    async getPurchaseByInvoiceInEdit(invoice: string, id: string): Promise<IPurchaseModelEntity | null> {
        return await purchaseDB.findOne({ _id:{ $ne:id },invoice_number:invoice });
    }
}
