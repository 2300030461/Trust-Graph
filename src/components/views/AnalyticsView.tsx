import React from 'react';
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Cpu,
  Globe2,
  Layers3,
  Network,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { mockFraudRings } from '../../data/mockData';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="analytics-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> PERFORMANCE & PATTERN INTELLIGENCE
          </div>
          <h1>Analytics & Ecosystem Patterns</h1>
          <p>Detect macro risk shifts, refund velocity spikes, and community density trends.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-ghost">Last 30 Days ▼</button>
        </div>
      </section>

      {/* Main Grid */}
      <div className="analytics-grid">
        {/* Risk Distribution Donut / Bars */}
        <div className="panel analytic-large">
          <div className="panel-header">
            <div>
              <h3>Risk Distribution Spectrum</h3>
              <p>Across 24,891 evaluated daily transactions</p>
            </div>
          </div>

          <div className="distribution">
            <div className="donut">
              <div>
                <strong>24.8k</strong>
                <span>Evaluated</span>
              </div>
            </div>
            <div className="distribution-legend">
              <LegendRow color="red" label="Critical Risk (>85)" value="318" percent="1.3%" />
              <LegendRow color="amber" label="Review Needed (60-84)" value="2,840" percent="11.4%" />
              <LegendRow color="teal" label="Low Risk (<60)" value="21,733" percent="87.3%" />
            </div>
          </div>
        </div>

        {/* Trust Score Movement */}
        <div className="panel analytic-large">
          <div className="panel-header">
            <div>
              <h3>Trust Score Movement by Entity Class</h3>
              <p>Mean entity trust index comparison</p>
            </div>
          </div>

          <div className="trust-bars">
            <TrustBar label="Customers" value="82" delta="+4.2" color="blue" />
            <TrustBar label="Sellers" value="68" delta="-8.6" color="orange" />
            <TrustBar label="Delivery Partners" value="91" delta="+1.8" color="teal" />
            <TrustBar label="Hardware Devices" value="74" delta="-2.1" color="red" />
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="panel heatmap-panel">
          <div className="panel-header">
            <div>
              <h3>Fraud Activity Intensity Heatmap</h3>
              <p>Risk density by day of week & hour UTC</p>
            </div>
          </div>

          <div className="heatmap">
            <div className="heat-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
            <div className="heat-grid">
              {Array.from({ length: 49 }, (_, idx) => (
                <i key={idx} className={`heat-${(idx * 7 + 3) % 5}`} title={`Density index ${(idx * 7 + 3) % 5}`} />
              ))}
            </div>
          </div>

          <div className="heat-scale">
            <span>Low Intensity</span>
            {[0, 1, 2, 3, 4].map((item) => (
              <i key={item} className={`heat-${item}`} />
            ))}
            <span>High Intensity</span>
          </div>
        </div>

        {/* Top Collusion Rings Summary */}
        <div className="panel top-risk-panel">
          <div className="panel-header">
            <div>
              <h3>Top Detected Fraud Rings</h3>
              <p>Ranked by volume exposed</p>
            </div>
          </div>

          <div className="risk-entity-list">
            {mockFraudRings.map((ring, idx) => (
              <div key={ring.id} className="risk-entity">
                <span className="rank">0{idx + 1}</span>
                <div>
                  <strong>{ring.name}</strong>
                  <span>{ring.nodesCount} Nodes · {ring.volumeExposed}</span>
                </div>
                <b className="red-text">{ring.riskScore}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function LegendRow({ color, label, value, percent }: { color: string; label: string; value: string; percent: string }) {
  return (
    <div className="legend-row">
      <i className={`legend-dot ${color}`} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{percent}</small>
    </div>
  );
}

function TrustBar({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <div className="trust-bar">
      <div>
        <span>{label}</span>
        <strong>{value}<small>/100</small></strong>
        <em className={delta.startsWith('-') ? 'down' : ''}>{delta}%</em>
      </div>
      <div className="bar-track">
        <i className={color} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
