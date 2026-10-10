import { NavLink } from "react-router-dom"
import { useState, type FC } from "react"
import type { Article } from "../../Models/Models"
import { Card, Flex, Skeleton, Space, theme, Typography } from "antd"
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons"
interface ArticleProps {
    articles: Article
    loading: boolean
}

const CardItem: FC<ArticleProps> = ({ articles, loading }) => {
    const { Title, Paragraph, Text } = Typography
    const { token } = theme.useToken()
    const [isHover, setIsHover] = useState(false)
    return (
        <Card
            loading={loading}
            style={{ borderRadius: 12, overflow: "hidden", height: "fit-content" }}
            styles={{ body: { padding: 0 } }}
            cover={
                loading ? (
                    <div>
                        <Skeleton.Image active/>
                    </div>
                ) : (
                    <img loading="lazy" src={articles.image} alt="article" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )
            }
            className="hover:scale-105 transition! duration-200"
        >
            <Flex
                vertical
                gap={20}
                style={{ padding: 16 }}
            >
                <Title level={4} style={{ margin: 0 }}>
                    {articles.title}
                </Title>
                <Paragraph
                    ellipsis={{ rows: 3 }}
                    style={{ color: "rgba(0,0,0,0.7)", margin: 0 }}
                >
                    {articles.desc}
                </Paragraph>

                <NavLink
                    to={`article/${articles.id}`}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    style={{
                        display: "inline-flex",
                        width: "fit-content",

                        color: isHover ? token.colorLinkHover : token.colorLink,
                    }}
                >
                    <Space align="end">
                        <span>ادامه مقاله</span>
                        <span><ArrowLeftOutlined /></span>
                    </Space>
                </NavLink>
            </Flex>

            <Flex
                justify="space-between"
                align="center"
                style={{
                    borderTop: "1px solid rgba(0,0,0,0.3)",
                    background: "rgba(0,0,0,0.1)",
                    padding: 16,
                    fontSize: 14,
                }}
            >
                <Text>نویسنده: {articles.writter}</Text>
                <Space size={4}>
                    <Text><ClockCircleOutlined /></Text>
                    <Text>{articles.readingTime} دقیقه</Text>
                </Space>
            </Flex>
        </Card>
    )
}
export default CardItem