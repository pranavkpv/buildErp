import { JwtService } from '../../application/services/JwtService';
import { ApprovePurchaseUseCase } from '../../application/UseCase/Purchase/ApprovePurchase';
import { DeletePurchaseUseCase } from '../../application/UseCase/Purchase/DeletePurchase';
import { GetLastInvoiceUsecase } from '../../application/UseCase/Purchase/GetLastInvoice';
import { GetPurchaseUseCase } from '../../application/UseCase/Purchase/Getpurchase';
import { SavePurchaseUseCase } from '../../application/UseCase/Purchase/SavePurchase';
import { UpdatePurchaseUseCase } from '../../application/UseCase/Purchase/UpdatePurchase';
import { ProjectStockRepository } from '../../infrastructure/Repositories/ProjectStock';
import { PurchaseRepository } from '../../infrastructure/Repositories/Purchase';
import { PurchaseController } from '../controllers/Purchase';

const jwtService = new JwtService();
const purchaseRepository = new PurchaseRepository();
const projectStockRepository = new ProjectStockRepository();

const getPurchaseUsecase = new GetPurchaseUseCase(purchaseRepository);
const savePurchaseUseCase = new SavePurchaseUseCase(purchaseRepository);
const updatePurchaseUseCase = new UpdatePurchaseUseCase(purchaseRepository);
const deletePurchaseUseCase = new DeletePurchaseUseCase(purchaseRepository);
const approvePurchaseUseCase = new ApprovePurchaseUseCase(purchaseRepository,projectStockRepository);
const getLastInvoiceUseCase = new GetLastInvoiceUsecase(purchaseRepository);

export const injectedPurchaseController = new PurchaseController(getPurchaseUsecase,savePurchaseUseCase,jwtService,updatePurchaseUseCase,deletePurchaseUseCase,
    approvePurchaseUseCase,getLastInvoiceUseCase);