import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

export function* log(action:PayloadAction){
    console.log("Log",action)
}

function* handleIncrementSaga(action:PayloadAction<number>){
    console.log("waiting 2ms")
    yield delay(2000)
    console.log("waiting done")
    yield put(incrementSagaSuccess(action.payload))
}
export default function* counterSaga(){
    console.log("counter saga")
    // yield takeEvery("*",log)//dấu * là tất cả các action
    yield takeEvery(incrementSaga.toString(),handleIncrementSaga)//do không biết payload là gì nên .tostring để lấy type

}