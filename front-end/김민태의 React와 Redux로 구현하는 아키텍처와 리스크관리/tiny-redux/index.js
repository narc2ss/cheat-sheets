import { createStore } from "./redux.js";

const COUNT = "COUNT";
const FETCH = "FETCH";
const FETCH_SUCCESS = "FETCH_SUCCESS";

const middleware1 = (store) => (dispatch) => (action) => {
  if (action.type === FETCH) {
    setTimeout(() => {
      dispatch({ type: FETCH_SUCCESS, payload: [1, 2, 3] });
    }, 2000);
  } else {
    dispatch(action);
  }
};

function reducer(state, action) {
  if (action.type === COUNT) {
    return { ...state, counter: action.payload.counter };
  }
  if (action.type === FETCH_SUCCESS) {
    return { ...state, response: action.payload };
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

const store = createStore(reducer, [middleware1]);

store.subscribe(listener);

counter({ counter: 1 });
store.dispatch(actionCreator(FETCH));
counter({ counter: 2 });
