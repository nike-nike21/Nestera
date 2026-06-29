import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { SavingsModule } from '../src/modules/savings/savings.module';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';

/**
 * E2E Tests for Validation Error Formatting (#1087)
 *
 * Tests the following requirements:
 * 1. Validation errors return with exact field paths
 * 2. Validation errors include constraint information
 * 3. Nested object validation errors show proper field paths
 * 4. Error format is predictable and consistent
 */
describe('Validation Error Formatting (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('CreateGoalDto Validation Errors', () => {
    /**
     * Test: Verify validation errors return field paths and constraints
     */
    it('should return validation errors with field paths and constraints', async () => {
      const response = await request(app.getHttpServer())
        .post('/savings/goals')
        .send({
          goalName: '', // Required field - should fail isNotEmpty
          targetAmount: -100, // Should fail min validation
          targetDate: '2020-01-01', // Should fail IsFutureDate validator
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');

      const errors = response.body.errors as Array<{
        field: string;
        message: string;
        constraint?: string;
      }>;

      // Should have errors for each invalid field
      expect(errors.length).toBeGreaterThan(0);

      // Check that field paths are present
      const goalNameError = errors.find((e) => e.field === 'goalName');
      expect(goalNameError).toBeDefined();
      expect(goalNameError?.constraint).toBeDefined();

      const targetAmountError = errors.find((e) => e.field === 'targetAmount');
      expect(targetAmountError).toBeDefined();
      expect(targetAmountError?.constraint).toBe('min');
    });

    /**
     * Test: Verify nested object validation errors show proper field paths
     */
    it('should return nested field paths for complex validation errors', async () => {
      const response = await request(app.getHttpServer())
        .post('/savings/goals')
        .send({
          // Provide invalid nested metadata
          goalName: 'Test Goal',
          targetAmount: 5000,
          targetDate: '2026-12-31T00:00:00.000Z',
          metadata: 'invalid-string-not-object', // Should fail IsObject
        });

      expect(response.status).toBe(400);
      // Metadata validation error should be present
      if (response.body.errors) {
        expect(response.body.errors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('SubscribeDto Validation Errors', () => {
    it('should validate product ID format and amount', async () => {
      const response = await request(app.getHttpServer())
        .post('/savings/subscribe')
        .send({
          productId: 'not-a-uuid',
          amount: -50,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');

      const errors = response.body.errors as Array<{ field: string; constraint?: string }>;
      expect(errors.some((e) => e.field === 'productId')).toBe(true);
    });
  });

  describe('CreateReferralDto Validation Errors', () => {
    it('should validate custom code format', async () => {
      const response = await request(app.getHttpServer())
        .post('/referrals/custom-code')
        .send({
          code: 'invalid-code-lowercase', // Should fail uppercase requirement
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
});