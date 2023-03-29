
import { Form, Input, InputNumber, Modal} from "antd"; // dùng thẻ nào trong ant design thì khai báo
import { useEffect } from "react";

const ListStu = (props) => {
    const [form] = Form.useForm()
    // reset form
    useEffect(()=>{
        if(!props.open)// open = false
        form.resetFields()
    },[props.open])

    // đưa dữ liệu lên formData, cho hàm edit
    useEffect(()=>{
        if(props.open && props.formData.id)// open = true và formData đã có Value của id
        form.setFieldsValue(props.formData)
    },[props.open, props.formData])

    const onSubmit = async () => {
        const values = await form.validateFields()// kiểm tra dữ liệu có đúng hay không
        props.onSubmit(props.formData.id, values) // formData.id là giá trị ẩn, dòng này giống return ở C
        //props.onSubmit({id: props.formData.id, data: values})
    }

    const onCancel = () => { // khi bấm nút cancel
        props.setOpen(false)// đóng cửa sổ 
    }
    // form chỉ lấy được giá trị nhập vào input, không lấy được giá trị ẩn
  return (
      <div>
        <Modal open={props.open} onOk={onSubmit} onCancel={onCancel}>
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: "Họ tên là bắt buộc"}]}>
                    <Input placeholder="name"/>
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: "Email là bắt buộc"},{type: 'email',message:"Email format không đúng"}]}>
                    <Input placeholder="email"/>
                </Form.Item>
                <Form.Item name="studentID" label="Mã số">
                    <Input placeholder="ID"/>
                </Form.Item>
                <Form.Item name="className" label="Lớp">
                    <Input placeholder="classname"/>
                </Form.Item>
                <Form.Item name="score" label="Điểm" rules={[{ required: true, message: "Điểm là bắt buộc"}]}>
                    <InputNumber placeholder="score"/>
                </Form.Item>
            </Form>
        </Modal>
      </div>
  );
}

export default ListStu;