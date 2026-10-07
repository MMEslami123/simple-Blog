import { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar"
import { useNavigate, useParams } from "react-router-dom";
import type { Article } from "../../Models/Models";
import Swal from "sweetalert2";
import { Button, Form, Input, InputNumber, Layout } from "antd";
import { useAppDispatch } from "../../Redux/hooks";
import { addArticle, editArticle, fetchArticleById } from "../../Redux/ArticleSlice";

const AddArticle = () => {
  const id = useParams().articleId!;
  const action = id ? "edit" : "add";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Header, Content } = Layout;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (action == "edit") {
      dispatch(fetchArticleById(id)).unwrap()
        .then(data => {
          form.setFieldsValue(data);
        })
    }
  }, [id, action, form, dispatch]
  )
  const submitHandler = (values: Article) => {
    if (action == "add") {
      dispatch(addArticle(values)).unwrap()
        .then(() => {
          Swal.fire({
            text: "مقاله با موفقیت ایجاد شد",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
          form.resetFields();
        }
        ).catch(() => {
          Swal.fire({
            text: "مقاله ایجاد نشد",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
        })
    }
    else {
      dispatch(editArticle({ id, values })).unwrap()
        .then(() => {
          Swal.fire({
            title: "مقاله با موفقیت ویرایش شد",
            icon: "success",
          });
          navigate("/");
        })
        .catch(() => {
          Swal.fire({
            text: "ویرایش مقاله ناموفق بود",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });
        });
    }
  }

  return (
    <Layout className="block!">
      <Header>
        <NavBar />
      </Header>
      <Content className="max-w-4xl mx-auto px-4 pt-24 space-y-3">
        <Form
          form={form}
          layout="vertical"
          onFinish={submitHandler}
        >
          <Form.Item
            label="عنوان مقاله"
            name="title"
            rules={[{ required: true, message: "عنوان مقاله را وارد کنید" }]}
          >
            <Input placeholder="عنوان مقاله خود را وارد کنید" />
          </Form.Item>

          <Form.Item
            label="توضیح کوتاه"
            name="desc"
            rules={[{ required: true, message: "توضیح کوتاه را وارد کنید" }]}
          >
            <Input placeholder="یه توضیح کوتاه در مورد مقاله وارد کنید" />
          </Form.Item>

          <Form.Item
            label="نویسنده مقاله"
            name="writter"
            rules={[{ required: true, message: "نام نویسنده را وارد کنید" }]}
          >
            <Input placeholder="نام نویسنده مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item
            label="موضوع مقاله"
            name="category"
            rules={[{ required: true, message: "موضوع مقاله را وارد کنید" }]}
          >
            <Input placeholder="موضوع مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item
            label="عکس مقاله"
            name="image"
            rules={[{ required: true, message: "آدرس عکس را وارد کنید" }]}
          >
            <Input placeholder="آدرس عکس مقاله را وارد کنید" />
          </Form.Item>

          <Form.Item
            label="مدت زمان خواندن"
            name="readingTime"
            rules={[
              { required: true, message: "مدت زمان خواندن را وارد کنید" },
              { type: "number", min: 1, message: "مدت زمان باید حداقل ۱ دقیقه باشد", }
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {action === "add" ? "ساخت مقاله" : "ویرایش مقاله"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  )
}
export default AddArticle