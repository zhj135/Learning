const Koa = require("koa");
const _ = require('koa-route');
const app = new Koa();

app.use(async function(ctx, next) {
    const start = new Date();
    console.log(ctx.status)
    // ctx.status = 404;
    await next();
    const ms = new Date() - start;
    ctx.set("X-Response-Time", `${ms}ms`)
})
const jueContent = (ctx) => {
    console.log(ctx.status)
    ctx.body = 'I am Jue';
}
app.use(_.get('/jue', jueContent))
// app.use(async function(ctx, next) {
//     ctx.body = 'yes'
// })
app.listen(3000)