// promise.any 等待所有的 reject 结果才会请求结束
// 源码
/* 
MyPromise.any = function (promises) {
  return new Promise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length // 用于收集所有 reject
    let errs = [] // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if (len === 0) return reject(new AggregateError('All promises were rejected'))
    promises.forEach((promise) => {
      promise.then(
        (value) => {
          resolve(value)
        },
        (err) => {
          len--
          errs.push(err)
          if (len === 0) {
            reject(new AggregateError(errs))
          }
        }
      )
    })
  })
}
。。。 3.18 22:54
 */

// 实例
/* 
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(2)
  }, 300)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(3)
  }, 2000)
})
Promise.any([p1, p2, p3]).then(res => {
  console.log(res)  // 请求中有成功的请求 方法跟 race 类型 返回请求时间最短的一个 2
})
 */

let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(2)
  }, 300)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(3)
  }, 2000)
})
// 全部失败的情况下 会等待所有的请求结束后按照请求的顺序去打印值，跟请求的时间快慢无关
Promise.any([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err);
})

