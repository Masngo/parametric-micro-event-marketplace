import { Policy, IPolicy } from '../models/Policy';

export const evaluatePolicyContract = async (policy: IPolicy): Promise<'TRIGGERED' | 'EXPIRED'> => {
  // Core State Machine Evaluation Rules
  // Example logic: if threshold is met and telemetry checks out clear
  if (policy.security_telemetry.is_gps_spoofed || policy.fraud_score > 70) {
    return 'EXPIRED'; // Fraud/telemetry failure drops contract eligibility
  }
  
  if (policy.event_parameters.threshold_value >= 30) {
    return 'TRIGGERED'; 
  }
  
  return 'EXPIRED';
};
