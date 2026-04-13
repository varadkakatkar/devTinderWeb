import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../App.css";
import Body from "./Body.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import { Provider } from "react-redux";
import appStore from "../utils/appStore.js";
import Feed from "./Feed.jsx";
import Connections from "./Connections.jsx";
import Requests from "./Requests.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      {/* <AppHeader /> */}
    </>
  );
}

export default App;
