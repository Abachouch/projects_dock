import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import './App.css';
import { TitleBar } from '@/renderer/components/titlebar';
import { ProjectsList } from './components/projects-list';
import { Input } from './components/ui/input';
import { ThemeProvider } from './components/theme-provider';

function Home() {
  return (
    <div>
      <div className="p-4 flex flex-col gap-4">
        <Input placeholder="Search Projects" />
        <ProjectsList></ProjectsList>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TitleBar></TitleBar>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
