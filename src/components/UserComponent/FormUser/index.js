import { useEffect } from "react";
import { Form, Input, Modal, Image  } from "antd";

const FormUser = ({ loading, open, setOpen, formData, onSubmit }) => {
    const [form] = Form.useForm();
    const { TextArea } = Input;

    useEffect(()=>{
        if(!open){
            form.resetFields();
        }
    },[open]);

    useEffect(()=>{
        if(open && formData.id){
            form.setFieldsValue(formData);
        }
    },[open, formData]);

    const onOk = async () => {
        const values = await form.validateFields();
        onSubmit(formData.id, values);
    };

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal open={open} confirmLoading={loading} onOk={onOk} onCancel={onCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message:"Tên là bắt buộc"}]}>
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message:"Email là bắt buộc"},{type: 'email'}]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message:"Điện thoại là bắt buộc"}]}>
                        <Input placeholder="Phone"/>
                    </Form.Item>
                    <Form.Item name="status" label="Status" >
                        <TextArea rows={4} placeholder="Status" maxLength={100}/>
                    </Form.Item>
                    <Form.Item name="avatar" label="Avatar" >
                        <Image src=""/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default FormUser;