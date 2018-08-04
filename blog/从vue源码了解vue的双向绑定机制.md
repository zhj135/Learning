## 从vue源码了解vue的双向绑定机制

### vue的初始化

在构建基于vue的项目时，我们通过new Vue(param), 传入param参数来初始化vue,那么，这一步真正做了哪些事情呢？

通过对vue源码入口文件的分析，去除层层的封装，找到如下的代码：

    function Vue (options) {
      if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
      ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
      }
      this._init(options)
    }

    initMixin(Vue)
    stateMixin(Vue)
    eventsMixin(Vue)
    lifecycleMixin(Vue)
    renderMixin(Vue)

可以看到，函数Vue首先检查自己是否是通过new调用，然后进行初始化的过程，这里我们关心的是双向绑定的过程，所以我们找到初始化state的initState函数，在上面代码中的this._init(options)中被调用：

    Vue.prototype._init = function (options?: Object) {
      ...
      const vm: Component = this
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm)
      initProvide(vm) // resolve provide after data/props
      callHook(vm, 'created')
      ...
    }

vue使用了facebook出品的flow，flow的作用是进行静态类型的检测，并且更好的帮助我们理解源码，不了解flow没关系，当成普通js看就行。这里还可以看出初始化state的时间点是在生命周期函数beforeCreate和created之间。这里传入的vm是this的别名，防止在函数中丢失this。initState中初始化了props, methods, data等待, 为了更简便的理解，我们只关注data部分，继续进入initData:

    function initData (vm: Component) {
      let data = vm.$options.data
      ...
      proxy(vm, `_data`, key)
      ...
      observe(data, true /* asRootData */)
    }

  省略号的部分是错误的处理，例如data不能与methods和props重名，不能是vue的保留字符等等。proxy的函数的作用是代理，即利用Object.defineProperty将data中的每一个属性代理到对象的_data上,最后调用的observe函数是我们关注的重点，observe函数经过一系列情况判断之后，对我们在业务代码中传入的data对象调用了new Obverser函数，Obverser的构造函数里调用walk函数，来将对象的每一个属性转变为getter/setters：

      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
          const value = getter ? getter.call(obj) : val
          if (Dep.target) {
            dep.depend()
            if (childOb) {
              childOb.dep.depend()
              if (Array.isArray(value)) {
                dependArray(value)
              }
            }
          }
          return value
        },
        set: function reactiveSetter (newVal) {
          const value = getter ? getter.call(obj) : val
          /* eslint-disable no-self-compare */
          if (newVal === value || (newVal !== newVal && value !== value)) {
            return
          }
          /* eslint-enable no-self-compare */
          if (process.env.NODE_ENV !== 'production' && customSetter) {
            customSetter()
          }
          if (setter) {
            setter.call(obj, newVal)
          } else {
            val = newVal
          }
          childOb = !shallow && observe(newVal)
          dep.notify()
        }
      })
      

