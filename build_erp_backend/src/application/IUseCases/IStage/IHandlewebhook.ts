import { commonOutput } from '../../dto/common';

export interface IHandleWebhookUseCase {
  execute(payload: Buffer, signature: string, endpointSecret: string): Promise<commonOutput>;
}