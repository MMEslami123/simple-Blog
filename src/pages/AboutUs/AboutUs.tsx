import { Layout } from "antd"
import NavBar from "../../components/NavBar/NavBar"

const AboutUs = () => {
    const { Header } = Layout
    return (
        <Layout>
            <Header>
                <NavBar />
            </Header>
            <h1 className="text-4xl pt-24 text-center">about page</h1>
        </Layout>
    )
}
export default AboutUs