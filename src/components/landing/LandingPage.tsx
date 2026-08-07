import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Database,
  FileSearch,
  GitBranch,
  Globe2,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Play,
  Radar,
  Shield,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import { View } from '../../types';

interface LandingPageProps {
  onEnterApp: () => void;
  onLaunchDemo: () => void;
  onNavigateView: (view: View) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onLaunchDemo, onNavigateView }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Main Glowing Core Globe (Icosahedron wireframe)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeGeo = new THREE.IcosahedronGeometry(75, 3);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(55, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 3. Floating Node Points
    const nodeCount = 120;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const nodeVectorList: THREE.Vector3[] = [];

    const colorBlue = new THREE.Color(0x3b82f6);
    const colorRed = new THREE.Color(0xef4444);
    const colorTeal = new THREE.Color(0x14b8a6);
    const colorAmber = new THREE.Color(0xf59e0b);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 75 + (Math.random() * 25 - 10);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVectorList.push(new THREE.Vector3(x, y, z));

      const randColor = Math.random() > 0.8 ? colorRed : Math.random() > 0.6 ? colorAmber : Math.random() > 0.3 ? colorBlue : colorTeal;
      nodeColors[i * 3] = randColor.r;
      nodeColors[i * 3 + 1] = randColor.g;
      nodeColors[i * 3 + 2] = randColor.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(nodePoints);

    // 4. Connecting Lines between nearby nodes
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
    });
    const linesPositions: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodeVectorList[i].distanceTo(nodeVectorList[j]);
        if (dist < 45) {
          linesPositions.push(nodeVectorList[i].x, nodeVectorList[i].y, nodeVectorList[i].z);
          linesPositions.push(nodeVectorList[j].x, nodeVectorList[j].y, nodeVectorList[j].z);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linesPositions, 3));
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    globeGroup.add(linesMesh);

    // 5. Outer Particle Dust Field
    const dustCount = 300;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 600;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.5,
      color: 0x64748b,
      transparent: true,
      opacity: 0.4,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 6. Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      globeGroup.rotation.y = elapsedTime * 0.15;
      globeGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      innerMesh.rotation.y = -elapsedTime * 0.25;

      dustPoints.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // 7. Window resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      globeGeo.dispose();
      globeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="hero-badge">
            <span className="pulse-dot red" />
            <Sparkles size={14} />
            <span>ENTERPRISE TRUST GRAPH ENGINE v4.2</span>
          </div>

          <h1 className="hero-title">
            Stop Multi-Actor Fraud <br />
            <span className="hero-gradient-text">Before Collusion Strikes.</span>
          </h1>

          <p className="hero-subtitle">
            SteelShield AI continuously maps the hidden relationships between buyers, sellers, devices, IPs, and GST tax identities to neutralize syndicate fraud rings in real time.
          </p>

          <div className="hero-button-group">
            <button className="button button-primary hero-cta-main" onClick={onEnterApp}>
              <Radar size={18} />
              <span>Launch Command Center</span>
              <ArrowUpRight size={18} />
            </button>

            <button className="button button-ghost hero-cta-demo" onClick={onLaunchDemo}>
              <Play size={16} fill="currentColor" />
              <span>Interactive Judge Demo (5-8 min)</span>
            </button>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-stat">
              <strong>$2.84M+</strong>
              <span>Money Protected</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>24,891</strong>
              <span>Transactions / Day</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>16 Active</strong>
              <span>AI Autonomous Agents</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>99.98%</strong>
              <span>System Uptime</span>
            </div>
          </div>
        </div>

        {/* 3D WebGL Globe Canvas Container */}
        <div className="landing-3d-wrap" ref={mountRef}>
          <div className="globe-overlay-card top-left">
            <div className="overlay-header">
              <ShieldAlert size={16} className="text-red-400" />
              <strong>COLLUSION RING DETECTED</strong>
            </div>
            <p>Community Helix · 8 Nodes · 96% Risk</p>
          </div>

          <div className="globe-overlay-card bottom-right">
            <div className="overlay-header">
              <Zap size={16} className="text-teal-400" />
              <strong>REAL-TIME AI AGENTS</strong>
            </div>
            <p>16 Agents Executing Pipeline</p>
          </div>
        </div>
      </section>

      {/* Value Proposition / Mission Section */}
      <section className="landing-section mission-section">
        <div className="section-header center">
          <div className="eyebrow"><span className="eyebrow-line" /> ENTERPRISE CAPABILITIES</div>
          <h2>Designed for Amazon, Stripe & Razorpay Scale</h2>
          <p>Legacy rules-engine fraud solutions only inspect isolated transactions. SteelShield AI connects the dots.</p>
        </div>

        <div className="feature-cards-grid">
          <div className="feature-card">
            <div className="feature-icon red"><Network size={24} /></div>
            <h3>Multi-Actor Graph Intelligence</h3>
            <p>Maps n-degree relationship edges between synthetic buyers, rogue merchants, delivery partners, and shared hardware fingerprints.</p>
            <button className="text-button" onClick={() => onNavigateView('Trust Graph')}>
              Explore Trust Graph <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue"><Cpu size={24} /></div>
            <h3>16 Autonomous AI Agents</h3>
            <p>Specialized micro-agents for feature engineering, IP proxy scoring, SHAP explainability, automated appeals, and real-time audit logging.</p>
            <button className="text-button" onClick={() => onNavigateView('Multi-Agent')}>
              View AI Agent Pipeline <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon teal"><FileSearch size={24} /></div>
            <h3>Explainable Case Investigation</h3>
            <p>Provides clear natural language narratives, feature rankings, interactive timelines, and decision recommenders for compliance teams.</p>
            <button className="text-button" onClick={() => onNavigateView('Cases')}>
              Open Case Command Center <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon amber"><GitBranch size={24} /></div>
            <h3>Fraud Ring Step Playback</h3>
            <p>Rewind and replay how collusion networks formed over time with interactive step-by-step slider animations.</p>
            <button className="text-button" onClick={() => onNavigateView('Trust Graph')}>
              Try Ring Playback <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Architecture Preview Section */}
      <section className="landing-section architecture-section">
        <div className="section-header">
          <div className="eyebrow"><span className="eyebrow-line" /> PIPELINE ARCHITECTURE</div>
          <h2>End-to-End Enterprise Flow</h2>
          <p>From transaction ingestion to immutable ledger audit log in &lt;120ms.</p>
        </div>

        <div className="arch-flow-wrap">
          <div className="arch-step">
            <div className="arch-num">01</div>
            <Zap size={20} />
            <h4>Payment Ingestion</h4>
            <p>ISO20022 / Webhook Stream</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">02</div>
            <Cpu size={20} />
            <h4>Feature Vectorization</h4>
            <p>142 Signals Extracted</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step highlight">
            <div className="arch-num">03</div>
            <Network size={20} />
            <h4>Trust Graph Engine</h4>
            <p>PageRank & Community Detection</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">04</div>
            <Sparkles size={20} />
            <h4>XAI Inference</h4>
            <p>SHAP Narrative & Decision</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">05</div>
            <CheckCircle2 size={20} />
            <h4>Decision & Audit</h4>
            <p>Action & Immutable Ledger</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="landing-section tech-section">
        <div className="section-header center">
          <div className="eyebrow"><span className="eyebrow-line" /> TECH STACK & ENGINE</div>
          <h2>Production-Grade Engineering</h2>
        </div>

        <div className="tech-badge-grid">
          <div className="tech-badge"><Radar size={18} /> React 19 & TypeScript</div>
          <div className="tech-badge"><Globe2 size={18} /> Three.js 3D Canvas</div>
          <div className="tech-badge"><Network size={18} /> React Flow Node Graph</div>
          <div className="tech-badge"><Database size={18} /> Supabase Postgres & SQLite</div>
          <div className="tech-badge"><Cpu size={18} /> Python ML Random Forest</div>
          <div className="tech-badge"><LockKeyhole size={18} /> JWT & Role RBAC</div>
          <div className="tech-badge"><BarChart3 size={18} /> Louvain & PageRank Algorithms</div>
          <div className="tech-badge"><Activity size={18} /> Real-time Streaming Webhooks</div>
        </div>
      </section>

      {/* Call to Action Footer Strip */}
      <section className="landing-cta-banner">
        <div className="cta-banner-content">
          <h2>Ready to Explore the Future of Fraud Intelligence?</h2>
          <p>Experience the full interactive dashboard or run the automated hackathon judge presentation.</p>
          <div className="cta-banner-buttons">
            <button className="button button-primary" onClick={onEnterApp}>
              Enter Command Center <ArrowUpRight size={16} />
            </button>
            <button className="button button-light" onClick={onLaunchDemo}>
              <Play size={15} fill="currentColor" /> Run Demo Mode
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-brand">
          <Radar size={20} />
          <strong>STEELSHIELD AI · TRUSTGRAPH</strong>
        </div>
        <p>© 2026 SteelShield Technologies. Built for Enterprise Fraud Detection.</p>
      </footer>
    </div>
  );
};
