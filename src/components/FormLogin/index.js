import { useNavigate } from "react-router-dom";
import { Form , Input , Button, message } from "antd";

const FormLogin = () => {
    const navigate = useNavigate();
    const [form]=Form.useForm();

    const onSubmit = async ()=>{
        const values = await form.validateFields();
        console.log(values)
        if (values.email=== 'maimai@gmail.com' && values.password ==='xuanmai123') {
            localStorage.setItem('token',`${values.email}${values.password}`)
            navigate('/dashboard')
        }
        else{
            message.error('Thông tin đăng nhập không đúng')
        }
        /*
        apiLogin(values),then((res)=>{
            if(res.token){
                navigate('/dashboard')
            }
            else {
                message.error('Thông tin đăng nhập không đúng')
            }
        })
        */
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
export default FormLogin;