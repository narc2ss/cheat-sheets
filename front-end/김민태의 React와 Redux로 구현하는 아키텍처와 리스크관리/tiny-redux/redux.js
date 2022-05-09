export function createStore(reducer, middlewares = []) {
  let state = { counter: 0 };
  const handler = [];

  function dispatch(action) {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handler.push(listener);
  }

  const store = {
    getState,
    subscribe,
  };

  middlewares = Array.from(middlewares).reverse();
  let lastDispatch = dispatch;

  middlewares.forEach((m) => {
    lastDispatch = m(store)(lastDispatch);
  });

  return {
    ...store,
    dispatch: lastDispatch,
  };
}
