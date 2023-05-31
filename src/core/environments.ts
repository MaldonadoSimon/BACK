/**
 * Copyright 2020 Agilesoft (http://www.agilesoft.cl)
 *
 * Variables de entorno que requiere el sistema
 */

export const MODULE_ID = 'PB'; // NOMBE DEL MUDOLO DEFINIDO EN FRAMEWORK
export const COMMON_MODULE = 'comun';
export const CHANNEL_ID = 'C_0000WEB';
export const AGENCY_ID = 'web001';
export const AFILIADO = 'Afiliado';

export const environments = {
    LOG_LEVEL: process.env.LOG_LEVEL,
    PORT: process.env.PORT || 3000,
    TIMEOUT: Number(process.env.TIMEOUT) || 150000,
    FRAMEWORK_UTIL: process.env.FRAMEWORK_UTIL,
    URL_FRAMEWORK: process.env.URL_FRAMEWORK,
    TRACE_API: process.env.TRACE_API,
    parameter: {
        chacheMinutes: Number(process.env.PARAMETER_CACHE_MINUTES) || 5,
        secretKey: process.env.PARAMETER_MODULE_SECRET,
        commonSecretKey: process.env.PARAMETER_COMMON_SECRET,
    },
};
