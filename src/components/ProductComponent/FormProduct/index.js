import { useEffect } from "react";
import { Form, Input, Modal, Image  } from "antd";

const FormProduct = ({ loading, open, setOpen, formData, onSubmit }) => {
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
                    <Form.Item name="code" label="Code" rules={[{ required: true, message:"Mã số là bắt buộc"}]}>
                        <Input placeholder="Code"/>
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message:"Giá là bắt buộc"}]}>
                        <Input placeholder="Price"/>
                    </Form.Item>
                    <Form.Item name="description" label="Description" >
                        <TextArea rows={4} placeholder="Description" maxLength={1000}/>
                    </Form.Item>
                    <Form.Item name="thumbnail" label="Thumbnail" >
                        <Image src=""/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default FormProduct;