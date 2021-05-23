import { FormEvent } from 'react';
import { useAuth } from 'context/auth-context';
import { Input, Form, Button } from 'antd';

export const RegistryScreen = () => {
    const { register } = useAuth();

    const hanleSubmit = ({ username, password }: { username: string; password: string }) => {
        // 阻止默认表单提交行为
        // event?.preventDefault();
        // const username = (event?.currentTarget?.elements[0] as HTMLInputElement)?.value;
        // const password = (event?.currentTarget?.elements[1] as HTMLInputElement)?.value;
        // console.log(username, password);

        register({ username, password });
    };
    return (
        <Form
            onFinish={hanleSubmit}
            initialValues={{
                username: '',
                password: '',
            }}
        >
            <Form.Item
                name={'username'}
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input type="text" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    注册
                </Button>
            </Form.Item>

            {/* <div>
                <label htmlFor="password">密码</label>
                <input type="password" name="" id="password" />
            </div> */}
            {/* <button type="submit">登录</button> */}
        </Form>
    );
};
