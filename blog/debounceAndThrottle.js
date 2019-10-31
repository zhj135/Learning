// 节流(throttle)与防抖(debounce)

// 节流场景：js中的scroll，resize等事件会在短时间内频繁触发，所以需要控制触发频率，减少js开销
// 创建一个节流函数，预定时间内（wait）只执行一次目标函数（func）
function throttle(func, wait = 1000) {
  let timerId
  function invokeFunc(...args) {
    if (timerId) return
    timerId = setTimeout(() => {
      timerId = false
    }, wait);
    func(args)
  }
  return invokeFunc
}

// 防抖场景：如搜索框输入，触发关键词联想列表
// 创建一个防抖函数，预定时间内(wait)的最后一次函数得到执行
function debounce(func, wait) {
  let timerId
  function invokeFunc(...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    const context = this
    timerId = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
  return invokeFunc
}

// 测试函数
function test() {
  console.log('invoke func')
}
// 节流测试
// const throttleTest = throttle(test, 1000)
// setInterval(() => {
//   throttleTest()
// }, 50);

// 防抖测试
const debounceTest = debounce(test, 1000)
let i = 1
const intervalTag = setInterval(() => {
  debounceTest()
  i += 1
  if (i === 20) clearInterval(intervalTag)
}, 50);