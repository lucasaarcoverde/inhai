import React from "react";
import { Drawer as AntDrawer, Avatar, Typography, Menu } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  StarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;
/** @todo turn it accessible (focusable) */
export function Drawer({ onClose, visible }: Props) {
  return (
    <AntDrawer
      title={<DrawerTitle />}
      placement="left"
      bodyStyle={{ padding: 0 }}
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        theme="light"
        style={{ width: "100%", padding: 0 }}
      >
        <Menu.Item key="1" icon={<SearchOutlined />}>
          <Link to="/">Mapa LGBT-Friendly</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<StarOutlined />}>
          <Link to="/rating"> Avaliar Local</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BellOutlined />}>
          Notificações
        </Menu.Item>
        <Menu.Item key="4" icon={<ProfileOutlined />}>
          Perfil
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          Configurações
        </Menu.Item>
        <Menu.Item key="6" icon={<LogoutOutlined />}>
          Sair
        </Menu.Item>
      </Menu>
    </AntDrawer>
  );
}

function DrawerTitle() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Avatar size={48} style={{ marginBottom: 4 }} icon={<UserOutlined />} />
      <Text strong>lucas</Text>
      <Text type="secondary">@lucas</Text>
    </div>
  );
}

interface Props {
  onClose: () => void;
  visible: boolean;
}
