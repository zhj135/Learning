## webpack核心库Tapable介绍
### 什么是Tapable？

webpack是时下前端最流行的打包工具，而webpack的核心机制，插件（plugin）功能就是由短小精悍的Tapable模块提供的。
Tapable的功能和Node的EventEmitter模块有点类似，提供了事件机制。
Tapable在18年初经历了一次重构，配合webpack4，带来了新的插件编写体验，以uglifyjs-webpack-plugin的源码为例：

    if (compiler.hooks) {
      // Tapable 1.0插件实现
      const plugin = { name: 'UglifyJSPlugin' };

      compiler.hooks.compilation.tap(plugin, (compilation) => {
        if (this.options.sourceMap) {
          compilation.hooks.buildModule.tap(plugin, buildModuleFn);
        }

        compilation.hooks.optimizeChunkAssets.tapAsync(plugin, optimizeFn.bind(this, compilation));
      });
    } else {
      // Tapable 0.2旧版实现
      compiler.plugin('compilation', (compilation) => {
        if (this.options.sourceMap) {
          compilation.plugin('build-module', buildModuleFn);
        }

        compilation.plugin('optimize-chunk-assets', optimizeFn.bind(this, compilation));
      });
webpack4中的compiler使用hooks属性实现插件机制，为了兼容旧版本的webpack，加入了else部分的代码。


### Tapable使用实例

分析源码前，我们先来看看webpack是如何使用tapable的，不然一头钻进源码只会手足无措。既然是事件机制，就有添加事件监听器和触发事件的行为。
添加事件监听器：类似Node中EventEmitter模块的emitter.on，在webpack生态体系里，我们在编写插件的时候去添加监听，如上面代码中的compilation.hooks.buildModule.tap(plugin, buildModuleFn)，就给buildModule事件添加了监听。
触发事件：类似Node中EventEmitter模块的emitter.emit,webpack在构建时会在恰当的时候去触发这些事件，那上面代码添加的监听器在什么时候被触发呢，答案在webpack的complication实现中（https://github.com/webpack/webpack/blob/master/lib/Compilation.js）
在这里，我们只截取Tapable相关部分相关代码进行展示：
  
    // 引入Tapable
    const {
      Tapable,
      SyncHook,
    } = require("tapable");
    // 定义继承自Tapable的类，并添加hooks属性
    class Compilation extends Tapable {
      constructor(compiler) {
        super();
        this.hooks = {
          buildModule: new SyncHook(["module"])
        }
    }
    // 触发buildModule事件
    this.hooks.buildModule.call(module);

### Tapable源码分析

Tabable中有许多不同种类的事件类型（同步、异步、执行方式），我们以上面的SyncHook为例，看看是如何实现事件机制的：
    const Hook = require("./Hook");
    const HookCodeFactory = require("./HookCodeFactory");

    class SyncHookCodeFactory extends HookCodeFactory {
      content({ onError, onResult, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
          onError: (i, err) => onError(err),
          onDone,
          rethrowIfPossible
        });
      }
    }

    const factory = new SyncHookCodeFactory();

    class SyncHook extends Hook {
      tapAsync() {
        throw new Error("tapAsync is not supported on a SyncHook");
      }

      tapPromise() {
        throw new Error("tapPromise is not supported on a SyncHook");
      }

      compile(options) {
        factory.setup(this, options);
        return factory.create(options);
      }
    }

    module.exports = SyncHook;

可以看到，SyncHook继承自Hook类，并重写了其中的三个方法，其中tapSync和tapPromise函数很好理解，顾名思义，SyncHook是同步的钩子，所以不支持异步的调用方式，如果被异步调用了就会抛出错误。而compile函数并不被我们直接使用，我们直接使用的tap和call并不在，那很容易想到就是在Hook类中实现的，于是我们进入Hook类:

    class Hook {
      constructor(args) {
        if(!Array.isArray(args)) args = [];
        this._args = args;
        this.taps = [];
        this.interceptors = [];
        this.call = this._call = this._createCompileDelegate("call", "sync");
        this.promise = this._promise = this._createCompileDelegate("promise", "promise");
        this.callAsync = this._callAsync = this._createCompileDelegate("callAsync", "async");
        this._x = undefined;
      }
      _createCall(type) {
        return this.compile({
          taps: this.taps,
          interceptors: this.interceptors,
          args: this._args,
          type: type
        });
      }

      _createCompileDelegate(name, type) {
        const lazyCompileHook = (...args) => {
          this[name] = this._createCall(type);
          return this[name](...args);
        };
        return lazyCompileHook;
      }

      tap(options, fn) {
        options = Object.assign({ type: "sync", fn: fn }, options);
        this._insert(options);
      }
      _insert(item) {
        let i = this.taps.length;
        this.taps[i] = item;
      }
    }
精简了一些参数检查及其他的附加参数，专注于call和tap函数，首先看稍微简单的tap函数，精简之后tap的作用非常清晰，就是将新绑定的函数传入数组this.taps，熟悉事件机制的话很容易就会想到，call函数自然就是去执行this.taps数组里的函数了，没错，但是call的调用稍微复杂点，我们一步步来看。首先，在类的构造函数constructor中，call函数为this._createCompileDelegate("call", "sync")的执行结果，那我们看这个函数，_createCompileDelegate函数返回了lazyCompileHook，lazyCompileHook函数返回了this._createCall,this._createCall又返回了this.compile,compile函数是不是非常熟悉呢？没错，就是SyncHook里面重写的compile函数，到这一步已经有点绕了，我们先停下来回顾Hook和SyncHook，关键就是SyncHook重写的compile函数，各种不同种类的钩子函数，通过重写compile函数去实现他们自己特定的功能，而通用的部分则被封装到了父类Hook中。于是我们认识到，Tapable中十几个不同种类的钩子函数，其实就是在call函数，执行绑定函数的部分有所不同，其他都是一样的。继续回到SyncHook中的compile,compile只有两行，第一行执行的是初始化，第二行factory.create(options)才是关键，factory是继承自HookCodeFactory的类的一个实例，create在父类HookCodeFactory中，于是我们来到父类的源码里找到create函数，

    create(options) {
      return new Function(this.args(), "\"use strict\";\n" + this.header() + this.content({
        onError: err => `throw ${err};\n`,
        onResult: result => `return ${result};\n`,
        onDone: () => "",
        rethrowIfPossible: true
      }));
    }
这里有个new Function的用法，是平常接触的比较少的，mdn上搜索了一下，new Function的作用就是接受参数和字符串类型的函数体，返回一个函数，有点类似eval的作用，让我们通过改变字符串的方式去改变函数体的内容，精简之后，函数体的内容就是

    var _fn0 = _x[0];
    _fn0();
而_x[0]，就是我们在this.taps数组中添加的监听器，在compile第一行的初始化过程中实现了这一点

    setup(instance, options) {
      instance._x = options.taps.map(t => t.fn);
    }

真实的代码远比精简后的复杂，但是核心的机制是一样的，其他的都是锦上添花，了解了核心再去看其余的部分，也会更加的得心应手。

Tapable仓库地址：
https://github.com/webpack/tapable
mdn上new Function参考：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
