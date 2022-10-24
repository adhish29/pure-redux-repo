const redux = require("redux");
const { createStore, combineReducers, applyMiddleware } = redux;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

//the state in redux has to be an object -- one of Redux's principles
// const initialState = {
//   numofCakes: 20,
//   numofIcecreams: 30,
// };

const initialCakeState = {
  numofCakes: 20,
};

const initialIcecreamState = {
  numofIcecreams: 30,
};

//action creator
function buyCake() {
  return {
    type: "BUY_CAKE",
  };
}

function buyIcecream() {
  return {
    type: "BUY_ICECREAM",
  };
}

//reducers
function cakeReducer(state = initialCakeState, action) {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        numofCakes: state.numofCakes - 1,
      };

    default:
      return state;
  }
}

function icecreamReducer(state = initialIcecreamState, action) {
  switch (action.type) {
    case "BUY_ICECREAM":
      return {
        ...state,
        numofIcecreams: state.numofIcecreams - 1,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cakeReducer,
  icecreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State: ", store.getState());

//subscribe() is not mandetory. As soons as the store is updated, the callback of unsubscribe() will be executed
// const unsubscribe = store.subscribe(() => {
//   console.log("Updated State", store.getState());
// });

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecream());
store.dispatch(buyIcecream());

unsubscribe();
// store.dispatch(buyCake());
// console.log(store.getState());
