console.log('××××××××××××××××××××××××××××××××××××××××××××××××××××××××××');
console.log('Generator函数推导:惰性求值');

function* g1() {
    yield 2;
    yield 3;
    yield 4;
}

function* g2() {
    yield 1;
    yield* g1();
    yield 5;
}

var iterator = g2();

console.log(iterator.next(11111111)); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next(111)); // { value: undefined, done: true }

console.log('××××××××××××××××××××××××××××××××××××××××××××××××××××××××××');
// https://jsfiddle.net/wangming/8x0vk047/7/

//向生成器传值
function* gen() {
    while (true) {
        let value = yield 'Test';
        console.log(value);
    }
}
let g=gen();
console.log(g.next(1));
console.log(g.next(2));
console.log(g.next(3));
// Object {value: "Test", done: false}
// 2
// Object {value: "Test", done: false}
// 3
// Object {value: "Test", done: false}
// 在该示例中，调用 next 方法并传入了参数，
// 请注意，首次调用 next 方法时没有出任何输出, 这是因为初始状态时生成器通过yield 返回了null.
// 因为Generator函数初始化时并不会执行yield语句，所以返回空，后续调用Generator.prototype.next(value)时才给传值。

// 由上可见，Generator.prototype.next(value);方法返回一个包含done和value的属性对象
// value是向生成器（function*函数）传值，而不是当前yield后的表达式。let value = yield null;
console.log('××××××××××××××××××××××××××××××××××××××××××××××××××××××××××');


function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g1 = gen();

console.log(g1.next()); // { value: 1, done: false }
console.log(g1.return("foo"));  // { value: "foo", done: true }
console.log(g1.next());   // { value: undefined, done: true }
//
