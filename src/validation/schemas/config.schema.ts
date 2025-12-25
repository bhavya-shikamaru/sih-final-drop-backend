import { z } from 'zod';

// Zod schema for the operator enum
const operatorSchema = z.enum(['LT', 'GT', 'EQ']);

// Schema for the request body when creating a new RiskThreshold
export const createThresholdBodySchema = z.object({
  factor: z.string({
    required_error: 'Factor is required',
  }).min(3, 'Factor must be at least 3 characters long'),
  
  operator: operatorSchema,
  
  value: z.number({
    required_error: 'Value is required',
  }),

  description: z.string().optional(),
});

// Schema for the URL parameters when dealing with a single factor
export const thresholdParamsSchema = z.object({
  factor: z.string({
      required_error: 'Factor parameter is required',
  }),
});

// Schema for the request body when updating an existing RiskThreshold
export const updateThresholdBodySchema = z.object({
  operator: operatorSchema.optional(),
  value: z.number().optional(),
  description: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field (operator, value, or description) must be provided for an update.",
});