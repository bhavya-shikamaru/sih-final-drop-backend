import { ConfigRepository } from '../repositories/config.repository';
import { IRiskThreshold } from '../models/config/Threshold.model';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private configRepository: ConfigRepository;
  private auditLogStream: fs.WriteStream;

  constructor() {
    this.configRepository = new ConfigRepository();
    const logPath = path.join(__dirname, '../../../logs/audit.log');
    // Ensure logs directory exists
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    this.auditLogStream = fs.createWriteStream(logPath, { flags: 'a' });
  }

  private logAudit(action: string, user: string, details: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      action,
      user, // Placeholder for now
      details,
    };
    this.auditLogStream.write(JSON.stringify(logEntry) + '\n');
  }

  /**
   * Creates a new risk threshold.
   * @param thresholdData Data for the new threshold.
   * @returns The created risk threshold.
   */
  async createThreshold(thresholdData: Omit<IRiskThreshold, 'createdAt' | 'updatedAt' | 'id'>): Promise<IRiskThreshold> {
    const newThreshold = await this.configRepository.create(thresholdData);
    
    this.logAudit('CREATE_THRESHOLD', 'system', { newValue: newThreshold });

    return newThreshold;
  }

  /**
   * Updates an existing risk threshold by its factor.
   * @param factor The factor of the threshold to update.
   * @param updateData The data to update.
   * @returns The updated risk threshold, or null if not found.
   */
  async updateThresholdByFactor(factor: string, updateData: Partial<Omit<IRiskThreshold, 'factor' | 'createdAt' | 'updatedAt' | 'id'>>): Promise<IRiskThreshold | null> {
    const oldThreshold = await this.configRepository.findByFactor(factor);

    if (!oldThreshold) {
      return null;
    }

    const updatedThreshold = await this.configRepository.findByFactorAndUpdate(factor, updateData);

    this.logAudit('UPDATE_THRESHOLD', 'system', { 
      factor,
      oldValue: oldThreshold.toObject(),
      newValue: updatedThreshold?.toObject() 
    });
    
    return updatedThreshold;
  }

  /**
   * Retrieves a single risk threshold by its factor.
   * @param factor The factor of the threshold to retrieve.
   * @returns The risk threshold document, or null if not found.
   */
  async getThresholdByFactor(factor: string): Promise<IRiskThreshold | null> {
    return this.configRepository.findByFactor(factor);
  }
}

