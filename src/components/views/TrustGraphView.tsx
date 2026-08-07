import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Cpu,
  FileSearch,
  Filter,
  GitBranch,
  Globe2,
  Layers3,
  Network,
  Pause,
  Play,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { mockFraudRings, mockGraphEdges, mockGraphNodes } from '../../data/mockData';
import { GraphNodeData } from '../../types';

interface TrustGraphViewProps {
  selectedNode: string;
  onSelectNode: (id: string) => void;
}

export const TrustGraphView: React.FC<TrustGraphViewProps> = ({ selectedNode, onSelectNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'graph' | 'playback' | 'analytics'>('graph');
  const [selectedRingId, setSelectedRingId] = useState<string>('ring-1');

  // Playback step state
  const [currentPlaybackStep, setCurrentPlaybackStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter mode: 'all' | 'high-risk' | 'community-1'
  const [filterMode, setFilterMode] = useState<'all' | 'high-risk' | 'community-1'>('all');

  const selectedNodeData = useMemo(() => {
    return mockGraphNodes.find((item) => item.id === selectedNode) || mockGraphNodes[0];
  }, [selectedNode]);

  const activeRing = useMemo(() => {
    return mockFraudRings.find((r) => r.id === selectedRingId) || mockFraudRings[0];
  }, [selectedRingId]);

  // Filter nodes based on search and mode
  const filteredNodes = useMemo(() => {
    let list = mockGraphNodes;
    if (filterMode === 'high-risk') {
      list = list.filter((n) => n.risk === 'high');
    } else if (filterMode === 'community-1') {
      list = list.filter((n) => n.communityId === 1);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((n) => n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q));
    }
    return list;
  }, [filterMode, searchQuery]);

  // Step Playback simulation timer
  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentPlaybackStep((prev) => {
          if (prev >= activeRing.formationSteps.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeRing]);

  const activePlaybackInfo = activeRing.formationSteps.find((s) => s.step === currentPlaybackStep) || activeRing.formationSteps[0];

  return (
    <div className="graph-view-container">
      {/* View Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> RELATIONSHIP INTELLIGENCE ENGINE
          </div>
          <h1>Trust Graph & Collusion Matrix</h1>
          <p>Expose hidden collusion rings, shared hardware fingerprints, and multi-actor fraud topology.</p>
        </div>
        <div className="heading-actions">
          <div className="tab-switcher">
            <button className={`tab-btn ${activeTab === 'graph' ? 'active' : ''}`} onClick={() => setActiveTab('graph')}>
              <Network size={14} /> Explorer Graph
            </button>
            <button className={`tab-btn ${activeTab === 'playback' ? 'active' : ''}`} onClick={() => setActiveTab('playback')}>
              <Play size={14} /> Ring Playback
            </button>
            <button className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
              <GitBranch size={14} /> Graph Algorithms
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Grid */}
      <section className="graph-workspace">
        {/* Graph Toolbar */}
        <div className="graph-toolbar">
          <div className="search-mini">
            <Search size={15} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter nodes by name, IP, device, GST..."
            />
          </div>

          <div className="filter-pill-group">
            <button className={`pill-btn ${filterMode === 'all' ? 'active' : ''}`} onClick={() => setFilterMode('all')}>
              All Nodes (8)
            </button>
            <button className={`pill-btn ${filterMode === 'high-risk' ? 'active' : ''}`} onClick={() => setFilterMode('high-risk')}>
              High Risk (5)
            </button>
            <button className={`pill-btn ${filterMode === 'community-1' ? 'active' : ''}`} onClick={() => setFilterMode('community-1')}>
              Helix Ring (7)
            </button>
          </div>

          <div className="graph-toolbar-actions">
            <span className="graph-stat"><strong>8,642</strong> Total Nodes</span>
            <span className="graph-stat"><strong>14,209</strong> Edges</span>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE EXPLORER GRAPH */}
        {activeTab === 'graph' && (
          <div className="full-graph">
            <div className="graph-grid large-grid" />

            {/* SVG Glowing Edge Connections */}
            <svg className="graph-lines full-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              {mockGraphEdges.map((edge) => {
                const src = mockGraphNodes.find((n) => n.id === edge.source);
                const tgt = mockGraphNodes.find((n) => n.id === edge.target);
                if (!src || !tgt) return null;

                const isHighlighted = selectedNode === src.id || selectedNode === tgt.id;

                return (
                  <g key={edge.id}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={edge.risk === 'high' ? '#ef4444' : '#3b82f6'}
                      strokeWidth={isHighlighted ? '2.5' : '1.2'}
                      strokeOpacity={isHighlighted ? '0.9' : '0.4'}
                      strokeDasharray={edge.animated ? '3,3' : undefined}
                      className={edge.animated ? 'animated-edge' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Graph Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode === node.id;

              return (
                <button
                  key={node.id}
                  className={`graph-node full-node ${node.risk} ${node.size} ${isSelected ? 'selected' : ''}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => onSelectNode(node.id)}
                >
                  <span>
                    {node.type === 'Customer' ? (
                      <Users size={16} />
                    ) : node.type === 'Seller' ? (
                      <Layers3 size={16} />
                    ) : node.type === 'Device' ? (
                      <Cpu size={16} />
                    ) : node.type === 'Shared IP' ? (
                      <Globe2 size={16} />
                    ) : (
                      <CircleDot size={16} />
                    )}
                  </span>
                  <small>{node.label}</small>
                </button>
              );
            })}

            {/* Canvas Overlay Legend & Controls */}
            <div className="map-controls">
              <button title="Zoom In">+</button>
              <span>100%</span>
              <button title="Zoom Out">−</button>
              <button title="Reset View"><Target size={14} /></button>
            </div>

            <div className="map-legend">
              <strong>NODE TYPES</strong>
              <span><i className="blue-dot" /> Customer</span>
              <span><i className="orange-dot" /> Seller Hub</span>
              <span><i className="red-dot" /> Shared Risk Node</span>
              <span><i className="green-dot" /> Delivery Partner</span>
            </div>
          </div>
        )}

        {/* TAB 2: FRAUD RING STEP PLAYBACK */}
        {activeTab === 'playback' && (
          <div className="playback-workspace">
            <div className="playback-controls-bar">
              <div className="playback-info">
                <span className="eyebrow red-eyebrow">STEP PLAYBACK MODE</span>
                <h3>{activeRing.name}</h3>
                <p>Volume Exposed: {activeRing.volumeExposed} · Detection Score: {activeRing.riskScore}%</p>
              </div>

              <div className="playback-buttons">
                <button
                  className="button button-ghost"
                  onClick={() => {
                    setCurrentPlaybackStep(1);
                    setIsPlaying(false);
                  }}
                >
                  <RotateCcw size={15} /> Reset
                </button>
                <button
                  className="button button-primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isPlaying ? 'Pause Playback' : 'Play Timeline'}</span>
                </button>
              </div>
            </div>

            {/* Timeline Step Controller Slider */}
            <div className="timeline-slider-card">
              <div className="step-tracker">
                {activeRing.formationSteps.map((s) => (
                  <button
                    key={s.step}
                    className={`step-tick ${currentPlaybackStep >= s.step ? 'active' : ''} ${currentPlaybackStep === s.step ? 'current' : ''}`}
                    onClick={() => {
                      setCurrentPlaybackStep(s.step);
                      setIsPlaying(false);
                    }}
                  >
                    <span>Step {s.step}</span>
                    <small>{s.timestamp}</small>
                  </button>
                ))}
              </div>

              <div className="active-step-banner">
                <div className="step-badge">STEP {activePlaybackInfo.step} OF {activeRing.formationSteps.length}</div>
                <div>
                  <h4>{activePlaybackInfo.title}</h4>
                  <p>{activePlaybackInfo.description}</p>
                </div>
              </div>
            </div>

            {/* Highlighted Graph View during Playback */}
            <div className="full-graph playback-canvas">
              <div className="graph-grid large-grid" />
              <svg className="graph-lines full-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                {mockGraphEdges.map((edge) => {
                  const src = mockGraphNodes.find((n) => n.id === edge.source);
                  const tgt = mockGraphNodes.find((n) => n.id === edge.target);
                  if (!src || !tgt) return null;

                  const isStepActive = activePlaybackInfo.highlightEdges.includes(edge.id);

                  return (
                    <line
                      key={edge.id}
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={isStepActive ? '#ef4444' : '#334155'}
                      strokeWidth={isStepActive ? '3.5' : '1'}
                      strokeOpacity={isStepActive ? '1' : '0.2'}
                      className={isStepActive ? 'animated-edge' : ''}
                    />
                  );
                })}
              </svg>

              {mockGraphNodes.map((node) => {
                const isStepNode = activePlaybackInfo.highlightNodes.includes(node.id);
                return (
                  <button
                    key={node.id}
                    className={`graph-node full-node ${node.risk} ${node.size} ${isStepNode ? 'highlight-pulse' : 'dimmed'}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onClick={() => onSelectNode(node.id)}
                  >
                    <span>
                      {node.type === 'Customer' ? <Users size={16} /> : node.type === 'Seller' ? <Layers3 size={16} /> : <Globe2 size={16} />}
                    </span>
                    <small>{node.label}</small>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: GRAPH ALGORITHMS & TOPOLOGY METRICS */}
        {activeTab === 'analytics' && (
          <div className="analytics-workspace">
            <div className="algo-grid">
              <div className="panel algo-card">
                <div className="eyebrow accent-eyebrow"><Sparkles size={14} /> COMMUNITY DETECTION</div>
                <h3>Louvain Modularization Index</h3>
                <p>Identifies dense clusters of tightly interconnected accounts.</p>
                <div className="algo-metric">
                  <strong>0.914</strong>
                  <span>Modular Density Score</span>
                </div>
                <div className="algo-breakdown">
                  <div className="breakdown-row"><span>Helix Ring (Community 1)</span><strong>7 Nodes</strong></div>
                  <div className="breakdown-row"><span>Logistics Network (Community 2)</span><strong>1 Node</strong></div>
                </div>
              </div>

              <div className="panel algo-card">
                <div className="eyebrow accent-eyebrow"><Target size={14} /> CENTRALITY MEASURE</div>
                <h3>PageRank Influence</h3>
                <p>Measures financial flow dominance across connected actors.</p>
                <div className="algo-metric">
                  <strong>0.291</strong>
                  <span>Northstar Electronics (Max Hub)</span>
                </div>
                <div className="algo-breakdown">
                  <div className="breakdown-row"><span>Maya Chen</span><strong>0.184 PageRank</strong></div>
                  <div className="breakdown-row"><span>IP 185.24.91.77</span><strong>0.198 PageRank</strong></div>
                </div>
              </div>

              <div className="panel algo-card">
                <div className="eyebrow accent-eyebrow"><GitBranch size={14} /> BOTTLENECK DETECTION</div>
                <h3>Betweenness Centrality</h3>
                <p>Detects critical bridge nodes facilitating collusion.</p>
                <div className="algo-metric">
                  <strong>0.680</strong>
                  <span>Max Network Betweenness</span>
                </div>
                <div className="algo-breakdown">
                  <div className="breakdown-row"><span>Shared GST TIN</span><strong>0.290 Betweenness</strong></div>
                  <div className="breakdown-row"><span>Device 4C2A</span><strong>0.350 Betweenness</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SIDEBAR: NODE INSPECTOR */}
        <div className="node-inspector">
          <div className="inspector-top">
            <div className={`inspector-avatar ${selectedNodeData.risk}`}>
              {selectedNodeData.type === 'Customer' ? (
                <Users size={20} />
              ) : selectedNodeData.type === 'Seller' ? (
                <Layers3 size={20} />
              ) : (
                <Cpu size={20} />
              )}
            </div>
            <div>
              <div className="eyebrow">{selectedNodeData.type.toUpperCase()} PROFILE</div>
              <h2>{selectedNodeData.label}</h2>
              <span className="verified">
                <CheckCircle2 size={13} /> Verified Entity Record
              </span>
            </div>
          </div>

          <div className="trust-score">
            <div>
              <span>DYNAMIC TRUST SCORE</span>
              <strong className={selectedNodeData.trustScore < 40 ? 'red-text' : 'green-text'}>
                {selectedNodeData.trustScore}
              </strong>
            </div>
            <div className="score-meter">
              <span style={{ width: `${selectedNodeData.trustScore}%` }} />
            </div>
            <small>
              <ArrowDownRight size={13} /> -18 pts decrease in last 30 days
            </small>
          </div>

          <div className="inspector-stats">
            <div>
              <strong>{selectedNodeData.pagerank.toFixed(3)}</strong>
              <span>PageRank</span>
            </div>
            <div>
              <strong>{selectedNodeData.betweenness.toFixed(2)}</strong>
              <span>Betweenness</span>
            </div>
            <div>
              <strong>{selectedNodeData.details.transactionsCount}</strong>
              <span>TX Count</span>
            </div>
          </div>

          <div className="evidence-box">
            <div>
              <AlertTriangle size={15} />
              <strong>Risk Signal Evidence</strong>
            </div>
            <p>{selectedNodeData.evidenceText}</p>
          </div>

          <div className="details-list">
            {selectedNodeData.details.ip && (
              <div className="detail-row"><span>IP Address:</span><strong>{selectedNodeData.details.ip}</strong></div>
            )}
            {selectedNodeData.details.device && (
              <div className="detail-row"><span>Device ID:</span><strong>{selectedNodeData.details.device}</strong></div>
            )}
            {selectedNodeData.details.gst && (
              <div className="detail-row"><span>GST TIN:</span><strong>{selectedNodeData.details.gst}</strong></div>
            )}
            <div className="detail-row"><span>Flagged Signal:</span><strong className="red-text">{selectedNodeData.details.flaggedSignal}</strong></div>
          </div>

          <button className="button button-primary full-button" onClick={() => alert(`Opening deep profile audit for ${selectedNodeData.label}`)}>
            Open Entity Deep Audit <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};
