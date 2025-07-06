const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting ExamAce Full Stack Application...\n');

// Start backend server
console.log('📡 Starting Backend Server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  console.log('\n🎨 Starting Frontend Server...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (error) => {
    console.error('❌ Frontend Error:', error);
  });

  frontend.on('close', (code) => {
    console.log(`\n🎨 Frontend process exited with code ${code}`);
  });
}, 3000);

backend.on('error', (error) => {
  console.error('❌ Backend Error:', error);
});

backend.on('close', (code) => {
  console.log(`\n📡 Backend process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill('SIGTERM');
  process.exit(0);
});

console.log('\n✅ Servers starting up...');
console.log('📡 Backend will be available at: http://localhost:8000');
console.log('🎨 Frontend will be available at: http://localhost:5173');
console.log('🔗 API Health Check: http://localhost:8000/api/health');
console.log('\nPress Ctrl+C to stop all servers\n'); 