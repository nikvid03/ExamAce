const { spawn } = require('child_process');

console.log('🚀 Starting ExamAce Platform...\n');

// Start backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: './backend',
  stdio: 'inherit',
  shell: true
});

// Start frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: './frontend',
  stdio: 'inherit',
  shell: true
});

backend.on('error', (error) => {
  console.error('Backend error:', error);
});

frontend.on('error', (error) => {
  console.error('Frontend error:', error);
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
}); 