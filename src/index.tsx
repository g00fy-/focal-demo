import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { devicesSlice } from "./reducers";
import { devicesSaga } from "./sagas";
import App from "./components/App";
import "./styles.css";

const appReady = (async () => {
  const { worker } = await import("./mocks/browser" as any);
  // if process.ENV === 'development' -> but this is demo app  - so always
  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
})();

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: devicesSlice.reducer,
  middleware
});

sagaMiddleware.run(devicesSaga);

appReady.then(() => {
  const rootElement = document.getElementById("root");
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
});
