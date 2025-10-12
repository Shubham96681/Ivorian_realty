#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Ivorian Realty Backend...\n');

// Check if backend-example directory exists
const backendDir = path.join(process.cwd(), 'backend-example');

if (!fs.existsSync(backendDir)) {
  console.error('❌ Backend example directory not found!');
  console.log('Please make sure you have the backend-example folder in your project root.');
  process.exit(1);
}

try {
  // Navigate to backend directory
  process.chdir(backendDir);
  
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Create uploads directory
  const uploadsDir = path.join(backendDir, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  // Create .env file if it doesn't exist
  const envFile = path.join(backendDir, '.env');
  const envExampleFile = path.join(backendDir, 'env.example');
  
  if (!fs.existsSync(envFile) && fs.existsSync(envExampleFile)) {
    console.log('⚙️  Creating .env file...');
    fs.copyFileSync(envExampleFile, envFile);
    console.log('✅ Created .env file from template');
    console.log('📝 Please update the .env file with your configuration');
  }
  
  console.log('\n✅ Backend setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Update the .env file in backend-example/ with your configuration');
  console.log('2. Start the backend server: npm run backend:dev');
  console.log('3. Start the frontend: npm run dev');
  console.log('\n🔗 Backend will be available at: http://localhost:3001');
  console.log('🔗 Frontend will be available at: http://localhost:3000');
  
} catch (error) {
  console.error('❌ Backend setup failed:', error.message);
  process.exit(1);
}
