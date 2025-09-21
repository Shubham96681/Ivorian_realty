import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PropertySearch from './pages/PropertySearch';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<PropertySearch />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* Add more routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

