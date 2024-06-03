import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./Redux/Store.js";
import { Provider } from "react-redux";
import Upload from "./screens/Upload.jsx";
import Gallery from "./screens/Gallery.jsx";
import Photos from "./screens/Photos.jsx";
// import { combineReducers } from "redux";
// import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
// import photos from "./Redux/Store.js";
// const persistConfig = {
//   key: "root",
//   storage,
// };
// const rootReducer = combineReducers({
//   photos,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/Photos" element={<Photos />} />
        </Routes>
      </Router>
    </React.StrictMode>
    {/* </PersistGate> */}
  </Provider>
);
