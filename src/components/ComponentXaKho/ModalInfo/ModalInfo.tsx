import React, { useMemo, useState } from "react";
import { Modal, Spin, Form, Input, Select, notification } from "antd";
import "./ModalInfo.scss";
import type { NotificationArgsProps } from "antd";

const { Option } = Select;

type NotificationPlacement = NotificationArgsProps["placement"];
interface ProductItem {
  name: string;
  price1: number;
}
const Context = React.createContext({ name: "Default" });
interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  product: ProductItem | null;
}
const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onCancel,
  product,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `Đặt hàng thành công`,
      description: (
        <Context.Consumer>
          {({ name }) => <span>Chúc mừng bạn đã đặt hàng thành công</span>}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [loading, setLoading] = useState(false);

  // Set default store value to the first option
  const [formData, setFormData] = useState({
    email: "Apple Center: 83 Trần Phú, P.4, Q.5",
  });

  const handleOk = async (values: any) => {
    console.log("Form data: ", values);
    setLoading(true);
    try {
      const dataToSend = {
        ...values,
        productName: product?.name,
        price: product?.price1,
        email: formData.email,
      };
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyk9SIAxTIM--HkPzDuOYbWzplDnLC1n527jwOW4-0m-uHehJtjr_PcH8U1coh-4hs/exec?sheet=thongkhachhangxakho",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    } finally {
      setLoading(false);
      openNotification("topRight");
      onCancel();
    }
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Modal visible={visible} onCancel={onCancel} footer={null} centered>
          <h2 className="ModalInfo-title">
            Nhập Thông Tin Để Chúng Tôi Liên Hệ Bạn Sớm nhất
          </h2>
          <Form layout="vertical" onFinish={handleOk}>
            <Form.Item
              label="Nhập họ tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    len: 10,
                    message: "Số điện thoại phải có 10 số!",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </div>

            {/* Store Dropdown with default selected option */}
            <Form.Item label="Chọn cửa hàng gần bạn">
              <Select
                defaultValue={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
              >
                <Option value="Apple Center: 83 Trần Phú, P.4, Q.5">
                  Apple Center: 83 Trần Phú, P.4, Q.5
                </Option>
                <Option value="Samsung Premium Store: 134 Trần Phú, P.4, Q.5">
                  Samsung Premium Store: 134 Trần Phú, P.4, Q.5
                </Option>
                <Option value="136 Trần Phú, P.4, Q.5">
                  136 Trần Phú, P.4, Q.5
                </Option>
                <Option value="225 Trần Quang Khải, P.Tân Định, Q.1">
                  225 Trần Quang Khải, P.Tân Định, Q.1
                </Option>
                <Option value="251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1">
                  251 - 253 Trần Hưng Đạo, P.Cô Giang, Q.1
                </Option>
                <Option value="581 Nguyễn Thị Thập, P.Tân Phong, Q.7">
                  581 Nguyễn Thị Thập, P.Tân Phong, Q.7
                </Option>
                <Option value="316 - 318 Ba Tháng Hai, P.12, Q.10">
                  316 - 318 Ba Tháng Hai, P.12, Q.10
                </Option>
                <Option value="480 - 482 Quang Trung, P.10, Gò Vấp">
                  480 - 482 Quang Trung, P.10, Gò Vấp
                </Option>
                <Option value="194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức">
                  194 Võ Văn Ngân, P.Bình Thọ, Thủ Đức
                </Option>
                <Option value="Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5">
                  Trung tâm bảo hành: 81 Trần Phú, P.4, Q.5
                </Option>
              </Select>
            </Form.Item>

            {loading && (
              <Form.Item>
                <button className="ModalInfo-button">
                  <span>Đang lấy thông tin</span>
                  <Spin />
                </button>
              </Form.Item>
            )}
            {!loading && (
              <Form.Item>
                <button className="ModalInfo-button">Đặt ngay</button>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Context.Provider>
    </>
  );
};

export default ModalForm;
