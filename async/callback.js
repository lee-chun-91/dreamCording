'use strict';

// JavaScript is synchronous. 
// Execute the code block by orger after hoisting.
// hoisting: var, function declaration

console.log('1');  // 동기
// setTimeout 은 browser API 라서 브라우저에게 요청을 함. 
// 그리고 응답을 기다리지 않고 다음인 console.log('3')으로 넘어감
// 그리고 브라우저에서 1초의 시간이 지난 다음에, 콜백함수 실행하라고 자바스크립트에 얘기함
// 그 때서야 콜백함수 실행함 
// 보통 콜백함수는 에로우 펑션으로 표현
setTimeout(() =>  console.log('2'), 1000); // 비동기
console.log('3'); // 동기


// 콜백은 그럼 무조건 비동기일 때만 사용하나요?
// 그렇지 않음. 콜백도 2가지로 나눠짐.

// Synchronous callback
// 함수 선언은 자바스크립트가 호이스팅할 때 맨 위로 올리니까, 가장 위에 있는 것 처럼 여길 것.
function printImmediately(print) {
    print();
}

printImmediately(()=> console.log('hello')); // 동기


// Asynchronous callback
// 함수 선언은 자바스크립트가 호이스팅할 때 맨 위로 올리니까, 가장 위에 있는 것 처럼 여길 것.
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log("async callback"), 2000); // 비동기


// Callback Hell example
// 서버에서 데이터를 받아오는 class 를 작성해봄
class UserStorage {
    // API 1: 사용자를 로그인하는 것. id/pw 받아오고, 정상적으로 로그인 이뤄졌다면 onSuccess 콜백함수 호출,
    // 만약 정상적 로그인 실패했다면 onError 라는 콜백함수 호출
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
          if (
            (id === 'ellie' && password === 'dream') ||
            (id === 'coder' && password === 'academy')
          ) {
            onSuccess(id);
          } else {
              onError(new Error('not found'));
          }
        }, 2000);
    }
    // API 2: 사용자 데이터를 받아 사용자가 가지고 있는 역할들을 서버에게 요청해서 다시 받아오는 API
    getRoles(user, onSuccess, onError) {
      setTimeout(() => {
        if (user === 'ellie') {
          onSuccess({name: 'ellie', role: 'admin' });
        } else{
          onError(new Error('no access'));
        }
      }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage.loginUser(
  id, 
  password,
  (user) => {
    userStorage.getRoles(
      user,
      userWithRole => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        )
      },
      error => {
        console.log(error);
      }
    );
  },
  error => {
    console.log(error);
  }
);


// 콜백지옥의 문제점
// 1. 가독성이 너무 떨어져 코드를 이해하기가 어려움
// 2. 에러 발생 시, 디버깅 필요 시 굉장히 어려움