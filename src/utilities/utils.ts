import mongoose from 'mongoose';

function isIdValid(id: any) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return true;
    }
    return false;
}

function testfunc() {
    return true;
}

export {
    isIdValid,
    testfunc,
};
