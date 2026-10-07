import { Layout } from "antd"
import NavBar from "../../components/NavBar/NavBar"

const Panel = () => {
    const { Header } = Layout
    return (
        <Layout>
            <Header>
                <NavBar />
            </Header>
            <h1 className="text-4xl pt-24 text-center">panel page</h1>
        </Layout>
    )
}
export default Panel