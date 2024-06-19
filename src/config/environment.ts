export default () =>({
    port:process.env.PORT,
    mongodb:process.env.MONGO_URI,
    token_Secret:process.env.TOKEN_SESION,
    token_expire:process.env.TOKEN_EXPIRE
})