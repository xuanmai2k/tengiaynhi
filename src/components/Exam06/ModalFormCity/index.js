import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { FieldNumber } from "./styles";

const ModalFormCity = ({ loading, open, setOpen, formData, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  useEffect(() => {
    if (open && formData.id) {
      form.setFieldsValue(formData);
    }
  }, [open, formData]);

  const onOk = async () => {
    const values = await form.validateFields();
    onSubmit(formData.id, values);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} confirmLoading={loading} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Thành phố"
          rules={[{ required: true, message: "Thành phố là bắt buộc" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Quốc gia"
          rules={[{ required: true, message: "Quốc gia là bắt buộc" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="countryCode"
          label="Mã quốc gia"
          rules={[
            { required: true, message: "Mã quốc gia là bắt buộc" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="population"
          label="Dân số"
          rules={[{ required: true, message: "Dân số là bắt buộc" }]}
        >
          <FieldNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalFormCity;
