// promise.race 是只要有一个请求成功或失败了就会返回
// 源码
/* 
Promise.race = function (args) {
  // 使用 for 循环遍历请求，并且查看他们的状态，成功或失败都返回
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject)
    }
  })
} 
*/

// 创建一个 promise 实例，使用 fetch 对请求做超时处理
// new 一个新请求 在五秒后提示超时

const p = Promise.race([
  // fetch('/resource-that-may-take-a-while'), 这个请求可以在控制台运行 node不行
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 500)
  }),
])
//  使用这个实例
p.then(console.log).catch(console.error)
//  看不懂.............浏览器可以正常请求数据 node不行 3.18 22:47 注释 fetch 语句后成功打印超时提示

/* let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(1)
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
  }, 100)
})
Promise.race([p3, p1, p2]).then(res => {
  console.log(res) // rece 不管成功或者失败 谁先请求成功就打印谁
}, err => {
  console.log(err);
})
 */
