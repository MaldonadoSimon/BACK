/**
 * Copyright 2020 Agilesoft (http://www.agilesoft.cl)
 *
 * Provider para obtencion de componentes visuales definidos en el framework Banmedica.
 */

import { Injectable } from '@nestjs/common';
import { AbstractVisualComponentProvider } from 'banmedica-main-libs/dist/providers/framework/visual-components.provider';
import { IFrameworkVisualComponent } from 'banmedica-main-libs/dist/providers/framework/types';
import * as env from '../../../core/environments';

const COMMON_MODULE = 'comun';
const IMAGE_TYPE = 'image';
const AVATAR_ISAPRE = 'avatar-generico';
const SECCION_AVATAR = 'avatar-generico';

@Injectable()
export class BanFrameworkVisualcomponents extends AbstractVisualComponentProvider {

    constructor() {
        super(env.environments.FRAMEWORK_UTIL, env.environments.TIMEOUT);
    }

    getDefaultAvatar = async (isapre: string): Promise<IFrameworkVisualComponent> => {
        return this.getVisualComponent(IMAGE_TYPE, COMMON_MODULE, isapre, SECCION_AVATAR, AVATAR_ISAPRE);
    }

}
