# node-hll
This is a native [HyperLogLog](http://en.wikipedia.org/wiki/HyperLogLog) lib (A wrap for [avz/hll](https://github.com/avz/hll)).

## matcha benchmark result
```
                      HLL
      12,555,981 op/s » add const string
      11,999,272 op/s » add const buffer
       5,545,313 op/s » add cnt++
       2,477,867 op/s » add random
       1,380,207 op/s » toBuffer
           6,964 op/s » intersection
```

## Memory usage and error values
|bits|size (bytes) | standard error  |
|----|---------|--------|
|  4 |      16 | 26.00% |
|  5 |      32 | 18.38% |
|  6 |      64 | 13.00% |
|  7 |     128 |  9.19% |
|  8 |     256 |  6.50% |
|  9 |     512 |  4.60% |
| 10 |    1024 |  3.25% |
| 11 |    2048 |  2.30% |
| 12 |    4096 |  1.62% |
| 13 |    8192 |  1.15% |
| 14 |   16384 |  0.81% |
| 15 |   32768 |  0.57% |
| 16 |   65536 |  0.41% |
| 17 |  131072 |  0.29% |
| 18 |  262144 |  0.20% |
| 19 |  524288 |  0.14% |
| 20 | 1048576 |  0.10% |

## Example
```js
const HLL = require('node-hll');

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
```