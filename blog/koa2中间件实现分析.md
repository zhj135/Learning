###什么是Koa?
>Koa是一个由Express团队重新设计的一个web框架，志在为web应用程序及接口提供更轻量级，更富有表现力及健壮性更强的基础功能。Koa通过generators让你抛弃回调函数，并且增强了错误处理机制。Koa内部并不绑定任何的中间件，而是提供了一系列优雅的方法来让你更快速愉悦的开发服务端代码。
--- 引用自koa官网（http://koajs.com/#introduction）

###中间件机制
Koa能够受到广大开发者的欢迎，中间件机制功不可没，下面还是以官网的一个例子来说明中间件机制：

    const Koa = require('koa');
    const app = new Koa();

    // x-response-time

    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
    });

    // logger

    app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}`);
    });

    // response

    app.use(async ctx => {
      ctx.body = 'Hello World';
    });

    app.listen(3000);
请求开始时，先经过x-response-time和logging中间件，当中间件触发next()方法时，当前中间件函数挂起，把控制权交给下一个定义的中间件，当下游没有更多的中间件需要处理时，中间件会依次往上游恢复执行。

###源码实现
首先，进入koa源码中的lib/application.js文件，可以看到关于上面代码中app.listen的实现，koa调用http模块的createServer来完成此api，并传入自定义的回调方法：

    listen(...args) {
      debug('listen');
      const server = http.createServer(this.callback());
      return server.listen(...args);
    }
此时目光移向this.callback函数，此函数根据req和res创建了koa中频繁使用的context，并且实现了中间件的机制：

    callback() {
      const fn = compose(this.middleware);

      if (!this.listeners('error').length) this.on('error', this.onerror);

      const handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
      };

      return handleRequest;
    }
可以看到，callback函数中对参数做了一层转化，并继续传入this.handleRequest函数中，转化后的参数分别是ctx和fn，ctx是由req,res和this.createContext创建的，不是本文涉及的范围，按下不表，关键的是由this.middleware和compose函数创建的fn函数，this.middleware即是中间件数组，每当业务代码中注册了一个中间件（调用app.use函数），就会把这个中间件推入middleware这个数组。而compose函数，实现在koa-compose这个依赖库中，返回了一个匿名函数，去除边界条件判断，函数如下：

    function (context, next) {
      let index = -1
      return dispatch(0)
      function dispatch (i) {
        index = i
        let fn = middleware[i]
        try {
          return Promise.resolve(fn(context, function next () {
            return dispatch(i + 1)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
我们在中间件函数中调用的next，实际上调用的就是dispatch(i+1)，也就是下一个中间件函数，这也就是解释了为什么执行时控制权会交给下一个中间件函数，相当于把后面的中间件函数插入next执行的位置。

###总结
以上就是koa2对中间件的处理过程，相对比于koa1.X中借助co模块的generators, yield实现，无疑简洁且清晰了不少。
