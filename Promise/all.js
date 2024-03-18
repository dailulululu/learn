// promise.all 在所有请求都成功或者失败的情况使用

// promise 的源码
/* 
function myPromiseall(promises) {
  return new Promise(function (reslove, reject) {
    // 检查 promise 是否是一个数据，不是就抛出参数必须是数据错误
    if (!Array.isArray(promises)) {
      throw new TypeError('argument must be a array')
    }
    // 初始化变量
    var count = 0 // 定义 promise 数组中的参数
    var length = promises.length // 存储 promise 数组变化的长度
    var result = [] // 定义一个新数组 放置 promise 数组对象
    // 遍历 promise 数组
    for (let i = 0; i < length; i++) {
      // 请求成功对 promise 的数组进行操作
      Promise.resolve(promises[i]).then(
        (val) => {
          count += 1
          result[i] = val
          // count 的长度等于 length 就返回外部的 promise resolve 方法
          // result 是解决值？请求成功的值？
          // 失败就返回 reject 方法 err 失败参数
          if (count === length) {
            return resolve(result)
          }
        },
        (err) => {
          return reject(err)
        }
      )
    }
  })
} 
*/

// promise.all 请求全部成功的例子
/* 
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 3000)
})

// all 是等待所有的请求完成后才会进行打印的操作
// 3 1 2
Promise.all([p3, p1, p2]).then((res) => {
  console.log(res) 
})
 */

let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(2)
  }, 3000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      reject(3)
  }, 10000)
})
// promise 如果不是全部成功的状态 打印结果 是第一个 reject 的实例，也就是 2
Promise.all([p3, p1, p2]).then(res => {
  console.log(res)
}, err => {
  console.log(err);
})

