import { useState } from "react";
import { Form, Input, Select, Button } from 'antd'

// tạo 1 form dki với email, password, confirm password, phone number, country

const Exam04 = () => {
    const [form] = Form.useForm()

    const onSubmit = async ()=>{
        const values = await form.validateFields();
        console.log(values)
        // do something
        onLogin(values)
    };
    return (
        <Form form={form} layout='vertical'>
            <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
                <Input placeholder="email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input placeholder="score" />
            </Form.Item>
            <Form.Item name="confirm" label="Confirm Password"
                dependencies={["password"]}// phụ thuộc vào password
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({// đưa dữ liệu được nhập ở password vào
                        validator(_, value) {// _ : ruleObject
                            if (!value || getFieldValue("password") === value) { // !value: kiểm tra giá trị của password xem có tồn tại hay không, nếu có thì trả về true
                                return Promise.resolve(); // ok
                            }
                            return Promise.reject( // reject từ chối không tiếp nhận 
                                new Error("The two passwords that you entered do not match!")
                            );
                        },
                    }),
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[
                { required: true },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {// số 84, 0...
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("Phone number format is wrong")
                        );
                    },
                })
            ]}>
                <Input />
            </Form.Item>
            <Form.Item name='country' label='Country' rules={[]}>
                <Select options={[{ value: 'VN', label: 'Vietnam' }, { value: 'US', label: 'USA' }]} />
            </Form.Item>
            <Button type="primary" onClick={onSubmit}>Sign up</Button>
        </Form>
    );
}

export default Exam04;