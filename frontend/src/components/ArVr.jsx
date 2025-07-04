import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Camera, Play, Pause, RotateCcw, Zap, Atom, BookOpen, Brain, ChevronRight, Volume2, Settings } from 'lucide-react';

const ARLearningPlatform = () => {
  const [activeModule, setActiveModule] = useState('chemistry');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('water-molecule');
  const [arMode, setArMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);

  // 3D Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    // Create initial content
    createMoleculeVisualization();
    
    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      if (isPlaying) {
        scene.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying, currentTopic]);

  const createMoleculeVisualization = () => {
    if (!sceneRef.current) return;
    
    // Clear existing objects
    while(sceneRef.current.children.length > 2) {
      sceneRef.current.remove(sceneRef.current.children[2]);
    }
    
    if (currentTopic === 'water-molecule') {
      // Create water molecule (H2O)
      const oxygenGeometry = new THREE.SphereGeometry(0.6, 32, 32);
      const oxygenMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const oxygen = new THREE.Mesh(oxygenGeometry, oxygenMaterial);
      oxygen.position.set(0, 0, 0);
      sceneRef.current.add(oxygen);
      
      // Hydrogen atoms
      const hydrogenGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const hydrogenMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
      
      const hydrogen1 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
      hydrogen1.position.set(-1.2, 0.8, 0);
      sceneRef.current.add(hydrogen1);
      
      const hydrogen2 = new THREE.Mesh(hydrogenGeometry, hydrogenMaterial);
      hydrogen2.position.set(-1.2, -0.8, 0);
      sceneRef.current.add(hydrogen2);
      
      // Bonds
      const bondGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5);
      const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      
      const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
      bond1.position.set(-0.6, 0.4, 0);
      bond1.rotation.z = Math.PI / 6;
      sceneRef.current.add(bond1);
      
      const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
      bond2.position.set(-0.6, -0.4, 0);
      bond2.rotation.z = -Math.PI / 6;
      sceneRef.current.add(bond2);
      
    } else if (currentTopic === 'dna-helix') {
      // Create DNA double helix
      const helixGeometry = new THREE.TorusGeometry(1, 0.1, 8, 50);
      const helixMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      
      for (let i = 0; i < 10; i++) {
        const helix = new THREE.Mesh(helixGeometry, helixMaterial);
        helix.position.y = i * 0.5 - 2.5;
        helix.rotation.y = i * 0.3;
        helix.scale.set(0.8, 0.1, 0.8);
        sceneRef.current.add(helix);
      }
    }
  };

  const modules = [
    { id: 'chemistry', name: 'Chemistry', icon: Atom, color: 'bg-blue-500' },
    { id: 'physics', name: 'Physics', icon: Zap, color: 'bg-purple-500' },
    { id: 'biology', name: 'Biology', icon: BookOpen, color: 'bg-green-500' },
    { id: 'mathematics', name: 'Mathematics', icon: Brain, color: 'bg-orange-500' }
  ];

  const topics = {
    chemistry: [
      { id: 'water-molecule', name: 'Water Molecule (H₂O)', difficulty: 'Basic' },
      { id: 'benzene-ring', name: 'Benzene Ring', difficulty: 'Advanced' },
      { id: 'ionic-bonds', name: 'Ionic Bonding', difficulty: 'Intermediate' }
    ],
    biology: [
      { id: 'dna-helix', name: 'DNA Double Helix', difficulty: 'Advanced' },
      { id: 'cell-structure', name: 'Cell Structure', difficulty: 'Basic' },
      { id: 'protein-folding', name: 'Protein Folding', difficulty: 'Advanced' }
    ],
    physics: [
      { id: 'wave-motion', name: 'Wave Motion', difficulty: 'Intermediate' },
      { id: 'electromagnetic-field', name: 'EM Fields', difficulty: 'Advanced' },
      { id: 'pendulum', name: 'Simple Pendulum', difficulty: 'Basic' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AR Learning Platform</h1>
                <p className="text-sm text-gray-400">IIT JEE • NEET Preparation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setArMode(!arMode)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  arMode 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-slate-700 hover:bg-slate-600'
                } flex items-center space-x-2`}
              >
                <Camera className="w-4 h-4" />
                <span>{arMode ? 'AR Mode ON' : 'AR Mode OFF'}</span>
              </button>
              <Settings className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">Subjects</h2>
              <div className="space-y-3">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        activeModule === module.id
                          ? 'bg-slate-700 border border-slate-600'
                          : 'hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-8 h-8 ${module.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{module.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Topic Selection */}
              {topics[activeModule] && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">Topics</h3>
                  <div className="space-y-2">
                    {topics[activeModule].map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setCurrentTopic(topic.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          currentTopic === topic.id
                            ? 'bg-blue-600/20 border border-blue-500/50'
                            : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{topic.name}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            topic.difficulty === 'Basic' ? 'bg-green-500/20 text-green-400' :
                            topic.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {topic.difficulty}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
              {/* 3D Visualization Area */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800">
                <div 
                  ref={mountRef} 
                  className="w-full h-96 flex items-center justify-center"
                  style={{ minHeight: '400px' }}
                />
                
                {/* AR Overlay */}
                {arMode && (
                  <div className="absolute inset-0 border-2 border-green-400 rounded-lg">
                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      AR Mode Active
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-sm text-green-400">Real-time tracking enabled</p>
                    </div>
                  </div>
                )}

                {/* Controls Overlay */}
                {showControls && (
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => createMoleculeVisualization()}
                      className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-colors">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {topics[activeModule]?.find(t => t.id === currentTopic)?.name || 'Select a Topic'}
                  </h3>
                  <button
                    onClick={() => setShowControls(!showControls)}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    {showControls ? 'Hide' : 'Show'} Controls
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-300 mb-2">Interactivity</h4>
                    <p className="text-2xl font-bold text-blue-400">High</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-300 mb-2">Complexity</h4>
                    <p className="text-2xl font-bold text-purple-400">Advanced</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-300 mb-2">AR Support</h4>
                    <p className="text-2xl font-bold text-green-400">Full</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Learning Objectives</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Understand molecular structure and bonding</li>
                      <li>• Visualize 3D molecular geometry</li>
                      <li>• Explore intermolecular forces</li>
                      <li>• Interactive problem-solving</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-700">
                    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                      Start Learning
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-medium transition-colors">
                      Take Quiz
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      View Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARLearningPlatform;