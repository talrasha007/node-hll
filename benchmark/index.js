const HLL = require('../');

suite('HLL', () => {
    const hll = new HLL(10);
    const buf = new Buffer('1');
    let cnt = 0;

    bench('add const string', () => hll.add('1'));
    bench('add const buffer', () => hll.add(buf));
    bench('add cnt++', () => hll.add((cnt++).toString()));
    bench('add random', () => hll.add(Math.random().toString()));
    bench('toBuffer', () => hll.toBuffer());

    const hlls = [hll.clone(), hll.clone(), hll.clone(), hll.clone(), hll.clone()];
    bench('intersection', () => HLL.intersectionSize(hlls));
});