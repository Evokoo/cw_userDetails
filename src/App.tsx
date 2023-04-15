//Styles
import "./App.scss";

//Router
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom";

//Components
import SearchForm from "./components/SearchForm";
import RootLayout from "./layouts/RootLayout";
import UserResults from "./components/UserResults";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<SearchForm />} />
			<Route path='result' element={<UserResults />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
