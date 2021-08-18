import {Router} from "./router";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createStore} from "redux";
import {FC} from "react";
import {rootReducer} from "./store/rootReducer";

const store = createStore(rootReducer, composeWithDevTools());

const App: FC = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
