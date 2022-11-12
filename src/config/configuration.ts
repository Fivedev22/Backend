export default () => ({
    port: Number(process.env.PORT) || 3000,
    database: {
        username: String(process.env.DB_USERNAME),
        password: String(process.env.DB_PASSWORD),
        database: String(process.env.DB_DATABASE),
    }
});