import mongoose from 'mongoose';
export class connectMongo {
    private _databaseUrl: string;
    constructor() {
        if (!process.env.MONGO_URL) {
            throw new Error('mongodb url is not available');
        } else {
            this._databaseUrl = process.env.MONGO_URL;
        }
    }
    connectDb() {
        mongoose.connect(this._databaseUrl).then(() => console.log('db connected')).catch((err) => console.log(err));
    }
};