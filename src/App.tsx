import React from "react";
import { Layout, Button, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Drawer } from "./components/Drawer";
import { MapPage } from "./pages/MapPage";
import { RatingPage } from "./pages/RatingPage";

const { Header, Content } = Layout;
const { Title } = Typography;

export function App() {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Router>
      <Layout style={{ height: "100vh", backgroundColor: "white" }}>
        <Header
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="ghost"
            onClick={showDrawer}
            style={{ marginRight: 8, color: "white" }}
          >
            <MenuOutlined />
          </Button>
          <Title style={{ color: "white", margin: 0 }}>Inhaí</Title>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/">
              <MapPage />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/rating">
              <RatingPage />
            </Route>
          </Switch>
        </Content>
        <Drawer onClose={onClose} visible={visible} />
      </Layout>
    </Router>
  );
}
