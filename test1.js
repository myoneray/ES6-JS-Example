console.log('================示例A==================');

function* hellowGenerator() {
    yield 'hellow';
    yield 'Generator';
    return 'end';
}

let hw = hellowGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

let A = '调用generator函数返回遍历器对象，代表generator函数的内部指针，调用遍历器对象的next方法，就会返回一个对象{value: 表达式值, done: true OR false}，value为yield后表达式的值，done表示遍历是否结束';
console.log(A);


console.log('================示例B==================');

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

let genFoo = foo();
for (let prop of genFoo) {
    console.log(prop);
}

let B = '一旦next方法的遍历器对象返回的done属性为true,foo···of循环就会结束，并且不会返回该对象。SO,上面示例不会返回6！';
console.log(B);


console.log('================示例C==================');

function* add() {
    yield 123 + 123;
}
let val = add();
console.log(val.next());

let C = 'yield后函数 不会立即求和，只有调用了next方法指针移动到这句才会求和。';
console.log(C);

console.log('================示例D==================');

function* numb() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

console.log([...numb()]); //扩展运算符
console.log(Array.from(numb())); //
let [x, y] = numb(); //解构赋值
console.log([x, y]);
console.log('for···of循环，扩展运算符，解构赋值，，Array.from内部调用的都是遍历器借口，这样就意味可以将generator函数返回的iterator对象作为参数');

console.log('================示例E==================');

let g = function*() {
    while (true) {
        try {
            yield;
        } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
        }
    }
}

let i = g();
i.next();

try {
    throw new Error('a');
    throw new Error('b');
} catch (err) {
    console.log('外部捕获', err);
}
//外部捕获 Error: a

console.log('================示例F==================');
let g1 = function*() {
    while (true) {
        try {
            yield;
            yield;
        } catch (e) {
            if (e != 'a') throw e;
            console.log('内部捕获', e);
        }
    }
}

let i1 = g1();
i1.next();
i1.next();

try {
    i1.throw('a'); //此处不同于  throw new Error('a');
    i1.throw('b');
} catch (err) {
    console.log('外部捕获', err);
}
// 内部捕获 a
// 外部捕获 b

console.log('================示例G==================');

function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
        yield 4;
    } finally {
        yield 5;
        yield 6;
        yield 7;
    }
    yield 8;
}
let g2 = numbers();
console.log(g2.next());
console.log(g2.next());
console.log(g2.return('X'));
console.log(g2.next());
console.log(g2.next());
console.log('遍历器对象调用return方法（传参）后返回 value为参数值，done属性为true。后续继续调用done属性总为true');
console.log('遍历器对象调用return方法（不传参）后返回 value为undefined，done属性为true。后续继续调用done属性总为true');
console.log('如果Generator函数内部有try...finally代码块，那么return函数就会推迟到finally后执行。');



console.log('>>>>>>>>>>>>>>>>示例H:yield*语句<<<<<<<<<<<<<<<<<<');

function* inner() {
    yield 'hello!';
}

function* inner1() {
    yield 'open';
    yield inner();
    yield 'end';
}
let genInner1 = inner1();

console.log(genInner1.next());
console.log('yield返回遍历器对象:', genInner1.next());
console.log(genInner1.next());

function* inner2() {
    yield 'open';
    yield* inner();
    yield 'end';
}
let genInner2 = inner2();

console.log(genInner2.next());
console.log('yield*返回遍历器对象的内部值:', genInner2.next());
console.log(genInner2.next());

console.log('>>>>>>>>>>>>>>>>yield*语句遍历数组成员<<<<<<<<<<<<<<<<<<');

function* genH() {
    yield*['A', 'B', 'C'];
    yield ['A', 'B', 'C'];
    yield 'ABC';
}
let genYield = genH();
console.log('yield* return返回数据', genYield.next());
console.log('yield*语句遍历数组返回成员', genYield.next());
console.log('yield*语句遍历数组返回成员', genYield.next());
console.log('yield语句遍历数组返回整个数组', genYield.next());
console.log('yield语句遍历数组返回整个数组', genYield.next());
console.log('结束', genYield.next());

// yield*语句遍历数组返回成员 Object {value: "A", done: false}
// yield*语句遍历数组返回成员 Object {value: "B", done: false}
// yield*语句遍历数组返回成员 Object {value: "C", done: false}
// yield语句遍历数组返回整个数组 Object {value: Array[3], done: false}
// yield语句遍历数 组返回整个数组 Object {value: "ABC", done: false}
// 结束 Object {value: undefined, done: true}



console.log('>>>>>>>>>>>>>>>>yield* return<<<<<<<<<<<<<<<<<<');

function* genI() {
    yield 'functionA Start';
    return 'functionA return';
}

function* genIB() {
    yield 'functionB Start'
    let result = yield* genI();
    console.log('Generator函数return 返回数据（与Next无关）：',result);
    yield 'functionB End'
}
let genIYield = genIB();
console.log('Generator函数yield', genIYield.next());
console.log('Generator函数yield', genIYield.next());
console.log('Generator函数yield', genIYield.next());
console.log('Generator函数yield', genIYield.next());

console.log('Generator函数yield* 函数相当于for···of的缩写，当done的属性值为true时就会终止且不会返回表达式对象。以上同理。');





console.log('××××××××××××××××××××××××××××××××××××××××××××××××××××××××××');
