import { sitemanagerDB } from '../../api/models/SitemanagerModel';
import { listingInput } from '../../application/Entities/common.entity';
import { addsitemanagerInput, editSitemanagerInput } from '../../application/Entities/sitemanager.entity';
import { updatePasswordInput } from '../../application/Entities/user.entity';
import { ISitemanagerRepository } from '../../domain/Entities/IRepository/ISitemanager';
import { ISitemanagerModelEntity } from '../../domain/Entities/modelEntities/sitemanager.entity';

export class SitemanagerRepository implements ISitemanagerRepository {

    // Fetch all site managers with pagination and search
    async getAllSitemanagers(input: listingInput): 
   Promise<{ getSiteData: ISitemanagerModelEntity[]; totalPage: number }> {
        const { page, search } = input;
        const skip = page * 5;
        const searchRegex = new RegExp(search, 'i');
        const list = await sitemanagerDB
            .find({ username: { $regex: searchRegex } })
            .skip(skip)
            .limit(5);
        const totalPage = (await sitemanagerDB.countDocuments({ username: { $regex: searchRegex } })) / 5;
        return {
            getSiteData: list,
            totalPage,
        };
    }

    // Find site manager by email
    async getSitemanagerByEmail(email: string): Promise<ISitemanagerModelEntity | null> {
        return await sitemanagerDB.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    }

    // Add a new site manager
    async createSitemanager(input: addsitemanagerInput): Promise<void> {
        const { username, email, password } = input;
        const newSitemanager = new sitemanagerDB({
            username,
            email,
            password,
        });
        await newSitemanager.save();
    }

    // Check if email already exists for edit (excluding current _id)
    async getSitemanagerForEdit(id: string, email: string): Promise<ISitemanagerModelEntity | null> {
        return await sitemanagerDB.findOne({
            _id: { $ne: id },
            email: { $regex: new RegExp(`^${email}$`, 'i') },
        });
    }

    // Update site manager details
    async updateSitemanagerDetails(input: editSitemanagerInput): Promise<void> {
        const { _id, username, email } = input;
        await sitemanagerDB.findByIdAndUpdate(_id, {
            username,
            email,
        });
    }

    // Delete a site manager by ID
    async removeSitemanagerById(id: string): Promise<void> {
        await sitemanagerDB.findByIdAndDelete(id);
    }

    // Generate a random password
    async generateRandomPassword(): Promise<string> {
        let result = '';
        const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()><?';
        for (let i = 0; i < 10; i++) {
            result += char[Math.floor(Math.random() * char.length)];
        }
        return result;
    }

    // Find site manager by ID
    async getSitemanagerById(id: string): Promise<ISitemanagerModelEntity | null> {
        return await sitemanagerDB.findById(id);
    }

    // Update site manager password
    async updateSitemanagerPassword(input: updatePasswordInput): Promise<void> {
        const { _id, password } = input;
        await sitemanagerDB.findByIdAndUpdate(_id, { password });
    }
}
