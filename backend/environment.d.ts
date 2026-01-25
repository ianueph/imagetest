declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV : string,
            PG_HOST : string,
            PG_USER : string,
            PG_PW : string,
            PG_PORT : number,
            PG_DB : string
        }
    }
}

export {}