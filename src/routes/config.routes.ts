import { Router } from 'express';
import { ConfigController } from '../controllers/config.controller';
import { requireAdmin } from '../middlewares/auth.middleware'; // Assuming this exists or will be created
import { validate } from '../middlewares/validation.middleware';
import { createThresholdSchema, updateThresholdSchema, getThresholdSchema } from '../validation/schemas/config.schema';


const router = Router();
const configController = new ConfigController();

// Define routes for User Story 1 (T008)
router.post(
  '/thresholds',
  requireAdmin,
  validate(createThresholdSchema.body), // Assuming validate expects just the body schema
  configController.createThreshold
);

router.put(
  '/thresholds/:factor',
  requireAdmin,
  validate(getThresholdSchema.params), // Validate params
  validate(updateThresholdSchema.body), // Validate body
  configController.updateThreshold
);

// Define routes for User Story 3 (T019)
router.get('/thresholds', requireAdmin, configController.getAllThresholds);
router.delete('/thresholds', requireAdmin, configController.resetAllThresholds);

export default router;
