import { Schema, model, Document } from 'mongoose';

export interface IPolicy extends Document {
  user_id: string;
  category: string;
  premium_amount: number;
  payout_amount: number;
  status: 'active' | 'triggered' | 'expired';
  event_parameters: {
    threshold_value: number;
  };
  security_telemetry: {
    is_gps_spoofed: boolean;
    vpn_detected: boolean;
  };
  fraud_score: number;
}

const PolicySchema = new Schema<IPolicy>({
  user_id: { type: String, required: true },
  category: { type: String, required: true },
  premium_amount: { type: Number, required: true },
  payout_amount: { type: Number, required: true },
  status: { type: String, enum: ['active', 'triggered', 'expired'], default: 'active' },
  event_parameters: {
    threshold_value: { type: Number, required: true }
  },
  security_telemetry: {
    is_gps_spoofed: { type: Boolean, default: false },
    vpn_detected: { type: Boolean, default: false }
  },
  fraud_score: { type: Number, default: 0 }
}, { timestamps: true });

export const Policy = model<IPolicy>('Policy', PolicySchema);
