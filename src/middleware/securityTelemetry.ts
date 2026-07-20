import { Request, Response, NextFunction } from 'express';

export const filterTelemetry = (req: Request, res: Response, next: NextFunction) => {
  // Ingestion device footprint evaluation stub
  next();
};
