#include "circom.hpp"
#include "calcwit.hpp"
#define NSignals 5
#define NComponents 1
#define NOutputs 1
#define NInputs 3
#define NVars 5
#define NPublic 4
#define __P__ "21888242871839275222246405745257275088548364400416034343698204186575808495617"

/*
Sum
*/
void Sum_987abe19fac8d108(Circom_CalcWit *ctx, int __cIdx) {
    FrElement _sigValue[1];
    FrElement _sigValue_1[1];
    FrElement _tmp[1];
    FrElement _sigValue_2[1];
    FrElement _tmp_1[1];
    int _a_sigIdx_;
    int _b_sigIdx_;
    int _c_sigIdx_;
    int _sum_sigIdx_;
    _a_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xaf63dc4c8601ec8cLL /* a */);
    _b_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xaf63df4c8601f1a5LL /* b */);
    _c_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xaf63de4c8601eff2LL /* c */);
    _sum_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x82719e195d0fc4a8LL /* sum */);
    /* signal input a */
    /* signal input b */
    /* signal input c */
    /* signal output sum */
    /* sum <== a * b - c */
    ctx->multiGetSignal(__cIdx, __cIdx, _a_sigIdx_, _sigValue, 1);
    ctx->multiGetSignal(__cIdx, __cIdx, _b_sigIdx_, _sigValue_1, 1);
    Fr_mul(_tmp, _sigValue, _sigValue_1);
    ctx->multiGetSignal(__cIdx, __cIdx, _c_sigIdx_, _sigValue_2, 1);
    Fr_sub(_tmp_1, _tmp, _sigValue_2);
    ctx->setSignal(__cIdx, __cIdx, _sum_sigIdx_, _tmp_1);
    ctx->finished(__cIdx);
}
// Function Table
Circom_ComponentFunction _functionTable[1] = {
     Sum_987abe19fac8d108
};
