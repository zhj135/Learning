初次渲染时：

constructor()
componentWillMount()
render()
componentDidMount()

重绘时：

componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()

移除时：

componentWillUnMount()

===========================

componentWillReceiveProps(nextProps)
当已渲染组件接受到新的prop时调用,若需要在接受到新的props时设置state可调用
使用时需比较this.props和nextProps不一样时才执行操作，因为React可能会在props没有更新时调用这个函数

shouldComponentUpdate(nextProps,nextState)
