import React from "react";
import { Map } from "./components/Map";
import { Layout, Input, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "./components/Drawer";
const { Header, Content, Footer } = Layout;
const { Search } = Input;

export function App() {
  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ padding: 16, display: "flex", alignItems: "center" }}>
        <Button type="primary" onClick={showDrawer} style={{ marginRight: 8 }}>
          <MenuOutlined />
        </Button>
        <Search
          placeholder="Search..."
          onSearch={(value: string) => setSearch(value)}
          enterButton
        />
      </Header>
      <Content style={{ position: "relative" }}>
        <Map location={search} />
      </Content>
      <Footer style={{ display: "flex", justifyContent: "center" }}>
        Inhaí ©2020 Created by Lucas Arcoverde
      </Footer>
      <Drawer onClose={onClose} visible={visible} />
    </Layout>
  );
}
