## vue依赖收集及触发

### vue的初始化

在构建基于vue的项目时，我们通过new Vue(param), 传入param参数来初始化vue,那么，这一步真正做了哪些事情呢？

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

可以看到，函数Vue首先检查自己是否是通过new调用，然后进行初始化的过程，这里我们关心的是双向绑定的过程，所以我们找到初始化state的initState函数，在上面代码中的this._init(options)中被调用：

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

vue使用了facebook出品的flow，flow的作用是进行静态类型的检测，并且更好的帮助我们理解源码，不了解flow没关系，当成普通js看就行。这里还可以看出初始化state的时间点是在生命周期函数beforeCreate和created之间。这里传入的vm是this的别名，防止在函数中丢失this。initState中初始化了props, methods, data等待, 为了更简便的理解，我们只关注data部分，继续进入initData:

    function initData (vm: Component) {
      let data = vm.$options.data
      ...
      proxy(vm, `_data`, key)
      ...
      observe(data, true /* asRootData */)
    }

省略号的部分是错误的处理，例如data不能与methods和props重名，不能是vue的保留字符等等。proxy的函数的作用是代理，即利用Object.defineProperty将data中的每一个属性代理到对象的_data上,最后调用的observe函数是我们关注的重点，observe函数经过一系列情况判断之后，对我们在业务代码中传入的data对象调用了new Obverser函数，Obverser的构造函数里调用walk函数，来将对象的每一个属性转变为getter/setters：

      Object.defineProperty(obj, key, {
        ...
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
          if (newVal === value || (newVal !== newVal && value !== value)) {
            return
          }
          ...
          dep.notify()
        }
      })
      
这里分别在数据的获取和设置中调用了dep.depend(), dep.notify(),dep是class Dep的实例,我们找到类Dep的定义部分：

    export default class Dep {
      static target: ?Watcher;
      subs: Array<Watcher>;
      constructor () {
        this.subs = []
      }
      ...
      depend () {
        if (Dep.target) {
          Dep.target.addDep(this)
        }
      }
      notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
          subs[i].update()
        }
      }
    }

    Dep.target = null
    const targetStack = []

    export function pushTarget (_target: ?Watcher) {
      if (Dep.target) targetStack.push(Dep.target)
      Dep.target = _target
    }

    export function popTarget () {
      Dep.target = targetStack.pop()
    }

depend函数调用了Dep.target的相关函数，那Dep.target是什么呢，文章最开始提到的vue初始化中的_init函数中有调用$mount函数，这个函数中有代码：

    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate')
        }
      }
    }, true /* isRenderWatcher */)

在Watcher的构造函数中有调用pushTarget(this)，所以Dep.target这个静态属性其实就是class Watch的实例，于是我们就可以找到get时添加依赖，depend()中addDep的实现：

    addDep (dep: Dep) {
      const id = dep.id
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id)
        this.newDeps.push(dep)
        if (!this.depIds.has(id)) {
          dep.addSub(this)
        }
      }
    }

这里对添加的依赖做了去重处理，防止重复添加依赖。那么这个依赖的作用是什么呢？是去更新DOM的过程，DOM的更新过程是一个很大的话题，我们暂且不深入研究，再来看set函数触发依赖, notify()中update函数，update调用了queueWatcher函数，queueWatcher中有这么一行：nextTick(flushSchedulerQueue)，这里的nextTick和我们平常在业务代码中使用的$nextTick是同一个函数，作用就是让DOM更新延迟进行，对数据进行缓冲，防止重复的大批量的DOM更新，React中的DOM更新也是类似的策略。改变状态值和DOM更新并不是同步的操作。回到flushSchedulerQueue，这个函数对缓存的数组每一项执行run函数，run调用了getAndInvoke，getAndInvoke中调用了get, get中调用了new Watcher时传入的updateComponent,顾名思义，这个函数的作用就是去更新DOM。

以上就是vue中依赖收集及触发的一个概览，阅读源码时先要找准代码的主体思路，不要太纠结每一句代码，每一个函数的具体实现，不然会迷失在细节中，就像画一棵树一样，现有树的躯干，树枝，才有一片片的树叶。这篇文章参考了HcySunYang的Vue技术内幕（http://hcysun.me/vue-design/art) ,但是建议大家不要一开始就看别人源码分析的文章，就像做题一样，总是不经过太多思考直接看答案总是不好的。










