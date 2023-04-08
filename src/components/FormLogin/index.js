import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message  } from "antd";

const FormLogin = () =>{
    const navigate = useNavigate();
    const [form]=Form.useForm();
    const onSubmit = async () =>{
        const values = await form.validateFields();
        if (values.email==="xuanmai@gmail.com"&& values.password==="xuanmai"){
            localStorage.setItem('token',`${values.email}${values.password}`)
            navigate('/dashboard');
        }
        else{
            message.error('Thông thin đăng nhập không đúng');
        }
    }
    return(
        <div>
            <Form form={form} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{required: true},{type: 'email'}]}>
                    <Input placeholder="Email"/>
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{required: true}]}>
                    <Input placeholder="Password"/>
                </Form.Item>
                <Button type="primary" onClick={onSubmit}>Login</Button>
            </Form>
        </div>
    )
}
export default FormLogin;