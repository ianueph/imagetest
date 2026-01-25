export const DATABASE_URL = 
    `postgresql://
    ${process.env.PG_USER}:
    ${process.env.PG_PW}@
    ${process.env.PG_HOST}:
    ${process.env.PG_PORT}/
    ${process.env.PG_DB}`