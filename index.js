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

    add(item) {
        if (Buffer.isBuffer(item)) {
            this._hll.add(item);
        } else {
            this._hll.add(new Buffer(item));
        }
    }

    count() {
        return this._hll.count();
    }

    merge(hll) {
        if (hll instanceof module.exports) {
            this._hll.merge(hll._hll);
        } else {
            throw new Error('[HLL merge] Invalid args.');
        }
    }
};