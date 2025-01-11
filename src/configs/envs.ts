const envs: { [key: string]: string } = {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BASE_URL: process.env.BASE_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    NODE_ENV: process.env.NODE_ENV as string
}

export default envs;




