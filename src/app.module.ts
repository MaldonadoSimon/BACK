import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {createClientSession} from 'banmedica-main-libs/dist/jwt/sessiontoken.middleware';
import {traceabilityInicializator} from 'banmedica-main-libs/dist/traceability/traceability.middleware';
import {ChannelStorageMiddleware} from 'banmedica-main-libs/dist/temporal-storage/channel-temporal-storage.middleware';
import {AFILIADO, AGENCY_ID, CHANNEL_ID, environments, MODULE_ID} from './core/environments';

import {SessionStorageProvider} from 'banmedica-main-libs/dist/providers/framework/session-storage.provider';
import {createParameterManager} from 'banmedica-main-libs/dist/parameter/module-parameter.util';
import {parameters} from './core/parameters';
import {TemporalStorageMiddleware} from 'banmedica-main-libs/dist/temporal-storage/temporal-storage.middleware';
import {BanFrameworkVisualcomponents} from './shared/providers/framework/ban-framework-visualcomponents.provider';
import {HealthModule} from './modules/health/health.module';

@Module({
    imports: [HealthModule],
    controllers: [
    ],
    providers: [
        BanFrameworkVisualcomponents,
    ],
})
export class AppModule implements NestModule {
    /**
     * Se inicializan los parametros del sistema
     */
    async configure(consumer: MiddlewareConsumer) {
        /** Se obtienen los valores desde las variables de entorno del proyecto de despliegue **/
        await createParameterManager();
        /** Se inicializa middleware de sesion de usuarios */
        const sessionStorageMid = new ChannelStorageMiddleware(
            new SessionStorageProvider(environments.URL_FRAMEWORK, environments.TIMEOUT),
        );
        const tempStorageMidd = new TemporalStorageMiddleware(
            new SessionStorageProvider(environments.URL_FRAMEWORK, environments.TIMEOUT),
        );

        consumer.apply(
            sessionStorageMid.getAfiliadoStorage(),
            tempStorageMidd.getStorage(AFILIADO),
            createClientSession(),
            traceabilityInicializator(MODULE_ID, CHANNEL_ID, AGENCY_ID, environments.TRACE_API),
        )
            /**
             * Se puede definir una ruta global {path: '*', method: RequestMethod.ALL} o especificar cada controlador.
             */
            .exclude({path: '/api/health', method: RequestMethod.GET});
    }
}
