import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../components/layout';
import Header from '../../components/header';
import About from '../about/about';
import Connections from '../connections/connections';
import ImportCampaigns from '../import-campaigns/import-campaigns';
import { ToastContainer } from 'react-toastify';

const Home = () => {
	return (
		<HashRouter>
			<Layout>
				<Header />
				<ToastContainer position="bottom-right" />
				<Routes>
					<Route path="/" element={ <ImportCampaigns /> } />
					<Route path="/about" element={ <About /> } />
					<Route path="/connections" element={ <Connections /> } />
					<Route
						path="/import-campaigns/*"
						element={ <ImportCampaigns /> }
					/>
				</Routes>
			</Layout>
		</HashRouter>
	);
};

export default Home;
