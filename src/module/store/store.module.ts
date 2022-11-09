import { Module, DynamicModule } from "@nestjs/common";
import { PartialType } from "@nestjs/swagger";
import { StoreService } from "./store.service";


export interface RootStoreValue {
    path: string,
}

export interface FeatureStoreValue {
    fileName: string;
}

export type ConfigStore = Partial<RootStoreValue & FeatureStoreValue>;
let configStore: ConfigStore;
export const DEFAULT_ROOT_STORE = 'default path';
export const DEFAULT_FEATURE_STORE = 'default filename';

@Module({})
export class StoreModule {
    static register(config: ConfigStore): DynamicModule {
        const configStore = this.setConfigStore(config)
        return {
            module: StoreModule,
            providers: [
                StoreService,
                {
                    provide: 'CONFIG_KEY',
                    useValue: configStore
                },
            ],
            exports: [StoreService],
        }
    }

    static forRoot(config: ConfigStore ): DynamicModule {
        const configStore = this.setConfigStore(config)
        return {
            module: StoreModule,
            providers: [
                StoreService,
                {
                    provide: 'CONFIG_KEY',
                    useValue: configStore
                },
            ],
            exports: [StoreService],
        }
    }

    private static setConfigStore(field: ConfigStore) {
        configStore = {
            path: DEFAULT_ROOT_STORE,
            fileName: DEFAULT_FEATURE_STORE,
        }

        return {...configStore, ...field}
    }
}