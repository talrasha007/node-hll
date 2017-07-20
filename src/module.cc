#include <math.h>
#include <nnu.h>

extern "C" {
    #include <hll.h>
}

class HLLWrap: public nnu::ClassWrap<HLLWrap> {
public:
    static const char * const CLASS_NAME;

    static void setupMember(v8::Local<v8::FunctionTemplate>& tpl) {
        Nan::SetPrototypeMethod(tpl, "add", wrapFunction<&HLLWrap::add>);
        Nan::SetPrototypeMethod(tpl, "count", wrapFunction<&HLLWrap::count>);
        Nan::SetPrototypeMethod(tpl, "merge", wrapFunction<&HLLWrap::merge>);
    }

    static NAN_METHOD(ctor) {
        HLLWrap *ptr = NULL;
        v8::Local<v8::Value> arg = info[0];

        if (arg->IsNumber()) {
            ptr = new HLLWrap(arg->Uint32Value());
        } else {
            const char *registers = node::Buffer::Data(info[0]);
            size_t size = node::Buffer::Length(info[0]);
            ptr = new HLLWrap(registers, size);
        }

        ptr->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
    }

private:
    HLLWrap(uint8_t bits) {
        hll_init(&hll, bits);
    }

    HLLWrap(const char *buffer, size_t size) {
        hll_load(&hll, buffer, size);
    }

    ~HLLWrap() {
        hll_destroy(&hll);
    }

private:
    NAN_METHOD(add) {
        if (node::Buffer::HasInstance(info[0])) {
            const char *data = node::Buffer::Data(info[0]);
            size_t len = node::Buffer::Length(info[0]);

            hll_add(&hll, data, len);
        } else {
            Nan::Utf8String str(info[0]);
            hll_add(&hll, *str, str.length());
        }
    }

    NAN_METHOD(count) {
        double cnt = hll_count(&this->hll);
        info.GetReturnValue().Set(Nan::New(round(cnt)));
    }

    NAN_METHOD(merge) {
        HLLWrap * src = Nan::ObjectWrap::Unwrap<HLLWrap>(info[0]->ToObject());
        hll_merge(&hll, &src->hll);
    }

private:
    HLL hll;
};

const char * const HLLWrap::CLASS_NAME = "HLL";

NAN_MODULE_INIT(initAll) {
    HLLWrap::setup(target);
}

NODE_MODULE(hll, initAll);