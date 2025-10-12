import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import PropertyDetails from './pages/PropertyDetails';
import PropertySearch from './pages/PropertySearch';

// Buy/Rent Pages
import SingleFamilyHomes from './pages/buy/SingleFamilyHomes';
import TownhousesCondos from './pages/buy/TownhousesCondos';
import RentalSearch from './pages/rent/RentalSearch';

// Home Values Pages
import HomeValuesSearch from './pages/home-values/HomeValuesSearch';

// Explore Pages
import Schools from './pages/explore/Schools';

// Agents Pages
import RealEstateAgents from './pages/agents/RealEstateAgents';

// Mortgage Pages
import MortgageCenter from './pages/mortgage/MortgageCenter';

// Commercial Pages
import CommercialProperties from './pages/commercial/CommercialProperties';

// Global Pages
import GlobalProperties from './pages/global/GlobalProperties';

// Agents Pages
import Agents from './pages/agents/Agents';

// Home Values Pages
import HomeValues from './pages/home-values/HomeValues';

// Cities Pages
import Cities from './pages/cities/Cities';

// About Pages
import About from './pages/about/About';

// Newsroom Pages
import Newsroom from './pages/newsroom/Newsroom';

// Contact Pages
import Contact from './pages/contact/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<PropertySearch />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Buy/Rent Routes */}
            <Route path="single-family-homes" element={<SingleFamilyHomes />} />
            <Route path="townhouses-condos" element={<TownhousesCondos />} />
            <Route path="rental-search" element={<RentalSearch />} />
            
            {/* Home Values Routes */}
            <Route path="home-values-search" element={<HomeValuesSearch />} />
            
            {/* Explore Routes */}
            <Route path="schools" element={<Schools />} />
            
            {/* Agents Routes */}
            <Route path="real-estate-agents" element={<RealEstateAgents />} />
            <Route path="real-estate-agent" element={<RealEstateAgents />} />
            
            {/* Mortgage Routes */}
            <Route path="mortgage-center" element={<MortgageCenter />} />
            
            {/* Commercial Routes */}
            <Route path="commercial" element={<CommercialProperties />} />
            
            {/* Global Routes */}
            <Route path="global" element={<GlobalProperties />} />
            
            {/* Agents Routes */}
            <Route path="agents" element={<Agents />} />
            
            {/* Home Values Routes */}
            <Route path="home-values" element={<HomeValues />} />
            
            {/* Cities Routes */}
            <Route path="cities" element={<Cities />} />
            
            {/* About Routes */}
            <Route path="about" element={<About />} />
            
            {/* Newsroom Routes */}
            <Route path="newsroom" element={<Newsroom />} />
            
            {/* Contact Routes */}
            <Route path="contact" element={<Contact />} />
            
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<PropertySearch />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

