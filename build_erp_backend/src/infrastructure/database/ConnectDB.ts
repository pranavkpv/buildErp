import mongoose from "mongoose";
export class connectMongo {
  private databaseUrl: string
  constructor() {
    if (!process.env.MONGO_URL) {
      throw new Error('mongodb url is not available')
    } else {
      this.databaseUrl = process.env.MONGO_URL
    }
  }
  connectDb() {
    mongoose.connect(this.databaseUrl).then(() => console.log('db connected')).catch((err) => console.log(err))
  }
};