const HLL = require('../');

suite('HLL', () => {
    const hll = new HLL(20);
    const buf = new Buffer('1');

    bench('add const string', () => hll.add('1'));
    bench('add const buffer', () => hll.add(buf));
    bench('add random', () => hll.add(Math.random().toString()));
    bench('toBuffer', () => hll.toBuffer());
});