const redux = require("redux");
const thunkMiddlewire = require("redux-thunk").default;
const axios = require("axios");

const { createStore, applyMiddleware } = redux;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

function fetchUsersRequest() {
  return {
    type: "FETCH_USERS_REQUEST",
  };
}

function fetchUsersSuccess(users) {
  return {
    type: "FETCH_USERS_SUCCESS",
    payload: users,
  };
}

function fetchUsersError(error) {
  return {
    type: "FETCH_USERS_FAILURE",
    payload: error,
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case "FETCH_USERS_FAILURE":
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
}

function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((resp) => {
        const users = resp.data.map((user) => user.name);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((e) => {
        dispatch(fetchUsersError(e.message));
      });
  };
}

const store = createStore(reducer, applyMiddleware(thunkMiddlewire));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
