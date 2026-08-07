import React from 'react';
import {
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  Network,
  Radar,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HealthView: React.FC = () => {
  const services = [
    { name: 'Transaction Ingestion API Gateway', status: 'Operational', latency: '22ms', load: '1,420 rps', icon: <Zap size={17} /> },
    { name: 'AI Decision & Inference Engine', status: 'Operational', latency: '45ms', load: '0.96 AUC', icon: <Sparkles size={17} /> },
    { name: 'Trust Graph Topology Engine', status: 'Operational', latency: '86ms', load: '8.6k nodes', icon: <Network size={17} /> },
    { name: 'Evidence & SHAP Vector DB', status: 'Operational', latency: '18ms', load: '2.4 TB', icon: <Database size={17} /> },
    { name: 'Notification Gateway Webhook', status: 'Degraded', latency: '428ms', load: '1 retry q', icon: <Send size={17} /> },
  ];

  return (
    <div className="health-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> INFRASTRUCTURE & TELEMETRY
          </div>
          <h1>System Telemetry & Health</h1>
          <p>Real-time node performance, API latencies, queue depths, and uptime telemetry.</p>
        </div>
        <div className="health-status">
          <span className="pulse-dot" /> 99.98% System Uptime
        </div>
      </section>

      {/* Gauges Hero */}
      <section className="health-hero">
        <div>
          <div className="eyebrow accent-eyebrow"><Activity size={14} /> CORE PERIMETER</div>
          <h2>Perimeter Operating Normally</h2>
          <p>All core intelligence microservices are operating within standard latency thresholds.</p>

          <div className="gauges-strip">
            <div className="gauge-box">
              <span className="gauge-label">CPU UTILIZATION</span>
              <strong>28.4%</strong>
              <div className="gauge-bar"><i style={{ width: '28.4%' }} /></div>
            </div>
            <div className="gauge-box">
              <span className="gauge-label">MEMORY USAGE</span>
              <strong>4.2 GB / 16 GB</strong>
              <div className="gauge-bar"><i style={{ width: '32%' }} /></div>
            </div>
            <div className="gauge-box">
              <span className="gauge-label">INGESTION QUEUE</span>
              <strong>0.01ms</strong>
              <div className="gauge-bar"><i style={{ width: '8%' }} /></div>
            </div>
          </div>
        </div>

        <div className="health-gauge-large">
          <div>
            <strong>99.98%</strong>
            <span>30-DAY UPTIME</span>
          </div>
        </div>
      </section>

      {/* Services List Grid */}
      <section className="health-grid">
        <div className="panel services-panel">
          <div className="panel-header">
            <div>
              <h3>Microservices Telemetry</h3>
              <p>Live health check response status</p>
            </div>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <div className="service-row" key={service.name}>
                <span className="service-icon">{service.icon}</span>
                <div>
                  <strong>{service.name}</strong>
                  <span>Load: {service.load}</span>
                </div>
                <span className={`service-status ${service.status === 'Degraded' ? 'degraded' : ''}`}>
                  <i />{service.status}
                </span>
                <b>{service.latency}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="panel uptime-panel">
          <div className="panel-header">
            <div>
              <h3>Uptime Telemetry History</h3>
              <p>Daily operational status over 30 days</p>
            </div>
          </div>

          <div className="uptime-value">
            <strong>99.98%</strong>
            <span>Availability</span>
          </div>

          <div className="uptime-bars">
            {Array.from({ length: 30 }, (_, idx) => (
              <i
                key={idx}
                className={idx === 18 ? 'incident' : ''}
                style={{ height: `${72 + ((idx * 13) % 28)}%` }}
                title={`Day ${idx + 1}: ${idx === 18 ? 'Degraded Webhook 2m' : '100% operational'}`}
              />
            ))}
          </div>
          <div className="uptime-labels">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </section>
    </div>
  );
};
