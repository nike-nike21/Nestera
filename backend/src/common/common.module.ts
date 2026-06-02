import { Global, Module } from '@nestjs/common';
import { PiiEncryptionService } from './services/pii-encryption.service';
import { RateLimitMonitorService } from './services/rate-limit-monitor.service';
import { SecretsManagerService } from './services/secrets-manager.service';

@Global()
@Module({
  providers: [RateLimitMonitorService, PiiEncryptionService, SecretsManagerService],
  exports: [RateLimitMonitorService, PiiEncryptionService, SecretsManagerService],
})
export class CommonModule {}
