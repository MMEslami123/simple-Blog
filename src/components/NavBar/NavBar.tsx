import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { isLogin } from "../../Utils/Util"
import { Button, Drawer, Grid, Menu, type MenuProps } from "antd"
import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { useState } from "react"

const NavBar = () => {
    const { useBreakpoint } = Grid
    const loginHandler = () => {
        document.cookie = "username=admin; expires=Thu, 18 Dec 2013 12:00:00 UTC"
    }
    const location = useLocation();
    const navigate = useNavigate();
    const screen = useBreakpoint();
    const isMobile = screen.sm;
    const [showDrawer, setShowDrawer] = useState(false)

    const menuItems: MenuProps["items"] = [
        {
            key: "/", label: "خانه"
        },
        {
            key: "/about", label: " درباره ما"
        },
        {
            key: "/add-article", label: "ساخت مقاله"
        },
        {
            key: "/panel", label: "پنل"
        }
    ]


    return (
        isMobile ? (
            <div className="lg:max-w-7xl mx-auto fixed top-6 left-0 right-0 z-50 xl:px-0 px-2.5">
                <div className="flex justify-between items-center
         bg-white rounded-xl py-2 px-10">
                    <h1 className="text-2xl"><strong>وبلاگ من</strong></h1>
                    <Menu
                        items={menuItems}
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        onClick={(e) => navigate(e.key)}
                        className="border-b-0!"
                        classNames={{
                            item: "[&.ant-menu-item-selected]:underline! underline-offset-8! transition!"
                        }}
                    >

                    </Menu>
                    {
                        isLogin() ? (
                            <NavLink to={"/login"} onClick={loginHandler} >
                                <Button
                                    size="large"
                                    type="primary"
                                    styles={{
                                        root: {
                                            boxShadow: "none"
                                        }
                                    }}>
                                    <span>{<UserOutlined/>}</span>
                                    <span>خروج</span>
                                </Button>
                            </NavLink>
                        ) :
                            <NavLink to={"/login"}>
                                <Button
                                    size="large"
                                    type="primary"
                                    styles={{
                                        root: {
                                            boxShadow: "none"
                                        }
                                    }}>
                                    <span><UserOutlined /></span>
                                    <span>ورود</span>
                                </Button>
                            </NavLink>
                    }
                </div>
            </div>
        ) : (
            <div className="lg:max-w-7xl mx-auto fixed  left-0 right-0 z-50 xl:px-0 ">
                <div className="flex justify-between items-center
         bg-white  py-2 px-10">
                    <h1 className="text-2xl"><strong>وبلاگ من</strong></h1>
                    <Button>
                        <MenuOutlined onClick={() => setShowDrawer(true)} className="text-xl" />
                    </Button>
                    <Drawer size={"250px"} title={"وبلاگ من"} open={showDrawer} onClose={() => setShowDrawer(false)}>

                        <Menu
                            items={menuItems}
                            mode="vertical"
                            selectedKeys={[location.pathname]}
                            onClick={(e) => navigate(e.key)}
                            className="border-b-0!"
                            classNames={{
                                item: "[&.ant-menu-item-selected]:bg-gray-100! hover:bg-gray-100! underline-offset-8! transition!"
                            }}
                        >

                        </Menu>
                        {
                            isLogin() ? (
                                <Button
                                    size="large"
                                    type="primary"
                                    styles={{
                                        root: {
                                            boxShadow: "none"
                                        }
                                    }}>
                                    <NavLink to={"/login"} onClick={loginHandler}>
                                        <span>{<UserOutlined/>}</span>
                                        <span>خروج</span>
                                    </NavLink>
                                </Button>
                            ) :
                                <div className="mx-2">
                                    <Button
                                        size="large"
                                        type="primary"
                                        styles={{
                                            root: {
                                                boxShadow: "none"
                                            }
                                        }}>
                                        <NavLink to={"/login"}>
                                            <span><UserOutlined /></span>
                                            <span>ورود</span>
                                        </NavLink>
                                    </Button>
                                </div>
                        }
                    </Drawer>
                </div>
            </div>

        )

    )
}
export default NavBar