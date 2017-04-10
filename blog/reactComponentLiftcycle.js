// 初次渲染时：

constructor()
componentWillMount()
render()
componentDidMount()

// 重绘时：

componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()

// 移除时：

componentWillUnMount()

===========================

componentWillReceiveProps(nextProps)
// 当已渲染组件接受到新的prop时调用,若需要在接受到新的props时设置state可调用
// 使用时需比较this.props和nextProps不一样时才执行操作，因为React可能会在props没有更新时调用这个函数

shouldComponentUpdate(nextProps,nextState)
// React组件的默认行为是在每一次state更新时都会重绘组件，这在大多数情况下是必要的，但是可以采用自定义比较
// 更新前后state和props来return false 的方式去阻止这个更新，更好的方式是继承React.PureComponent来帮助
// 比较state和props，继承PureComponent的对象会继承shadowCompare函数隐式比较state和props，与当前值不同时才触发更新
