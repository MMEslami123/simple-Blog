import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "../../test/Test-Utils"
import Home from "./Home"
import { useLocation } from "react-router-dom"
import axios from "axios"
import type { Article } from "../../Models/Models"


vi.mock("axios")
const ShowLocation = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>
}
const fakeArticles= [
    { id: "1", title: "مقاله اول", desc: "توضیح اول", image: "", writter: "علی", readingTime: "3" },
    { id: "2", title: "مقاله دوم", desc: "توضیح دوم", image: "", writter: "سارا", readingTime: "5" },
] as Article[]
describe("test 1", () => {
    test("test 1-1", () => {
        renderWithProviders(<Home />)
        expect(screen.getByText('وبلاگ من')).toBeInTheDocument();
    });
    test('test 1-2', () => {
        renderWithProviders(<Home />)
        expect(screen.getByText("ورود")).toBeInTheDocument();
    });
    test('test 1-3', () => {
        renderWithProviders(<Home />)
        expect(screen.getByText("خانه")).toBeInTheDocument();
    });
    test('test 1-4', () => {
        renderWithProviders(<Home />)
        expect(screen.getByText("404")).toBeInTheDocument();
    });
    test('test 1-5', async () => {
        renderWithProviders(<>
            <Home />
            <ShowLocation />
        </>)
        await userEvent.click(await screen.findByText("درباره ما"));
        expect(screen.getByTestId("location")).toHaveTextContent("/about")
    });
    test('test 1-6', async () => {
        renderWithProviders(<>
            <Home />
            <ShowLocation />
        </>)
        await userEvent.click(await screen.findByText("ساخت مقاله"));
        expect(screen.getByTestId("location")).toHaveTextContent("/add-article");
    });
    test('test 1-7', async () => {
        renderWithProviders(<>
            <Home />
            <ShowLocation />
        </>)
        await userEvent.click(await screen.findByText("پنل"));
        expect(screen.getByTestId("location")).toHaveTextContent("/panel");
    });
    test('test 1-8', async () => {
        renderWithProviders(<>
            <Home />
            <ShowLocation />
        </>)
        await userEvent.click(await screen.findByText("ورود"));
        expect(screen.getByTestId("location")).toHaveTextContent("/login");
    });
    test('test 1-9', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: fakeArticles })
        renderWithProviders(<Home />)
        expect(await screen.findByText("مقاله اول")).toBeInTheDocument();
        expect(screen.getByText("مقاله دوم")).toBeInTheDocument();
    });
    test('test 1-10', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: [fakeArticles[0]] });
        renderWithProviders(<>
            <Home />
            <ShowLocation />
        </>);
        await userEvent.click(await screen.findByText("ادامه مقاله"));
        expect(screen.getByTestId("location")).toHaveTextContent(`/article/${fakeArticles[0].id}`);
    });

})