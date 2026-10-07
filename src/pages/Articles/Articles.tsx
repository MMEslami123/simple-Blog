import { useNavigate, useParams } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import { useEffect, useState } from "react";
import { Button, Card, Col, Flex, Layout, message, Modal, Row, Skeleton, Space, theme, Typography } from "antd";
import { ClockCircleOutlined, DeleteFilled, EditOutlined, FormOutlined, ProductOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { deleteArticle, fetchArticleById } from "../../Redux/ArticleSlice";

const Articles = () => {
    const [deleteHover, setDeleteHover] = useState(false)
    const [editHover, setEditHover] = useState(false)
    const dispatch = useAppDispatch();
    const { current: article, loading } = useAppSelector(state => state.articles)

    const { Header, Content } = Layout
    const { Paragraph, Text, Title } = Typography
    const id = useParams().articleId!;
    const { token } = theme.useToken()
    const navigate = useNavigate();
    message.config({ top: innerHeight / 2 - 20 })
    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id])
    const DeleteHandler = () => {
        Modal.confirm({
            title: "آیا از حذف مطمئن هستید؟",
            okText: "آره",
            cancelText: "بیخیال!",
            centered: true,
            mask: {
                closable: true,
                blur: true,
            },
            cancelButtonProps: { className: "delete-btn" },
            onOk: () => {
                dispatch(deleteArticle(id)).unwrap().then(() => {
                    message.success("مقاله با موفقیت حذف شد");
                    navigate("/")
                })
            }
        })
    }

    return (
        <Layout>
            <Header>
                <NavBar />
            </Header>
            <Content className="max-w-7xl mx-auto px-4 pt-36">
                <Row className="justify-center" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, { xs: 16, sm: 16, md: 24, lg: 0 }]}>
                    <Col lg={8} md={14} sm={12}>
                        <Card
                            loading={loading}
                            style={{ borderRadius: 12 }}
                            styles={{ body: { padding: 0, overflow: "hidden" }, cover: { padding: "0px 16px" } }}
                            cover={
                                loading ? (
                                    <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                                ) : (
                                    <img loading="lazy" src={article?.image} className="rounded-lg! relative -top-5" alt="article" />
                                )
                            }
                            className="sticky! top-36"
                        >
                            <Flex
                                vertical
                                gap={20}
                                style={{ padding: 16 }}
                            >
                                <Title level={3} style={{ margin: 0, textAlign: "center" }}>
                                    {article?.title}
                                </Title>
                                <Space>
                                    <Text><EditOutlined /></Text>
                                    <Text>نویسنده: {article?.writter}</Text>
                                </Space>
                                <Space>
                                    <Text><ClockCircleOutlined /></Text>
                                    <Text>مدت زمان مطالعه: {article?.readingTime}</Text>
                                </Space>
                                <Space>
                                    <Text><ProductOutlined /></Text>
                                    <Text>دسته بندی: {article?.category}</Text>
                                </Space>
                            </Flex>
                            <Flex justify="center" gap={5} className="my-5!">
                                <Button
                                    danger
                                    icon={<DeleteFilled />}
                                    onClick={DeleteHandler}
                                    onMouseEnter={() => setDeleteHover(true)}
                                    onMouseLeave={() => setDeleteHover(false)}
                                    style={{
                                        color: deleteHover ? "#fff" : token.colorError,
                                        background: deleteHover ? token.colorError : "transparent",
                                        borderColor: token.colorError,
                                        transition: `all ${token.motionDurationMid}`,
                                    }}
                                >
                                    حذف مقاله
                                </Button>
                                <Button
                                    onClick={() => navigate(`/edit-article/${id}`)}
                                    icon={<FormOutlined />}
                                    onMouseEnter={() => setEditHover(true)}
                                    onMouseLeave={() => setEditHover(false)}
                                    style={{
                                        color: editHover ? "#fff" : token.colorInfo,
                                        background: editHover ? token.colorInfo : "transparent",
                                        borderColor: token.colorInfo,
                                        transition: `all ${token.motionDurationMid}`
                                    }}

                                >
                                    ویرایش مقاله
                                </Button>
                            </Flex>
                        </Card>
                    </Col>
                    <Col lg={16} md={24}>
                        <Space vertical>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                            <Paragraph>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</Paragraph>
                        </Space>
                    </Col>
                </Row>

            </Content>
        </Layout>
    )
}
export default Articles