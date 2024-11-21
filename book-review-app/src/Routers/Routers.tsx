import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import Login from "../components/Login";
import BookReviewPage from "../pages/BrowseBook";
import Register from "../components/Register";
import UpdateBookPage from "../components/UpdateBook";
import BookDetailsPage from "../pages/BookDetails";
import ExploreBookPage from "../pages/ExploreBooks";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path:'/',element:<HomePage/>},
        ]

    },
    {
        path:'/books',
        element:<ExploreBookPage/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/review-book',
        element: <BookReviewPage/>,
    },
    {
        path:'/review-book/:id',
        element:<UpdateBookPage/>
    },
    {
        path: '/review/:id',
        element: <BookDetailsPage/>
    }
    
]);

export default router;