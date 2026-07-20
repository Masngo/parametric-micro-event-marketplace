import { Request, Response } from 'express';
import { Policy } from '../models/Policy';

export const purchasePolicy = async (req: Request, res: Response) => {
  try {
    const { user_id, category, premium_amount, payout_amount, event_parameters, security_telemetry } = req.body;
    
    // Simple dynamic baseline fraud heuristic
    const fraud_score = security_telemetry?.vpn_detected ? 50 : 10;

    const newPolicy = new Policy({
      user_id,
      category,
      premium_amount,
      payout_amount,
      event_parameters,
      security_telemetry,
      fraud_score,
      status: 'active'
    });

    await newPolicy.save();

    res.status(201).json({
      message: "Policy created successfully.",
      policy_id: newPolicy._id,
      fraud_score: newPolicy.fraud_score
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create policy." });
  }
};
