import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import logger from 'banmedica-libs-logger';


@ApiTags('Health')
@Controller('v1/health')
export class HealthController {

    /**
     * Servicio para informar que POD se encuentra vivo.
     */
    @Get()
    @ApiOperation({summary: 'Informa que POD se encuentra en ejecución.'})
    public async health() {
        logger.info('Este es un mensaje de información');
        logger.error('Este es un mensaje de error');
        logger.debug('Este es un mensaje de debug');
        logger.info('Version activa: 1.0.1')
        return 'ok';
    }
}
