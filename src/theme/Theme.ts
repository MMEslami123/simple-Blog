import type { ThemeConfig } from "antd";


const Theme: ThemeConfig = {
    token: {
        colorPrimary: "black",
        colorPrimaryHover: "#f54900",
        colorLinkHover: "#ea580c",
        colorLink: "black",

    },
    components: {
        Layout: {
            bodyBg: "lightgray",
            headerBg: "lightgray"
        },
        Menu: {
            itemColor: "#000",
            itemHoverColor: "#ea580c",
            horizontalItemHoverColor: "#ea580c",

            itemSelectedColor: "#ea580c",
            horizontalItemSelectedColor: "#ea580c",

            itemHoverBg: "transparent",
            horizontalItemHoverBg: "transparent",
            horizontalItemSelectedBg: "transparent",
            
            itemMarginInline: 8,
            
            activeBarHeight: 0,

        },
        Input: {
            activeShadow: "0 0 0 2px rgba(234, 88, 12, .3);",
            activeBorderColor: "#ea580c",
        },
        

    }
}

export default Theme
