export function createStore(reducer) {
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

  return {
    dispatch,
    getState,
    subscribe,
  };
}
