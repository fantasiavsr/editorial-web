import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/landing/LandingPage';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
