// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { useDispatch } from 'react-redux'
import { AUTHORIZATION_TOKEN } from './actions/auth';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function App() {

  const dispatch = useDispatch()

  const fetchDataFromRedux = async () => {
    await dispatch(AUTHORIZATION_TOKEN())
	}

	useEffect(() => {		
			fetchDataFromRedux();
	}, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
