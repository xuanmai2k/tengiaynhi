
import { useEffect } from "react";
import { Form, Input, Select, Modal } from "antd";
import { PageNumber } from "./styles";

const Exam05 = (props) => {
    
    const [form] = Form.useForm()
    const { TextArea } = Input;
    const onChange = (value) => {
        console.log('changed', value);
      };

      useEffect(()=>{
        if(!props.open)
        form.resetFields()
    },[props.open])

    useEffect(()=>{
        if(props.open && props.formData.id)
        form.setFieldsValue(props.formData)
    },[props.open, props.formData])
    
    const onSubmit = async ()=>{
        const values = await form.validateFields();
        props.onSubmit(props.formData.id, values)
    };
    
    const onCancel = () => { 
        props.setOpen(false)
    }
    return(
        <Modal open={props.open} confirmLoading={props.loading} onOk={onSubmit} onCancel={onCancel}>
            <Form form={form} layout='vertical'>
                <Form.Item name="title" label="Title:" rules={[{ required: true }]}>
                    <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="author" label="Author:" rules={[{ required: true }]}>
                    <Input placeholder="Author" />
                </Form.Item>
                <Form.Item name="description" label="Description:">
                    <TextArea rows={4} placeholder="maxLength is 1000" maxLength={6} />
                </Form.Item>
                <Form.Item name="type" label="Type:">
                    <Select options={[{ value: 'horrible', label: 'Horrible' }, { value: 'romantic', label: 'Romantic' }, { value: 'action', label: 'Action' }]} />
                </Form.Item>
                <Form.Item name="page" label="Page:">
                    <PageNumber min={1} max={1000000} defaultValue={3} onChange={onChange} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default Exam05;