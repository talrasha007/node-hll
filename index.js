const HLL = require('./build/Release/node-hll.node').HLL;

module.exports = class {
    constructor(arg) {
        if (Buffer.isBuffer(arg)) {
            const bits = Math.log2(arg.length);
            if (bits === Math.round(bits) && 4 <= bits && bits <= 20) {
                this._bits = bits;
                this._hll = new HLL(arg);
            } else {
                throw new Error('[HLL ctor] Invalid args.');
            }
        } else if (4 <= arg && arg <= 20) {
            this._bits = arg;
            this._hll = new HLL(arg);
        } else {
            throw new Error('[HLL ctor] Invalid args.');
        }
    }

    get bits() {
        return this._bits;
    }

    toBuffer() {
        return this._hll.toBuffer();
    }

    add(item) {
        if (typeof item === 'string' || Buffer.isBuffer(item)) {
            this._hll.add(item);
        } else {
            throw new Error('[HLL add] Invalid args.');
        }

        return this;
    }

    count() {
        return this._hll.count();
    }

    merge(hll) {
        if (hll instanceof module.exports) {
            if (hll.bits !== this.bits) {
                throw new Error('[HLL merge] Hlls should have same bits.');
            }

            this._hll.merge(hll._hll);
        } else {
            throw new Error('[HLL merge] Invalid args.');
        }

        return this;
    }

    clone() {
        const r = new module.exports(this.bits);
        return r.merge(this);
    }

    /*
     * |A n B| = |A| + |B| - |A u B|
     * in the below, we set A = head, and B = tail.
     * then note that A u (B0 n B1 n ...) = (B0 u A) n (B1 u A) n ...
     * the latter we can compute with tail.map { _ + A } using the HLLInstance +
     * since + on HLLInstance creates the instance for the union.
    */
    static intersectionSize(hlls) {
        if (hlls.length === 0) throw new Error('[HLL intersectionSize] Invalid args.');
        if (hlls.length === 1) return hlls[0].count();

        const head = hlls[0];
        const tail = hlls.slice(1);

        const ret = head.count() +
            module.exports.intersectionSize(tail) -
            module.exports.intersectionSize(tail.map(h => h.clone().merge(head)));

        return Math.max(ret, 0);
    }
};