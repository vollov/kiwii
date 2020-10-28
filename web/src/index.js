import React from "react";
import { render } from "react-dom";
import App from "./App";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store from "stores/reducers";

const persistor = persistStore(store);

const dom = (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

render(dom, document.getElementById("root"));
