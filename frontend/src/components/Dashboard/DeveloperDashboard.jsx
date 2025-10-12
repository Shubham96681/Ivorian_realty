import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  HomeIcon, 
  BellIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const DeveloperDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [financials, setFinancials] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalInvestment: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setProjects([
      { 
        id: 1, 
        title: 'Metro Plaza Development', 
        location: 'Downtown', 
        type: 'Mixed-Use',
        status: 'Development',
        progress: 45,
        budget: '$15,000,000',
        completionDate: '2025-08-15',
        investors: 3,
        image: '/api/placeholder/300/200'
      },
      { 
        id: 2, 
        title: 'Residential Complex Phase 2', 
        location: 'Suburbs', 
        type: 'Residential',
        status: 'Planning',
        progress: 20,
        budget: '$8,500,000',
        completionDate: '2025-12-30',
        investors: 2,
        image: '/api/placeholder/300/200'
      }
    ]);

    setInquiries([
      { id: 1, project: 'Metro Plaza Development', client: 'Investment Group ABC', message: 'Interested in partnership opportunity', time: '3 hours ago' },
      { id: 2, project: 'Residential Complex Phase 2', client: 'John Smith', message: 'Need more details about the project ROI', time: '1 day ago' }
    ]);

    setFinancials([
      { id: 1, project: 'Metro Plaza Development', investment: '$5,000,000', return: '$7,500,000', roi: '50%' },
      { id: 2, project: 'Residential Complex Phase 2', investment: '$3,000,000', return: '$4,200,000', roi: '40%' }
    ]);

    setStats({
      totalProjects: 2,
      activeProjects: 1,
      completedProjects: 0,
      totalInvestment: 8000000
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Developer Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Development Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total Projects</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalProjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <WrenchScrewdriverIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Active Projects</p>
                <p className="text-2xl font-bold text-green-900">{stats.activeProjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-600">Completed</p>
                <p className="text-2xl font-bold text-purple-900">{stats.completedProjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Total Investment</p>
                <p className="text-2xl font-bold text-orange-900">${stats.totalInvestment.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          to="/add-development"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Add Development</h4>
              <p className="text-sm text-gray-500">Start new project</p>
            </div>
          </div>
        </Link>

        <Link
          to="/my-projects"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
              <HomeIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">My Projects</h4>
              <p className="text-sm text-gray-500">{projects.length} active projects</p>
            </div>
          </div>
        </Link>

        <Link
          to="/project-management"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Project Management</h4>
              <p className="text-sm text-gray-500">Track progress</p>
            </div>
          </div>
        </Link>

        <Link
          to="/financial-reports"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Financial Reports</h4>
              <p className="text-sm text-gray-500">View analytics</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Inquiries</h3>
          <Link to="/inquiries" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{inquiry.client}</p>
                  <span className="text-sm text-gray-400">{inquiry.time}</span>
                </div>
                <p className="text-sm text-gray-600">{inquiry.project}</p>
                <p className="text-sm text-gray-500 mt-1">{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Projects */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">My Projects</h3>
          <Link to="/my-projects" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Manage All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{project.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Development' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center mb-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {project.location}
              </p>
              <p className="text-sm text-gray-600 mb-2">{project.type} • {project.budget}</p>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Completion: {project.completionDate}</span>
                <span>{project.investors} investors</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Overview</h3>
        <div className="space-y-3">
          {financials.map((financial) => (
            <div key={financial.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{financial.project}</p>
                <p className="text-sm text-gray-500">Investment: {financial.investment}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">Return: {financial.return}</p>
                <p className="text-sm text-gray-500">ROI: {financial.roi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Management</h3>
        <div className="text-center py-8">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Project management tools coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track project milestones, manage resources, and monitor progress
          </p>
        </div>
      </div>

      {/* Developer Tips */}
      <div className="bg-rose-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-rose-900 mb-2">Developer Tips</h3>
        <ul className="text-rose-800 space-y-1">
          <li>• Conduct thorough market research before starting projects</li>
          <li>• Secure proper permits and approvals early</li>
          <li>• Manage project budgets and timelines effectively</li>
          <li>• Build strong relationships with investors and stakeholders</li>
          <li>• Stay updated with zoning laws and regulations</li>
        </ul>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
