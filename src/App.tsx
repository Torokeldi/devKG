import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import JobOpenings from "./pages/JobOpenings/JobOpenings";
import Events from "./pages/Events/Events";
import Video from "./pages/VideosDev/Videos";
import Organizations from "./pages/Organizations/Organizations";
import Community from "./pages/Community/Community";
import AddVacancy from "./pages/addVacancy/addVacancy"
import JobPage from "./components/JobPage/JobPage";
import FormPages from "./pages/FormPages/FormPages";
import OrganizationPage from "./components/OrganizationPage/OrganizationPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/FormPages",
        element: <FormPages />,
    },
    {
        path: "/jobs",
        element: <JobOpenings />,
    },
    {
        path: "/Events",
        element: <Events />,
    },
    {
        path: "/Video",
        element: <Video />,
    },
    {
        path: "/Organizations",
        element: <Organizations />,
    },
    {
        path: "/Community",
        element: <Community />,
    },
    {
        path: "/AddVacancy",
        element: <AddVacancy />,
    },
    {
        path: "/organizations/:id",
        element: <OrganizationPage />,
    },
    {
        path: "/jobpage/:id",
        element: <JobPage />,
    },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;
