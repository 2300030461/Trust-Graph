import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Cpu,
  FileSearch,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { View } from '../../types';
import { mockGraphNodes, mockTransactions } from '../../data/mockData';

interface OverviewViewProps {
  onNavigate: (view: View) => void;
  onSelectNode: (id: string) => void;
  selectedNode: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onSelectNode, selectedNode }) => {
  const [liveEvents, setLiveEvents] = useState([
    { id: 'ev-1', time: '10:29:12', icon: <Send size={14} />, color: 'teal', title: 'Investigator Assigned', detail: 'Case 041 assigned to Lead Investigator Arjun Kapoor' },
    { id: 'ev-2', time: '10:28:45', icon: <Clock3 size={14} />, color: 'amber', title: 'Appeal Submitted', detail: 'APP-2026-104 received from merchant Northstar' },
    { id: 'ev-3', time: '10:27:08', icon: <Send size={14} />, color: 'blue', title: 'Notification Sent', detail: 'Webhook & SMS alerts dispatched to SOC channel' },
    { id: 'ev-4', time: '10:26:30', icon: <Sparkles size={14} />, color: 'red', title: 'Evidence Generated', detail: 'SHAP vector calculated for transaction TX-8F3A91' },
    { id: 'ev-5', time: '10:26:00', icon: <GitBranch size={14} />, color: 'purple', title: 'Graph Topology Updated', detail: 'Community Helix 8-node collusion loop resolved' },
    { id: 'ev-6', time: '10:25:40', icon: <ShieldAlert size={14} />, color: 'red', title: 'Fraud Score Escalated', detail: 'TX-8F3A91 score spiked to 94 (Critical Risk)' },
  ]);

  // Simulate real-time event streaming tick
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newEvent = {
        id: 'ev-' + Date.now(),
        time: timeStr,
        icon: <Activity size={14} />,
        color: 'teal',
        title: 'Transaction Received',
        detail: `TX-${Math.floor(100000 + Math.random() * 900000)} · Scored 12 (Low Risk)`,
      };
      setLiveEvents((prev) => [newEvent, ...prev.slice(0, 7)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overview-container">
      {/* Top Banner Heading */}
      <section className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> SOC THREAT INTELLIGENCE MATRIX · LIVE PERIMETER
          </div>
          <h1>Security Operations Center</h1>
          <p>Real-time trust graph relationship mapping and multi-agent fraud defense.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-ghost" onClick={() => onNavigate('Multi-Agent')}>
            <Cpu size={16} /> 16 Agents Online
          </button>
          <button className="button button-primary" onClick={() => onNavigate('Trust Graph')}>
            <Network size={16} /> Explore Trust Graph <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* Hero SOC Spotlight Grid */}
      <section className="hero-grid">
        <div className="hero-card">
          <div className="hero-content">
            <div className="eyebrow accent-eyebrow">
              <Sparkles size={14} /> AI SUPERVISOR ACTIVE
            </div>
            <h2>
              One connected graph.<br />
              <span>Zero blind spots.</span>
            </h2>
            <p>
              TrustGraph continuously maps non-obvious entity links between buyers, sellers, devices, IPs, and GST identities to neutralize collusion rings.
            </p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => onNavigate('Cases')}>
                Review 12 Active Cases <ArrowUpRight size={15} />
              </button>
              <button className="text-button" onClick={() => onNavigate('Analytics')}>
                View Performance Trends →
              </button>
            </div>
          </div>

          <div className="hero-orbit">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="hero-core">
              <Radar size={31} />
              <span>94</span>
              <small>RISK INDEX</small>
            </div>
            <div className="orbit-node node-a" title="Customer Node"><Users size={13} /></div>
            <div className="orbit-node node-b" title="Shared IP Node"><Globe2 size={13} /></div>
            <div className="orbit-node node-c" title="Device Fingerprint"><LockKeyhole size={13} /></div>
            <div className="orbit-spark spark-a" />
            <div className="orbit-spark spark-b" />
          </div>
        </div>

        {/* Money Protected Highlight Card */}
        <div className="protected-card">
          <div className="protected-top">
            <span className="icon-tile green"><Shield size={17} /></span>
            <span className="trend positive"><ArrowUpRight size={14} /> +18.6%</span>
          </div>
          <div className="metric-label">MONEY PROTECTED (MTD)</div>
          <div className="protected-value">$2.84<span>M</span></div>
          <div className="metric-note">vs. $2.39M last month</div>
          <div className="mini-bars">
            {[38, 54, 45, 62, 50, 72, 64, 86, 79, 92, 81, 96].map((height, idx) => (
              <span key={idx} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </section>

      {/* 10 Enterprise Metrics Strip */}
      <section className="metric-grid-ten">
        <MetricCard icon={<Activity size={16} />} tone="blue" label="TRANSACTIONS TODAY" value="24,891" change="+12.4%" detail="vs yesterday" />
        <MetricCard icon={<ShieldAlert size={16} />} tone="red" label="FRAUD DETECTED" value="318" change="+8.2%" detail="last 24h" negative />
        <MetricCard icon={<CheckCircle2 size={16} />} tone="teal" label="FRAUD PREVENTED" value="96.8%" change="+4.7%" detail="accuracy rate" />
        <MetricCard icon={<Clock3 size={16} />} tone="amber" label="PENDING REVIEWS" value="47" change="6" detail="in queue" negative />
        <MetricCard icon={<Clock3 size={16} />} tone="amber" label="PENDING APPEALS" value="3" change="1" detail="SLA active" negative />
        <MetricCard icon={<Network size={16} />} tone="purple" label="FRAUD RINGS" value="12" change="2" detail="communities" negative />
        <MetricCard icon={<Cpu size={16} />} tone="teal" label="AI AGENTS RUNNING" value="16 / 16" change="100%" detail="healthy" />
        <MetricCard icon={<Zap size={16} />} tone="blue" label="SYSTEM HEALTH" value="99.98%" change="0.01%" detail="uptime" />
      </section>

      {/* Main Section Row: Graph Pulse + Live Stream */}
      <section className="section-row">
        <div className="panel graph-panel">
          <div className="panel-header">
            <div>
              <h3>Trust Graph Pulse</h3>
              <p>Live entity relationship topology</p>
            </div>
            <button className="panel-action" onClick={() => onNavigate('Trust Graph')}>
              Open Full Explorer <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="graph-summary">
            <div><strong>8,642</strong><span>connected actors</span></div>
            <div><strong className="red-text">12</strong><span>high-risk rings</span></div>
            <div><strong>98.2%</strong><span>graph coverage</span></div>
          </div>

          {/* Mini Graph Component */}
          <div className="mini-graph">
            <div className="graph-grid" />
            <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="22" y1="49" x2="71" y2="20" />
              <line x1="22" y1="49" x2="43" y2="73" />
              <line x1="71" y1="20" x2="54" y2="32" />
              <line x1="71" y1="20" x2="78" y2="64" />
              <line x1="78" y1="64" x2="43" y2="73" />
              <line x1="71" y1="20" x2="88" y2="43" />
              <line x1="17" y1="21" x2="54" y2="32" />
            </svg>

            {mockGraphNodes.map((node) => (
              <button
                key={node.id}
                className={`graph-node ${node.risk} ${node.size} ${selectedNode === node.id ? 'selected' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => onSelectNode(node.id)}
                title={`${node.label} (${node.type}) - Risk Score: ${100 - node.trustScore}`}
              >
                <span>
                  {node.type === 'Customer' ? <Users size={12} /> : node.type === 'Seller' ? <Layers3 size={12} /> : node.type === 'Device' ? <Cpu size={12} /> : node.type === 'Shared IP' ? <Globe2 size={12} /> : <Zap size={12} />}
                </span>
              </button>
            ))}

            <div className="graph-legend">
              <span><i className="blue-dot" /> Customer</span>
              <span><i className="orange-dot" /> Seller</span>
              <span><i className="red-dot" /> High Risk Ring</span>
            </div>
          </div>
        </div>

        {/* Live Streaming Feed Panel */}
        <div className="panel feed-panel">
          <div className="panel-header">
            <div>
              <h3>Live Event Stream</h3>
              <p>Autonomous AI & Investigator Actions</p>
            </div>
            <button className="panel-action" onClick={() => onNavigate('Cases')}>
              Audit Log <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="activity-list">
            {liveEvents.map((ev) => (
              <div key={ev.id} className="activity-item">
                <div className={`activity-icon ${ev.color}`}>{ev.icon}</div>
                <div className="activity-copy">
                  <strong>{ev.title}</strong>
                  <span>{ev.detail}</span>
                </div>
                <time>{ev.time}</time>
              </div>
            ))}
          </div>

          <button className="feed-footer" onClick={() => onNavigate('Cases')}>
            Open full activity log <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      {/* Bottom Section Row: Trends & High Risk Queue */}
      <section className="section-row bottom-row">
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h3>Fraud Volume & Prevention Trend</h3>
              <p>Detected risk by day (Last 14 days)</p>
            </div>
            <button className="panel-action" onClick={() => onNavigate('Analytics')}>
              Analytics <ArrowUpRight size={13} />
            </button>
          </div>
          <OverviewLineChart />
        </div>

        <div className="panel attention-panel">
          <div className="panel-header">
            <div>
              <h3>Needs Immediate Attention</h3>
              <p>Prioritized by risk score & monetary exposure</p>
            </div>
            <button className="panel-action" onClick={() => onNavigate('Transactions')}>
              View All <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="attention-list">
            {mockTransactions.slice(0, 4).map((tx) => (
              <button key={tx.id} className="attention-item" onClick={() => onNavigate('Transactions')}>
                <div className={`risk-ring ${tx.status.toLowerCase()}`}>{tx.score}</div>
                <div className="attention-copy">
                  <strong>{tx.merchant} · {tx.amount}</strong>
                  <span>{tx.id} · {tx.actor} · {tx.time}</span>
                </div>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

function MetricCard({
  icon,
  tone,
  label,
  value,
  change,
  detail,
  negative,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: string;
  change: string;
  detail: string;
  negative?: boolean;
}) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${negative ? 'negative' : ''}`}>
        <ArrowUpRight size={13} /> {change} <span>{detail}</span>
      </div>
    </div>
  );
}

function OverviewLineChart() {
  return (
    <div className="line-chart">
      <div className="chart-y-labels">
        <span>400</span>
        <span>300</span>
        <span>200</span>
        <span>100</span>
        <span>0</span>
      </div>
      <svg viewBox="0 0 700 190" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <g className="chart-grid-lines">
          <line x1="0" y1="10" x2="700" y2="10" />
          <line x1="0" y1="52" x2="700" y2="52" />
          <line x1="0" y1="94" x2="700" y2="94" />
          <line x1="0" y1="136" x2="700" y2="136" />
          <line x1="0" y1="178" x2="700" y2="178" />
        </g>
        <path
          className="chart-area"
          d="M0,151 C35,143 42,158 72,135 S111,145 135,119 S173,127 201,110 S241,121 270,91 S313,118 342,96 S371,103 402,78 S447,100 475,68 S510,84 542,58 S583,76 614,47 S654,63 700,27 L700,190 L0,190Z"
          fill="url(#areaGrad)"
        />
        <path
          className="chart-line"
          d="M0,151 C35,143 42,158 72,135 S111,145 135,119 S173,127 201,110 S241,121 270,91 S313,118 342,96 S371,103 402,78 S447,100 475,68 S510,84 542,58 S583,76 614,47 S654,63 700,27"
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="700" cy="27" r="5" className="chart-dot" fill="#ef4444" />
      </svg>
      <div className="chart-x-labels">
        <span>Apr 03</span>
        <span>Apr 06</span>
        <span>Apr 09</span>
        <span>Apr 12</span>
        <span>Apr 16</span>
      </div>
    </div>
  );
}
