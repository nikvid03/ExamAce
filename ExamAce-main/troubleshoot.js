const { spawn } = require('child_process');
const fs = require('fs');

console.log('🔧 Troubleshooting ExamAce Platform...\n');

// Check if MongoDB is running
async function checkMongoDB() {
  console.log('📊 Checking MongoDB connection...');
  try {
    const { spawn } = require('child_process');
    const mongoCheck = spawn('mongosh', ['--eval', 'db.runCommand("ping")'], {
      stdio: 'pipe'
    });
    
    mongoCheck.on('close', (code) => {
      if (code === 0) {
        console.log('✅ MongoDB is running');
      } else {
        console.log('❌ MongoDB is not running. Please start MongoDB first.');
        console.log('�� Install MongoDB or use MongoDB Atlas');
      }
    });
  } catch (error) {
    console.log('❌ MongoDB not found. Please install MongoDB.');
  }
}

// Check ports
async function checkPorts() {
  console.log('🔌 Checking ports...');
  
  const netstat = spawn('netstat', ['-ano'], { stdio: 'pipe' });
  netstat.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes(':5000') || output.includes(':5173')) {
      console.log('⚠️  Ports 5000 or 5173 might be in use');
    }
  });
  
  netstat.on('close', () => {
    console.log('✅ Port check completed');
  });
}

// Check dependencies
async function checkDependencies() {
  console.log('📦 Checking dependencies...');
  
  const backendPackage = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  const frontendPackage = JSON.parse(fs.readFileSync('./frontend/package.json', 'utf8'));
  
  console.log('✅ Backend dependencies:', Object.keys(backendPackage.dependencies).length);
  console.log('✅ Frontend dependencies:', Object.keys(frontendPackage.dependencies).length);
}

async function troubleshoot() {
  await checkMongoDB();
  await checkPorts();
  await checkDependencies();
  
  console.log('\n🎯 Troubleshooting complete!');
  console.log('💡 If you see any issues above, please fix them before starting the project.');
}

troubleshoot(); 