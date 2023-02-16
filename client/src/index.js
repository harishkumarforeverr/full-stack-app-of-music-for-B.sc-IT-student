// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

import "antd/dist/reset.css";
// import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initialState";
import reducer from "./Context/reducer";
import ConfigProviderComponent from "./ConfigProvider";
// // ReactDOM.render(
// //   <React.StrictMode>
// //     <ConfigProviderComponent>
// //       <Router>
// //         <StateProvider initialState={initialState} reducer={reducer}>
// //           <App />
// //         </StateProvider>
// //       </Router>
// //     </ConfigProviderComponent>
// //   </React.StrictMode>,
// //   document.getElementById("root")
// // );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <ConfigProviderComponent>
//       <Router>
//         <StateProvider initialState={initialState} reducer={reducer}>
//           <App />
//         </StateProvider>
//       </Router>
//     </ConfigProviderComponent>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; 
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <ConfigProviderComponent>
    <BrowserRouter>
      <Provider store={store}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
        </StateProvider>
      </Provider>
    </BrowserRouter></ConfigProviderComponent>
  </React.StrictMode>
);
 