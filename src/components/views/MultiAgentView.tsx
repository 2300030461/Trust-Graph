import React, { useState } from 'react';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Radar,
  Send,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { mockAIAgents, mockModelMetrics } from '../../data/mockData';
import { AIAgent } from '../../types';

export const MultiAgentView: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('ag-1');

  const selectedAgent = mockAIAgents.find((a) => a.id === selectedAgentId) || mockAIAgents[0];

  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'Radar': return <Radar size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'ShieldAlert': return <ShieldAlert size={18} />;
      case 'Network': return <Network size={18} />;
      case 'Users': return <Users size={18} />;
      case 'Layers3': return <Layers3 size={18} />;
      case 'Globe2': return <Globe2 size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      case 'CheckCircle2': return <CheckCircle2 size={18} />;
      case 'Send': return <Send size={18} />;
      case 'Database': return <Database size={18} />;
      default: return <Activity size={18} />;
    }
  };

  return (
    <div className="multiagent-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> AUTONOMOUS MULTI-AGENT PIPELINE
          </div>
          <h1>AI Agent Orchestration Architecture</h1>
          <p>16 specialized micro-agents continuously executing distributed inference and graph analysis.</p>
        </div>
        <div className="heading-actions">
          <div className="live-pill"><span className="pulse-dot" /> 16 / 16 Agents Operational</div>
        </div>
      </section>

      {/* Model Performance Overview Cards */}
      <div className="model-metrics-grid">
        <div className="metric-card">
          <div className="metric-icon teal"><Target size={17} /></div>
          <div className="metric-label">MODEL ACCURACY RATE</div>
          <div className="metric-value">{(mockModelMetrics.accuracy * 100).toFixed(1)}%</div>
          <div className="metric-change"><span>Random Forest Ensemble</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-icon blue"><CheckCircle2 size={17} /></div>
          <div className="metric-label">PRECISION (LOW FALSE POS)</div>
          <div className="metric-value">{(mockModelMetrics.precision * 100).toFixed(1)}%</div>
          <div className="metric-change"><span>88 false positives / 24k</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-icon red"><ShieldAlert size={17} /></div>
          <div className="metric-label">RECALL (CATCH RATE)</div>
          <div className="metric-value">{(mockModelMetrics.recall * 100).toFixed(1)}%</div>
          <div className="metric-change"><span>2,410 true positive catches</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-icon purple"><Sparkles size={17} /></div>
          <div className="metric-label">F1 SCORE & AUC-ROC</div>
          <div className="metric-value">{mockModelMetrics.f1Score.toFixed(3)}</div>
          <div className="metric-change"><span>AUC-ROC: {mockModelMetrics.aucRoc.toFixed(3)}</span></div>
        </div>
      </div>

      {/* Pipeline Grid & Detail View */}
      <section className="agent-pipeline-workspace">
        {/* Pipeline Agents Flow Grid */}
        <div className="panel agent-flow-panel">
          <div className="panel-header">
            <div>
              <h3>Agent Execution Graph</h3>
              <p>Click any agent to inspect runtime logs and vector state</p>
            </div>
          </div>

          <div className="agents-grid">
            {mockAIAgents.map((agent) => {
              const isSelected = agent.id === selectedAgentId;

              return (
                <button
                  key={agent.id}
                  className={`agent-card ${agent.status.toLowerCase()} ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedAgentId(agent.id)}
                >
                  <div className="agent-card-top">
                    <div className="agent-icon">{getAgentIcon(agent.iconName)}</div>
                    <span className={`agent-status-badge ${agent.status.toLowerCase()}`}>
                      <i /> {agent.status}
                    </span>
                  </div>
                  <h4>{agent.name}</h4>
                  <p>{agent.role}</p>

                  <div className="agent-card-bottom">
                    <span>{agent.latencyMs}ms</span>
                    <span>{agent.processedCount.toLocaleString()} items</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Inspector */}
        <div className="panel agent-inspector-panel">
          <div className="inspector-header">
            <div className="agent-icon-large">{getAgentIcon(selectedAgent.iconName)}</div>
            <div>
              <div className="eyebrow">{selectedAgent.id.toUpperCase()} · AUTONOMOUS AGENT</div>
              <h2>{selectedAgent.name}</h2>
              <p>{selectedAgent.role}</p>
            </div>
          </div>

          <div className="agent-stats-strip">
            <div><strong>{selectedAgent.latencyMs}ms</strong><span>Avg Latency</span></div>
            <div><strong>{selectedAgent.accuracyRate}%</strong><span>Accuracy Rate</span></div>
            <div><strong>{selectedAgent.processedCount.toLocaleString()}</strong><span>Evaluations</span></div>
          </div>

          <div className="evidence-box">
            <div><Sparkles size={15} /><strong>Agent Description</strong></div>
            <p>{selectedAgent.description}</p>
          </div>

          <div className="detail-row">
            <span>Last Autonomous Action:</span>
            <strong className="text-teal-400">{selectedAgent.lastAction}</strong>
          </div>

          {/* Random Forest Confusion Matrix Display */}
          <div className="confusion-matrix-card">
            <h4>Ensemble Model Confusion Matrix</h4>
            <div className="matrix-grid">
              <div className="matrix-cell tp">
                <strong>{mockModelMetrics.confusionMatrix.truePositive}</strong>
                <span>True Positives</span>
              </div>
              <div className="matrix-cell fp">
                <strong>{mockModelMetrics.confusionMatrix.falsePositive}</strong>
                <span>False Positives</span>
              </div>
              <div className="matrix-cell fn">
                <strong>{mockModelMetrics.confusionMatrix.falseNegative}</strong>
                <span>False Negatives</span>
              </div>
              <div className="matrix-cell tn">
                <strong>{mockModelMetrics.confusionMatrix.trueNegative}</strong>
                <span>True Negatives</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
