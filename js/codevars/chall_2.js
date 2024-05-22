function checkExam(array1, array2) {
  return array2.reduce((res, ans, i) => {
    if (ans === array1[i]) res+=4;
    if (ans && ans !== array1[i]) res-=1;
    
    return res;
  }, 0)
 }

 const res = checkExam(["a", "a", "b", "b"], ["a", "c", "b", "d"])
 console.log(res)
// NEW GROUP BY
console.log('\n');
const employees = [
  { name: "James", income: 1000, profession: "developer", age: 23, },
  { name: "Robert", income: 1100, profession: "qa", age: 34, },
  { name: "John", income: 1200, profession: "designer", age: 32, },
  { name: "Mary", income: 1300, profession: "designer", age: 22, },
  { name: "Patricia", income: 1400, profession: "qa", age: 23, },
  { name: "Jennifer", income: 1500, profession: "developer", age: 45, },
  { name: "Max", income: 1600, profession: "developer", age: 27, },
];

function groupBy(
  array,
  classifier,
  downstream,
  accumulatorSupplier,
) {
  const keys = array.map(classifier)
  const map = new Map();
  array.forEach((item, index) => {
    const key = keys[index];
    const mapValue = map.get(key) ?? [];
    // if (!map.has(key)) map.set(key, []);
    // map.get(key).push(item);
    map.set(key, [...mapValue, item])
  });
  
  map.forEach(
    (value, key) => map.set(key, value.reduce(downstream, accumulatorSupplier()))
  )
  console.log(map)
  return map;
}


 const profession2totalIncome = groupBy(
  employees,
  employee => employee.profession, // group by profession
  (acc, employee) => acc + employee.income, // sum up incomes
  () => 0, // provide an initial value for map's value
);

//
function joinArraysById(arr1, arr2) {
  const map = new Map();
  [...arr1, ...arr2].forEach((item) => {
    const { id } = item;
    const mapValue = map.get(id) ?? {};
    map.set(id, {...mapValue, ...item });
  });
  
  return [...map.values()].sort((a, b) => a.id - b.id)
}

const arr1 = [
  { id: 2, x: 9 },
  { id: 1, x: 1 }
]
const arr2 = [
  { id: 2, y: 2 },
  { id: 3, z: 3 },
]
const output = [
  { id: 1, x: 1 },
  { id: 2, x: 9, y: 2 },
  { id: 3, z: 3 },
]

console.log('\njoinArraysById: ',  joinArraysById(arr1, arr2))

// memoisation
function mul(a) {
  return (b) => {
    return (c) => a*b*c;
  }
}

console.log('\nMUL: ', mul(2)(3)(4)) // 24

// closure
function createBase(num) {
  return (addNum) => num + addNum
};

const addSix = createBase(6);
console.log('\n', addSix(10), 16);
const addNine = createBase(9);
console.log('\n', addNine(100), 109);