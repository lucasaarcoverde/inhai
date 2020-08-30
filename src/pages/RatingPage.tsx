import React from "react";
import { Form, Input, Button, Rate } from "antd";

import { Map } from "../components/Map";

export function RatingPage() {
  const desc = ["horrível", "ruim", "normal", "bom", "condragulations"];
  const [rate, setRate] = React.useState(0);
  const onFinish = (values: any) => {
    console.log(values);
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} é um campo obrigatório!",
  };

  const handleRateChange = (value: number) => {
    setRate(value);
  };

  return (
    <>
      <div
        style={{
          height: "40%",
          position: "relative",
        }}
      >
        <Map />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          layout="vertical"
          style={{
            width: "70%",
            margin: 16,
          }}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Nome do local"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Comentário">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Rate tooltips={desc} onChange={handleRateChange} value={rate} />
            {rate ? (
              <span className="ant-rate-text">{desc[rate - 1]}</span>
            ) : (
              ""
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
