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
  MapPinIcon
} from '@heroicons/react/24/outline';

const BuilderDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setProjects([
      { 
        id: 1, 
        title: 'Green Valley Residences', 
        location: 'Suburbs', 
        type: 'Residential',
        status: 'Under Construction',
        progress: 65,
        budget: '$2,500,000',
        completionDate: '2024-06-15',
        image: '/api/placeholder/300/200'
      },
      { 
        id: 2, 
        title: 'Downtown Office Complex', 
        location: 'Business District', 
        type: 'Commercial',
        status: 'Planning',
        progress: 25,
        budget: '$5,000,000',
        completionDate: '2024-12-30',
        image: '/api/placeholder/300/200'
      }
    ]);

    setInquiries([
      { id: 1, project: 'Green Valley Residences', client: 'John Smith', message: 'Interested in pre-construction pricing', time: '2 hours ago' },
      { id: 2, project: 'Downtown Office Complex', client: 'ABC Corporation', message: 'Need more details about the project timeline', time: '1 day ago' }
    ]);

    setStats({
      totalProjects: 2,
      activeProjects: 1,
      completedProjects: 0,
      totalRevenue: 7500000
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Builder Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm font-medium text-orange-600">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          to="/inquiries"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <BellIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">Inquiries</h4>
              <p className="text-sm text-gray-500">{inquiries.length} new inquiries</p>
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
                  project.status === 'Under Construction' 
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
              
              <p className="text-sm text-gray-500">Completion: {project.completionDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Timeline */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline</h3>
        <div className="text-center py-8">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Project timeline coming soon</p>
          <p className="text-sm text-gray-400 mt-2">
            Track project milestones, deadlines, and construction progress
          </p>
        </div>
      </div>

      {/* Builder Tips */}
      <div className="bg-amber-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-amber-900 mb-2">Builder Tips</h3>
        <ul className="text-amber-800 space-y-1">
          <li>• Showcase your construction quality and craftsmanship</li>
          <li>• Provide detailed project timelines and progress updates</li>
          <li>• Offer flexible financing options to buyers</li>
          <li>• Maintain good relationships with suppliers and contractors</li>
          <li>• Keep clients informed throughout the construction process</li>
        </ul>
      </div>
    </div>
  );
};

export default BuilderDashboard;
