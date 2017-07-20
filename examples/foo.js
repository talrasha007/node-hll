const HLL = require('../');

const hll = new HLL(5);

hll.add('1');
hll.add(new Buffer('2'));

console.log(hll.bits);
console.log(hll.count());
console.log(hll.toBuffer());

const hll2 = new HLL(5);
hll2.add('3');
hll2.merge(hll);
console.log(hll2.count());
