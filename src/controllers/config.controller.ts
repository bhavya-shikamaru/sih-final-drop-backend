import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '../services/config.service';
import { sendSuccess } from '../utils/response.utils';

// A basic async handler wrapper to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export class ConfigController {
  private configService: ConfigService;

  constructor() {
    this.configService = new ConfigService();
  }

  createThreshold = asyncHandler(async (req: Request, res: Response) => {
    const threshold = await this.configService.createThreshold(req.body);
    sendSuccess(res, threshold, 'Threshold created successfully.', 201);
  });

  updateThreshold = asyncHandler(async (req: Request, res: Response) => {
    const { factor } = req.params;
    const updatedThreshold = await this.configService.updateThresholdByFactor(factor, req.body);

    if (!updatedThreshold) {
      // In a real app, you'd throw a proper ApiError here to be caught by an error middleware
      return res.status(404).json({ success: false, error: { message: 'Threshold not found' } });
    }

    sendSuccess(res, updatedThreshold, 'Threshold updated successfully.');
  });

  getAllThresholds = asyncHandler(async (req: Request, res: Response) => {
    const thresholds = await this.configService.getAllThresholds();
    sendSuccess(res, thresholds, 'Thresholds retrieved successfully.');
  });

  resetAllThresholds = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.configService.resetAllThresholds();
    sendSuccess(res, result, 'All thresholds reset successfully.');
  });
}
