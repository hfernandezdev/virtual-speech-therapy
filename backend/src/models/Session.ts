import { Schema, model, Document } from 'mongoose';

export interface ISession extends Document {
  studentId: Schema.Types.ObjectId;
  therapistId: Schema.Types.ObjectId;
  date: Date;
  correctAnswers: number;
  totalAnswers: number;
  percentage: number;
  notes: string;
  gameData: any;
}

const SessionSchema = new Schema<ISession>({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  correctAnswers: { type: Number, default: 0 },
  totalAnswers: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  gameData: { type: Schema.Types.Mixed, default: {} }
});

SessionSchema.pre('save', function(next) {
  this.percentage = this.totalAnswers > 0 ? (this.correctAnswers / this.totalAnswers) * 100 : 0;
  next();
});

export default model<ISession>('Session', SessionSchema);
