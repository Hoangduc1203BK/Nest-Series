import { Inject, Injectable } from '@nestjs/common';
import { ConfigStore } from './store.module';
@Injectable()
export class StoreService {
    constructor(
        @Inject('CONFIG_KEY') private readonly config: ConfigStore,
    ) {}

    async save() {
        console.log('Config:::',this.config);
        return true;
    }
}