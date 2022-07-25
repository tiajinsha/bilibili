import React from 'react';
import './index.scss';
import "antd/dist/antd.css";
import "@/assets/style/iconfont.css"
import Container from "@/router/index"
import { createRoot } from "react-dom/client"
import { Provider } from 'mobx-react';
const root = createRoot(document.getElementById('root'));
import * as indexStore from "@/store/index"
export const context = {
  picURL: "http://localhost:25565" + "/transfer/image",
  videoURL: "http://localhost:25565" + "/transfer/mp4"
};

const viedoContext = React.createContext(context);

root.render(
  <React.StrictMode>
    <Provider  {...indexStore} viedoContext={viedoContext}>
        <Container />
    </Provider>
  </React.StrictMode>,
);

