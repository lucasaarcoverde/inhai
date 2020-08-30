import React from "react";

import { Layout, Button, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "./components/Drawer";
import { MapPage } from "./pages/MapPage";

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
    <Layout style={{ height: "100vh" }}>
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
        <MapPage />
      </Content>
      <Drawer onClose={onClose} visible={visible} />
    </Layout>
  );
}
