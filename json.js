// JSON
// JavaScript Object Notation

// 1. Object to JSON
// stringfy(obj)
let json = JSON.stringify(true);
console.log(json);
// true 출력

json = JSON.stringify(["apple", "banana"]);
console.log(json);
// ["apple","banana"] 출력.

const sparta = {
  group: "지중해",
  member: 6,
  career: null,
  birthDate: new Date(),
  goal: () => {
    console.log(`${obj.group} 모두 해내자!`);
  },
};

json = JSON.stringify(sparta);
console.log(json);
// {"group":"지중해","member":6,"career":null,"birthDate":"2022-04-05T15:22:55.601Z"} 출력
// null 그대로 출력
// birthDate라는 object 가 string 으로 변환되어서 json 으로 만들어짐
// goal 함수는 object 에 있는 data 가 아니기 때문에 json 에 포함되지 않음

json = JSON.stringify(sparta, ["group", "member"]);
console.log(json);
// {"group":"지중해","member":6} 출력
// 2번째 인자로 [] 안에 원하는 property 만 입력하면, 해당 값들만 json 으로 변환됨

json = JSON.stringify(sparta, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return;
  // 2번째 인자로 callback 함수 넣고, 그 함수의 인자는 key, value 넣음
  // 원하는 return 값 설정해서 입력
});
console.log(json);

// 2. JSON to Object
// parse(json)
json = JSON.stringify(sparta);
const obj = JSON.parse(json);
console.log(obj);

sparta.goal();
// 지중해 모두 해내자!  출력

obj.goal();
// sparta를 JSON 으로 만들 때 함수는 포함되지 않았음
// 그래서 다시 JSON 으로부터 object 를 만든 obj 에는 goal이라는 API 가 없음

console.log(sparta.birthDate.getDate());
// 6 출력 (오늘 날짜 출력된 것임)

console.log(obj.birthDate.getDate());
// 다시 json 으로부터 object 를 만든 obj 에는 birthDate 가 string 으로 들어가 있어 Date 내장함수 사용할 수 없음
