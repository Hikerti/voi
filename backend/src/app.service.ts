import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      name: 'Voitov Studio API',
      status: 'ok',
    };
  }
}
