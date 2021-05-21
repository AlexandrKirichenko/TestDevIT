//1.Напишите функцию cloneDeep таким образом, чтобы она была способна клонировать переданный как параметр объект.

// 1ый вариант использовать JSON.parse(JSON.stringify(obj)),но  возникнут проблемы если stringify попытается превратить в строку рекурсивные объекты({} кот ссылаются сами на себя obj.self = obj) где есть зацикливание.
function cloneDeep (obj) {
    const buffer = new Map();
    const clone = cloneDeepCreate(obj);

    buffer.clear();
    return clone;

    function cloneDeepCreate (obj){
        if(typeof obj !== 'object' || obj === null) {
            return obj
        }

        if (obj instanceof Array) {
            const clone = [];
            buffer.set(obj, clone);

            for (let i = 0; i < obj.length; i++) {
                if (buffer.has(obj[i])){
                    clone.push(buffer.get(obj[i]))
                }

                else {
                    clone.push(cloneDeepCreate(obj[i]))
                }

            }
            return clone;

        }

        else{
            const clone = {}
            buffer.set(obj, clone)

            for (const key in obj){
                if(buffer.has(obj[key])){
                    clone[key] = buffer.get(obj[key])
                }

                else {
                    clone[key] = cloneDeepCreate(obj[key])
                }
            }

            return clone
        }
    }
}

const obj = { a:10, arr : [123,23,2]}
obj.self = obj
obj.arr.push(obj)
obj.arr.push(obj.arr)
const clone = cloneDeep(obj)
console.log(clone)
console.log(obj.self === obj)
console.log(clone.self === clone)
console.log(obj.self === clone.self)

// 2.Свертка. Используйте метод reduce в комбинации с concat для свёртки массива массивов в один массив, у которого есть все элементы входных массивов.

var arrays = [[1, 2, 3], [4, 5], [6]];

const redusedArr = arrays.reduce((acc,item) => acc.concat(item),[])
console.log(redusedArr)

// 3.  Допустим, у вас есть функция primitiveMultiply, которая в 50% случаев перемножает 2 числа, а в остальных случаях выбрасывает исключение типа MultiplicatorUnitFailure. Напишите функцию, обёртывающую эту, и просто вызывающую её до тех пор, пока не будет получен успешный результат.

function MultiplicatorUnitFailure() {
}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    try {
        throw new Error('Somthing failed')
        return primitiveMultiply(a, b)
    } catch (err) {
        console.log(err.__proto__.constructor.name)
        if (err.__proto__.constructor.name === 'MultiplicatorUnitFailure') {
            return reliableMultiply(a, b)
        }
        console.log(err.message)
    }
}
console.log(reliableMultiply(8, 8));


// 4. Расширить прототип Array, добавив к нему метод добавления элемента в начало без использование unshift.

let arr = [1, 2, 3];
Array.prototype.append=function(x){this.splice(0,0,x)}
arr.append(0);
console.log(arr);
// or
// Array.prototype.append=function(x){
//     this.reverse().push(x);
//     arr.reverse();
// }

// 5. Выведите все элементы массива используя рекурсию.
var arr2 = ['Solnce', 'vishlo', 'iz', 'za', 'tuchi'];

const rlog = (arr2, i=0) => {
    if (i=== arr2.length) {
        return;
    }
    console.log(arr2[i]);
    rlog(arr2, i+1)
}
rlog(arr2);
// or
// const rLog = (arr2) => {
//     if (arr2.length === 0) {
//         return
//     }
//     console.log(arr2[0])
//     rLog(arr2.slice(1))
// }
// rLog(arr2);

// 6. Написать функцию для выполнения параллельных вычислений без использования Promise.

function paralell(funcs, callback) {

    const result = [];
    funcs.forEach(([func, args]) => {
        window.setTimeout(() => {
            result.push(args ? func(...args) : func())
        }, 100)
    })
    window.setTimeout(() => {
        callback(result)
    }, funcs.length * 101)
}

var a = function(one, two) {
    return one + two
}
var b = function() {
    return false;
}

paralell([[a, [1, 2]], [b]], function(results) {
    console.log(results); // [3, false]
});

//----------------------------------------------------------------
// 7.Сделать функцию поиска значений в массиве.
//
//     Синтаксис: array_find(arr: array, search: string|regex): string|number[]|null
// Пример:
//     let result = array_find(testData, '/^raf.*/i') // ["Rafshan"]
//     let result2 = array_find(testData, "Rafshan") // ["Rafshan"]

let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];

const searchValue = (arr, value) => arr.find(item => {
    if (item === value || new RegExp(value).test(item))
        return true;
})
const res = (searchValue(testData, /^raf.*/i));
console.log(res);


//8. Сделать функцию которая обрезает массив от указанного значения.

const cutArray = (arr, value) => arr.slice(arr.indexOf(value))
cutArray(testData, 1990);
console.log(cutArray(testData, 1990));

// const cutArr = ( arr=[], value) => arr.length === 0 && [] || arr[0] === value && arr || cutArr(value,arr.slice(1))
// cutArr(testData, 85)

//9. Не разобрался с заданием, т.к. не ясно, что происходит в примерах...

// 10. Сделать функцию которая возвращает уникальные элементы массива.
//
//     Синтаксис: array_unique(arr: array): any[]
// Пример:
//     let result = array_unique(testData.concat(testData2)) // [1, 2, 1990, 85, 24, 5, 7, 8.1, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]


function array_unique(arr) {
    return arr.filter((item, index, self) => (self.indexOf(item) === index));
}
console.log(array_unique(testData))
//const array_unique = [...new Set(testData)]
// or
//const array_unique = arr.reduce((uniqArr, item) => {
// return uniqArr.includes(item) ? uniqArr : [...uniqArr, item];}.[])



// #11Сделать функцию которая сможет делать срез данных с ассоциативного массива.
//
// Синтаксис: array_pluck(arr: array, path: string): any[]
// Пример:
// let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]

let testData3 = [{"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},{"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},{"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},{"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},{"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},{"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}]


let getObjectValueByKey = (obj, keys) => {
    let objCopy = Object.assign(obj);
    if (typeof keys === 'string') {
        if (keys.length) {
            for (let key of keys.split('.')) {
                if (!objCopy[key] && objCopy[key] !== 0 ) {
                    return undefined
                }
                objCopy = objCopy[key];
            }
        }
        return objCopy
    }
    return undefined
};
console.log(getObjectValueByKey)

const array_pluck = (arr, path) =>  {
    return arr.map(obj => getObjectValueByKey(obj, path))}

console.log(array_pluck(testData3, 'skills.php'))

// mb
// const keys = path.split('.');
// keys.reduce((acc, key) => (
//     acc && acc[key]
// ), obj)

//12.Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.

//     Синтаксис: array_combine(keys: array, values: array): Object
// Пример:
//     let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}

// var testData=  [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
var testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];

const array_combine = (arr, arr2) => {
    return arr.reduce((acc, item, i) => {
        if (typeof item === "boolean") return acc
        return (acc[item] = arr2[i], acc)
    }, {});
};
console.log(array_combine(testData, testData2))
// possible variants
// Object.assign(...arr.map((item, i) => ({ [item]: arr2[i] })))
// arr.reduce((acc, item, i) => ({ ...acc, [item]: arr2[i] }), {})


// ------------------------------
// #MONGODB
// Задание
// Напишите команды для получения следующих значений:
//
//     Выведите 5 записей из коллекции posts пропустив первые 5
// Выведите все записи у которых like больше 100
// Добавьте новую запись в коллекцию posts
// Выведите список авторов и их общее количество like

// db.posts.find({like:{$gt:100}})
// db.posts.find().skip(5)
// db.posts.insertOne({
//     title: 'TailwindCSS & React.js',
//     content: 'Best practices of TailwindCSS & React',
//     author: 'Adam Wathan',
//     like: 54,
//     dislike: 3 })
// db.posts.aggregate([{
//     $group:{
//         _id: null,
//         authors:{$addToSet:"$author"},
//         totalLikes:{$sum:"$like"}
//     }},{
//     $project:{
//         _id:0
//     }}
// ])
// ------------
// db.posts.insertMany([
//     {
//         "title": "HTML part2",
//         "content": "HTML5  and CSS3(part2)",
//         "author": "Robson",
//         "like": 46,
//         "dislike": 1
//     },
//     {
//         "title": "You still Don't Know JS part2",
//         "content": "You’ll get a more complete understanding of JavaScript(part2)",
//         "author": "Simpson",
//         "like": 127,
//         "dislike": 4
//     },
//     {
//         "title": "ES9 JavaScript",
//         "content": "This is a post about JavaScript, programming, and the wonders of the digital.",
//         "author": "Haverbeke",
//         "like": 142,
//         "dislike": 13
//     },
//     {
//         "title": "Secrets of the JavaScript Ninja(part2)",
//         "content": "You have to be a ninja. Secrets of the JavaScript Ninja leads you down the pathway to JavaScript enlightenment.(part2)",
//         "author": "Resig",
//         "like": 171,
//         "dislike": 3
//     },{
//         "title": "Clean code(part2)",
//         "content": "Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code(part2)",
//         "author": "Martin",
//         "like": 171,
//         "dislike": 12
//     },
//     {
//         "title": "TailwindCSS & React.js",
//         "content": "Best practices of tailwindcss on React",
//         "author": "Wathan",
//         "like": 50,
//         "dislike": 3
//     },
//     {
//         "title": " Algorithms(part2)",
//         "content": "Algorithms are just step-by-step algorithms for solving problems(part2)",
//         "author": "Bhargava",
//         "like": 153,
//         "dislike": 8
//     }
// ])
//
