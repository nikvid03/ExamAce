const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting ExamAce Platform...\n');

// Check if .env file exists in backend
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('�� Creating .env file for backend...');
  const envContent = `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/examace

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
`;
  fs.writeFileSync(backendEnvPath, envContent);
  console.log('✅ .env file created in backend directory');
}

// Function to run commands
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      cwd: cwd || __dirname
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function startProject() {
  try {
    // Install dependencies if needed
    console.log('📦 Installing dependencies...');
    await runCommand('npm', ['run', 'install:all']);
    
    // Setup backend database
    console.log('🗄️  Setting up database...');
    await runCommand('npm', ['run', 'setup']);
    
    // Start both frontend and backend
    console.log('🌟 Starting development servers...');
    await runCommand('npm', ['run', 'dev']);
    
  } catch (error) {
    console.error('❌ Error starting project:', error.message);
    process.exit(1);
  }
}

startProject(); 