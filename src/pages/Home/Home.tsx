import NavBar from "../../components/NavBar/NavBar"
import CardItem from "../../components/CardItem/CardItem";
import { useEffect } from "react"
import { Button, Col, Layout, Result, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchArticles } from "../../Redux/ArticleSlice";

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
            <Content className="max-w-7xl mx-auto px-4 pt-24">
                {articles.length > 0 ? (
                    <div>
                        <p className="my-6 text-3xl">لیست مقالات</p><Row gutter={[20, 20]} className="py-6">
                            {articles.map(article => (<Col lg={6} key={article.id}><CardItem articles={article} loading={loading} /></Col>))}
                        </Row>
                    </div>
                )
                    :
                    (<Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary">Back Home</Button>}
                    />)}
            </Content>
        </Layout>
    )
}
export default Home