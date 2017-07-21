const HLL = require('../');

const hll = new HLL(5);

// Add item to hll counter.
hll.add('1');
hll.add(new Buffer('2'));

console.log(hll.bits);
console.log(hll.count());
console.log(hll.toBuffer());

// Create HLL from buffer.
console.log(new HLL(hll.toBuffer()).count());

const hll2 = new HLL(5);
hll2.add('3');
hll2.merge(hll);
console.log(hll2.count());

const hll3 = new HLL(5);
hll3.add('8');
hll3.add('1');

console.log(HLL.intersectionSize([hll, hll2]));
console.log(HLL.intersectionSize([hll, hll2, hll3]));