import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { View } from '../../types';

interface DemoModeControllerProps {
  isActive: boolean;
  onEndDemo: () => void;
  onNavigateView: (view: View) => void;
}

interface DemoStep {
  step: number;
  title: string;
  view: View;
  headline: string;
  narrative: string;
  durationSeconds: number;
}

const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: '3D Trust Graph Perimeter',
    view: 'Landing',
    headline: 'Welcome Judges: SteelShield AI Enterprise Platform',
    narrative: 'Real-time multi-actor graph intelligence rendering 120 connected nodes in 3D WebGL space. Over $2.84M in money protected.',
    durationSeconds: 15,
  },
  {
    step: 2,
    title: 'SOC Threat Intelligence Matrix',
    view: 'Overview',
    headline: 'Security Operations Center Dashboard',
    narrative: 'Monitoring 24,891 live daily transactions with 16 autonomous AI micro-agents updating threat signals in real-time.',
    durationSeconds: 15,
  },
  {
    step: 3,
    title: 'Trust Graph & Collusion Playback',
    view: 'Trust Graph',
    headline: 'N-Degree Relationship & Collusion Ring Discovery',
    narrative: 'Uncovering Community Helix—an 8-node fraud ring sharing hardware canvas fingerprints (Device 4C2A) and Tor IP proxies.',
    durationSeconds: 20,
  },
  {
    step: 4,
    title: 'Real-Time Payment Telemetry Grid',
    view: 'Transactions',
    headline: 'Enterprise Data Grid & Evidence Drawers',
    narrative: 'Deep row inspection exposing instant SHAP evidence, tax GST cross-matches, and custom export options (CSV/JSON/PDF).',
    durationSeconds: 15,
  },
  {
    step: 5,
    title: 'Multi-Agent Autonomous Pipeline',
    view: 'Multi-Agent',
    headline: '16 Autonomous AI Micro-Agents',
    narrative: 'Distributed pipeline orchestration with Random Forest ensemble accuracy of 97.8% and 0.991 AUC-ROC.',
    durationSeconds: 15,
  },
  {
    step: 6,
    title: 'Case Investigation & Explainable AI',
    view: 'Cases',
    headline: 'Defensible Case Narratives & Compliance Action',
    narrative: 'Synthesizing natural language explanations, SHAP feature rankings, and human-in-the-loop action controls.',
    durationSeconds: 20,
  },
  {
    step: 7,
    title: 'Appeals & System Telemetry',
    view: 'Appeals',
    headline: 'Merchant Appeals Workflow & Telemetry',
    narrative: 'Full SLA countdown timers, verified document OCR checks, and 99.98% infrastructure availability.',
    durationSeconds: 15,
  },
];

export const DemoModeController: React.FC<DemoModeControllerProps> = ({
  isActive,
  onEndDemo,
  onNavigateView,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const step = DEMO_STEPS[currentStepIndex];

  // Auto advance timer
  useEffect(() => {
    if (!isActive || isPaused || isCompleted) return;

    onNavigateView(step.view);
    setProgressPercent(0);

    const startTime = Date.now();
    const durationMs = step.durationSeconds * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgressPercent(pct);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        if (currentStepIndex < DEMO_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsCompleted(true);
          // Confetti celebratory burst!
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, isPaused, currentStepIndex, isCompleted]);

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  if (!isActive) return null;

  return (
    <div className="demo-controller-banner">
      <div className="demo-progress-bar">
        <div className="demo-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {!isCompleted ? (
        <div className="demo-banner-content">
          <div className="demo-step-badge">
            <Sparkles size={14} className="text-amber-400" />
            <span>JUDGE DEMO MODE · STEP {step.step} OF {DEMO_STEPS.length}</span>
          </div>

          <div className="demo-step-info">
            <strong>{step.headline}</strong>
            <p>{step.narrative}</p>
          </div>

          <div className="demo-controls">
            <button className="icon-button" onClick={handlePrev} disabled={currentStepIndex === 0} title="Previous Step">
              <ChevronLeft size={16} />
            </button>

            <button className="button button-ghost small" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            <button className="button button-primary small" onClick={handleNext}>
              <span>Next Step</span>
              <ChevronRight size={14} />
            </button>

            <button className="icon-button" onClick={onEndDemo} title="Exit Presentation Mode">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="demo-banner-content center-content">
          <div className="demo-step-badge green">
            <Award size={16} />
            <span>DEMO PRESENTATION COMPLETE</span>
          </div>
          <strong>Thank you for reviewing SteelShield AI Enterprise Platform!</strong>
          <button className="button button-light small" onClick={onEndDemo}>
            Return to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};
