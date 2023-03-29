import { Form , Input , Button } from "antd";

const Exam03 = ({onLogin}) => {
    const [form]=Form.useForm();
    const onSubmit = async ()=>{
        const values = await form.validateFields();
        console.log(values)
        // do something
        onLogin(values)
    };

    return (
        <div>
            <Form form={form} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true},{type: 'email'}]}>
                    <Input placeholder="email"/>
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true}]}>
                    <Input placeholder="score"/>
                </Form.Item>
                <Button type="primary" onClick={onSubmit}>Login</Button>
            </Form>
        </div>
    );
}
export default Exam03;