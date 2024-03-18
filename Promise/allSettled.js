// promise.allSettled 可以等待所有的异步操作完成后在执行
// 特点是可以查询每一个请求的状态
// 源码
/* 
function allSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError('argument must be a array')
    }
    const result = []
    promises.forEach((promise, index) => {
      promise.then(
        (value) => {
          result[index] = {
            status: 'fulfilled',
            value,
          }
        },
        (reason) => {
          result[index] = {
            status: 'rejected',
            reason,
          }
        }
      )
    })
  })
}
。。。。。。。3.18 22:52
 */

// 实例
/* const promises = [
   fetch('/api-1'),
   fetch('/api-2'),
   fetch('/api-3'),
 ];
 await Promise.allSettled(promises);
 removeLoadingIndicator();

 看不懂 似乎是 await 缺少 async？
 /Users/dailu/Desktop/Learning Records/Promise/allSettled.js:37
 await Promise.allSettled(promises);
 ^^^^^
SyntaxError: await is only valid in async functions and the top level bodies of modules
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:135:12)
    at node:internal/main/run_main_module:28:49

Node.js v20.11.0
  */

// 分别定义 res 和rej 的请求结果，使用 allSettled 进行请求
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});

/* 打印结果
[
  { status: 'fulfilled', value: 42 },
  { status: 'rejected', reason: -1 }
] */
