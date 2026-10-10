import NavBar from "../../components/NavBar/NavBar"
import CardItem from "../../components/CardItem/CardItem";
import { useEffect } from "react"
import { Button, Col, Layout, Result, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchArticles } from "../../Redux/ArticleSlice";
import type { Article } from "../../Models/Models";

const Home = () => {
    const { Header, Content } = Layout
    const dispatch = useAppDispatch();
    const { items: articles, loading, } = useAppSelector(state => state.articles)

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch])
    return (
        <Layout>
            <Header>
                <NavBar />
            </Header>
            <Content className="w-full max-w-7xl mx-auto px-4 pt-24">
                {/* {articles.length > 0 ? ( */}
                {!loading && articles.length === 0 ? (
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                ) : (
                    <div>
                        <p className="my-6 text-3xl">لیست مقالات</p>

                        <Row gutter={[20, 20]} className="py-6">

                            {loading && articles.length === 0
                                ? Array.from({ length: 8 }).map((_, i) => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={i}>
                                        <CardItem articles={{} as Article} loading />
                                    </Col>
                                ))
                                : articles.map(article => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={article.id}>
                                        <CardItem articles={article} loading={false} />
                                    </Col>
                                ))}
                        </Row>
                    </div>
                )}
                {/* )
                    :
                    (
                        <Flex align="center" className="h-[calc(100vh-200px)]">
                            <Spin classNames={{ indicator: "text-blue-700" }} size="large" />
                        </Flex>
                    )} */}
            </Content>
        </Layout>
    )
}
export default Home