import { createStore } from "./redux.js";

const COUNT = "COUNT";

function reducer(state, action) {
  if (action.type === COUNT) {
    return { ...state, counter: action.payload.counter };
  }
  return state;
}

function listener() {
  console.log(store.getState());
}

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

function counter(data) {
  store.dispatch(actionCreator(COUNT, data));
}

const store = createStore(reducer);

store.subscribe(listener);

counter({ counter: 1 });
counter({ counter: 2 });
counter({ counter: 3 });
