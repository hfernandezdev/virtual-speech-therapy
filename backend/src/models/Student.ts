import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  therapistId: Schema.Types.ObjectId;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IStudent>('Student', StudentSchema);
