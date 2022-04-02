"use strict";

// promise is a JavaScript object for asynchronous operation.
// 비동기적인 것을 수행할 때 콜백함수 대신에 유용하게 사용 가능한 자바스크립트 내장 객체임

// point 는 2가지
// 1. state 이해
// 프로세스가 무거운 operation을 수행하고 있는 중인지, 기능수행이 완료되어 성공/실패했는지
// 2. Producer 와 Consumer 의 차이 이해

// State: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
  // doing some heave work (network, read files)
  console.log("doing something...");
  setTimeout(() => {
    // resolve('ellie');
    reject(new Error("no network"));
  }, 2000);
});

// 2. Consumers: then, catch, finally
// then 은 promise 가 정상적 수행되어 마지막에 최종적으로 resolve라는 콜백함수를 통해 전달한 값이
// value의 파마리터로 전달되어져서 들어온 걸 볼 수 있음
promise //
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally");
  });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("hen"), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`error! ${hen} => egg`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} = eggfri`), 1000);
  });

getHen() //
  .then(getEgg)
  .then(cook)
  .then(console.log)
  .catch(console.log);
