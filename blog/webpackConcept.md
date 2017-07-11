# webpack文档学习总结

## 四个核心概念

### entry

入口文件


### output

打包后生成的出口文件

### module.loaders (module.rules)

处理css, jsx, typescript等

### plugins

webpack的基石，可处理压缩js，定义环境等任务

plugin中有compiler和compilation两个概念
compiler是webpack打包的环境，包括命令行的参数,配置文件，插件列表等
compilation是compiler的实例，若在开发环境中会经常更新。

自定义插件示例：

	const { exec } = require('shelljs');

	class UploadPlugin {
	  constructor(options) {
	    this.options = options;
	  }
	  apply(compiler) {
	    compiler.plugin('after-emit', (compilation, callback) => {
	      if (this.options.isBeta) {
	        exec('gulp upload-beta');
	      } else {
	        exec('gulp upload-release');
	      }
	      callback();
	    });
	  }
	}

	module.exports = UploadPlugin;

webpack配置文件中：

	new UploadPlugin({
      isBeta: process.env.BETA === 'true'
    }),

	