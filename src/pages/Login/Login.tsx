import NavBar from "../../components/NavBar/NavBar"
import "./Login.css"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout } from "antd";
interface LoginValues {
    username: string,
    password: string,
}
const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { Header, Content } = Layout
    const submitHandler = (values: LoginValues) => {
        console.log(values);

        if (values.username.trim() == "admin" && values.password.trim() == "12345") {
            document.cookie = "username=admin; expires=Thu, 18 Dec 2029 12:00:00 UTC";
            Swal.fire({
                title: "ورود موفق",
                icon: "success",
            });
            navigate("/panel");
        }
        else {
            Swal.fire({
                text: "نام کاربری یا رمز عبور اشتباه است",
                icon: "error",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            });
            form.resetFields()
        }
    }
    return (
        <Layout>
            <Header>
                <NavBar />
            </Header>
            <Content className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
                <div className="bg-white p-5 space-y-5 rounded">
                    <Form
                        onFinish={submitHandler}
                        form={form}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: "نام کاربری را وارد کنید" }, { min: 3, message: "حداقل 3 حرف وارد کنید" }]}
                        >
                            <Input placeholder="نام کاربری" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "لطفا رمز عبور را وارد کنید" }]}
                        >
                            <Input.Password placeholder="رمز عبور" />
                        </Form.Item>
                        <Form.Item>
                            <Button block htmlType="submit" type="primary" >ورود</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    )
}
export default Login