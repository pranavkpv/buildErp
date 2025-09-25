import Stripe from 'stripe';
import { IPaymentRepostory } from '../../domain/Entities/IRepository/IPayment';
import { payByProject, PaymentInput, walletByUser } from '../../application/entities/payment.entity';
import { paymentDB } from '../../api/models/PaymentMode';
import { IPaymentModelEntity } from '../../domain/Entities/modelEntities/payment.entity';
import { listingInput } from '../../application/entities/common.entity';
import { paymentAggregateByStage } from '../../application/entities/stage.entity';

export class PaymentRepository implements IPaymentRepostory {
    constructor(
        private _stripe: Stripe,
    ) { }
    async verifyWebhookSignature(payload: Buffer, signature: string, endpointSecret: string):
        Promise<Stripe.Event> {
        const event = await this._stripe.webhooks.constructEvent(
            payload,
            signature,
            endpointSecret,
        );
        return event;
    }
    async createCheckoutSession(input: PaymentInput):
        Promise<void> {
        const { date, stage_id, amount, paymentMethod, paymentStatus, purpose, stripeSessionId } = input;
        const newPayment = new paymentDB({
            date,
            stage_id,
            amount,
            paymentMethod,
            paymentStatus,
            purpose,
            stripeSessionId,
        });
        await newPayment.save();
    }
    async findBySessionId(sessionId: string):
        Promise<IPaymentModelEntity | null> {
        return await paymentDB.findOne({ stripeSessionId: sessionId });
    }
    async updatePaymentStatus(stageId: string, status: string):
        Promise<void> {
        await paymentDB.findOneAndUpdate({ stage_id: stageId }, { paymentStatus: status });
    }
    async getAggregatePaymentbyStage(input: listingInput):
        Promise<{ data: paymentAggregateByStage[]; totalPage: number; }> {
        const { search, page } = input;
        const limit = 10;
        const skip = page * 10;
        const stage = await paymentDB.aggregate([
            {
                $addFields: {
                    stageObjectId: {
                        $toObjectId: '$stage_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'stageObjectId',
                    foreignField: '_id',
                    as: 'stageDetails',
                },
            }, { $unwind: '$stageDetails' },
            {
                $addFields: {
                    projectObjectId: {
                        $toObjectId: '$stageDetails.project_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.project_name': {
                        $regex: search, $options: 'i',
                    }, purpose: 'stage payment',
                },
            },
            { $skip: skip }, { $limit: limit },
        ]);
        const totalDoc = await paymentDB.aggregate([
            {
                $addFields: {
                    stageObjectId: {
                        $toObjectId: '$stage_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'stageObjectId',
                    foreignField: '_id',
                    as: 'stageDetails',
                },
            }, { $unwind: '$stageDetails' },
            {
                $addFields: {
                    projectObjectId: {
                        $toObjectId: '$stageDetails.project_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.project_name': {
                        $regex: search, $options: 'i',
                    }, purpose: 'stage payment',
                },
            },
        ]);
        return {
            data: stage,
            totalPage: Math.ceil(totalDoc.length/5),
        };

    }
    async getWalletHistoryRepo(page: number, search: string, userId: string):
        Promise<{ data: paymentAggregateByStage[]; totalPage: number; }> {
        const limit = 10;
        const skip = (page - 1) * 10;


        const stage = await paymentDB.aggregate([
            {
                $match: {
                    paymentMethod: 'wallet',
                }
            },
            {
                $addFields: {
                    stageObjectId: {
                        $toObjectId: '$stage_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'stageObjectId',
                    foreignField: '_id',
                    as: 'stageDetails',
                },
            }, { $unwind: '$stageDetails' },
            {
                $addFields: {
                    projectObjectId: {
                        $toObjectId: '$stageDetails.project_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.project_name': {
                        $regex: search, $options: 'i',
                    }, 'projectDetails.user_id': userId,
                },
            },
            { $skip: skip }, { $limit: limit },
        ]);

        const totalDoc = await paymentDB.aggregate([
            {
                $match: {
                    paymentMethod: 'wallet',
                }
            },
            {
                $addFields: {
                    stageObjectId: {
                        $toObjectId: '$stage_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'stageObjectId',
                    foreignField: '_id',
                    as: 'stageDetails',
                },
            }, { $unwind: '$stageDetails' },
            {
                $addFields: {
                    projectObjectId: {
                        $toObjectId: '$stageDetails.project_id',
                    },
                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectObjectId',
                    foreignField: '_id',
                    as: 'projectDetails',
                },
            }, { $unwind: '$projectDetails' },
            {
                $match: {
                    'projectDetails.project_name': {
                        $regex: search, $options: 'i',
                    }, 'projectDetails.user_id': userId,
                },
            },
        ]);
        return {
            data: stage,
            totalPage: Math.ceil(totalDoc.length),
        };
    }
    async getWalletDataBasedMethodAndUser(method: string, userId: string):
        Promise<walletByUser[]> {
        const data = await paymentDB.aggregate([
            {
                $addFields: {
                    "stageObjectId": {
                        $toObjectId: "$stage_id"
                    }
                }
            }, {
                $lookup: {
                    from: "stages",
                    localField: "stageObjectId",
                    foreignField: "_id",
                    as: "stageDetails"
                }
            }, { $unwind: "$stageDetails" },
            {
                $addFields: {
                    "projectObjectId": {
                        $toObjectId: "$stageDetails.project_id"
                    }
                }
            }, {
                $lookup: {
                    from: "projects",
                    localField: "projectObjectId",
                    foreignField: "_id",
                    as: "projectDetails"
                }
            }, { $unwind: "$projectDetails" }, 
            {
                $match: {
                    "projectDetails.user_id": userId,
                    "paymentMethod": method,
                    "paymentStatus": "verified"
                }
            }
        ])
        console.log(data)
        return data
    }
    async getPaymentByProject(projectId: string): Promise<payByProject[]> {
        const data = await paymentDB.aggregate([
            {
                $addFields: {
                    "stageObjectId": {
                        $toObjectId: "$stage_id"
                    }
                }
            }, {
                $lookup: {
                    from: "stages",
                    localField: "stage_id",
                    foreignField: "_id",
                    as: "stageDetails"
                }
            }, { $unwind: "$stageDetails" },
            {
                $match: {
                    "stageDetails.project_id": projectId,
                    "paymentStatus": "verified",
                    "purpose": "stage payment"
                }
            }
        ])
        return data
    }
}