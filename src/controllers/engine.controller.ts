import { Request, Response } from 'express';
import { Policy } from '../models/Policy';
import { evaluatePolicyContract } from '../services/evaluationEngine';

export const evaluateContract = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const policy = await Policy.findById(id);

    if (!policy) {
      return res.status(404).json({ error: "Policy contract not found." });
    }

    if (policy.status !== 'active') {
      return res.status(400).json({ error: "Policy has already been evaluated and settled." });
    }

    const resolution = await evaluatePolicyContract(policy);
    policy.status = resolution === 'TRIGGERED' ? 'triggered' : 'expired';
    await policy.save();

    if (resolution === 'TRIGGERED') {
      console.log(`💸 Instant Payout triggered for Amount $${policy.payout_amount}`);
    }

    res.status(200).json({
      policy_id: policy._id,
      resolution: resolution
    });
  } catch (error) {
    res.status(500).json({ error: "Evaluation engine failure." });
  }
};
