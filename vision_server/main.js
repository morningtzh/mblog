const fs = require("fs");
const path = require("path");

const Koa = require("koa");
const router = require("koa-router")();
const logger = require("koa-logger");
const KoaStatic = require("koa-static");
const session = require("koa-session");
const koaBody = require("koa-body");
const bodyParser = require("koa-bodyparser");
const AipFaceClient = require("baidu-aip-sdk").face;
const _ = require("lodash");

const staticPath = "./dist";

const app = new Koa();

const APP_ID = "10427190";
const API_KEY = "tUQA8CrokE9ZCSCKIqtvcZ9U";
const SECRET_KEY = "cPzA7CA5cpDzpIg9I6ybTR9GFhRKokAg";

const BaiduFaceClient = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

app
    .use(logger())
    .use(koaBody({
        multipart: true,
        "formLimit":"5mb",
        "jsonLimit":"5mb",
        "textLimit":"5mb"
    }))
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(KoaStatic(staticPath));

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

const DB_CUSTOMER_GET_ALL = "select * from Customer where Username=? order by StartTime DESC";
const moment = require("moment");

router.post("/face", async (ctx, next) => new Promise((resolve, reject) => {

    console.log(ctx.request.body);

    let image1 = fs.readFileSync('m1.jpg');
    let base64Img1 = new Buffer(image1).toString('base64');

    BaiduFaceClient.match([base64Img1, ctx.request.body.face]).then(function(result) {
        console.log(JSON.stringify(result));

        if (0 == result.result_num)
        {
            ctx.response.body = {errno: 100, desc: "无人脸"}
        }
        else if (result.result[0].score > 90)
        {
            ctx.response.body = {errno: 0, desc: "识别成功,已登录", score:result.result[0].score}
        }
        else {
            ctx.response.body = {errno: -1, desc: "非管理员,无法登陆", score:result.result[0].score}
        }

        resolve();
    });

}));


app.listen(3000);
console.log("app started at port 80...");
