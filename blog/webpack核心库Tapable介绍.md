## webpack核心库Tapable介绍
### 什么是Tapable？

webpack是时下前端最流行的打包工具，而webpack的核心机制，插件（plugin）功能就是由短小精悍的Tapable模块提供的。
Tapable的功能和Node的EventEmitter模块有点类似，提供了事件机制。
Tapable在18年初经历了一次重构，配合webpack4，带来了新的插件编写体验，以uglifyjs-webpack-plugin的源码为例：

    if (compiler.hooks) {
      const plugin = { name: 'UglifyJSPlugin' };

      compiler.hooks.compilation.tap(plugin, (compilation) => {
        if (this.options.sourceMap) {
          compilation.hooks.buildModule.tap(plugin, buildModuleFn);
        }

        compilation.hooks.optimizeChunkAssets.tapAsync(plugin, optimizeFn.bind(this, compilation));
      });
    } else {
      compiler.plugin('compilation', (compilation) => {
        if (this.options.sourceMap) {
          compilation.plugin('build-module', buildModuleFn);
        }

        compilation.plugin('optimize-chunk-assets', optimizeFn.bind(this, compilation));
      });
webpack4中的compiler使用hooks属性实现插件机制，为了兼容旧版本的webpack，加入了else部分的代码。


### Tapable使用实例

分析源码前，我们先来看看webpack是如何使用tapable的，不然一头钻进源码只会手足无措。既然是事件机制，就有添加事件监听器和触发事件的行为.
添加事件监听器：类似Node中EventEmitter模块的emitter.on，在webpack生态体系里，我们在编写插件的时候去添加监听，如上面代码中的compilation.hooks.buildModule.tap(plugin, buildModuleFn)，就给buildModule事件添加了监听。
触发事件：类似Node中EventEmitter模块的emitter.emit,webpack在构建时会在恰当的时候去触发这些事件，那上面代码添加的监听器在什么时候被触发呢，答案在webpack的complication实现中（https://github.com/webpack/webpack/blob/master/lib/Compilation.js）
在这里，我们只截取Tapable相关部分相关代码进行介绍：
  
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
