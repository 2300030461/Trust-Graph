import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  GitBranch,
  Layers3,
  LockKeyhole,
  MessageSquare,
  Network,
  Plus,
  ShieldAlert,
  Sparkles,
  Users,
} from 'lucide-react';
import { mockCases } from '../../data/mockData';
import { CaseItem, View } from '../../types';

interface CasesViewProps {
  onNavigate: (view: View) => void;
  onOpenReportModal?: (caseItem: CaseItem) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({ onNavigate, onOpenReportModal }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-2026-041');
  const [newNoteText, setNewNoteText] = useState('');

  const activeCase = mockCases.find((c) => c.id === selectedCaseId) || mockCases[0];

  const [caseActionStatus, setCaseActionStatus] = useState<string | null>(null);

  const handleExecuteAction = (action: string) => {
    setCaseActionStatus(`Action Executed: ${action}`);
    setTimeout(() => setCaseActionStatus(null), 3500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    activeCase.notes.push({
      id: 'n-' + Date.now(),
      author: 'Arjun Kapoor (You)',
      time: 'Just now',
      text: newNoteText,
    });

    setNewNoteText('');
  };

  return (
    <div className="cases-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> INVESTIGATION WORKSPACE & XAI EVIDENCE
          </div>
          <h1>Case Command Center</h1>
          <p>Defensible, explainable AI narratives and human-in-the-loop compliance oversight.</p>
        </div>
        <div className="heading-actions">
          {onOpenReportModal && (
            <button className="button button-ghost" onClick={() => onOpenReportModal(activeCase)}>
              <FileSearch size={15} /> Export Printable Report
            </button>
          )}
          <button className="button button-primary" onClick={() => onNavigate('Trust Graph')}>
            <Network size={15} /> Open Trust Graph
          </button>
        </div>
      </section>

      {/* Case Summary Strip */}
      <div className="case-summary-strip">
        <div className="summary-pill red">
          <AlertTriangle size={16} />
          <div><strong>04 Critical</strong><span>High exposure rings</span></div>
        </div>
        <div className="summary-pill amber">
          <Clock3 size={16} />
          <div><strong>08 Pending</strong><span>Awaiting analyst</span></div>
        </div>
        <div className="summary-pill green">
          <CheckCircle2 size={16} />
          <div><strong>126 Resolved</strong><span>Zero false positives</span></div>
        </div>
      </div>

      {/* Main Grid: Queue List + Detailed Workspace */}
      <section className="case-workspace-grid">
        {/* Left Queue Panel */}
        <div className="panel case-queue-panel">
          <div className="panel-header">
            <div>
              <h3>Priority Queue</h3>
              <p>Ranked by fraud probability & financial risk</p>
            </div>
          </div>

          <div className="case-list">
            {mockCases.map((item) => {
              const isSelected = item.id === selectedCaseId;
              return (
                <button
                  key={item.id}
                  className={`case-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCaseId(item.id)}
                >
                  <div className={`case-score-badge ${item.status.toLowerCase()}`}>{item.score}</div>
                  <div className="case-copy">
                    <div className="case-row-title">
                      <strong>{item.title}</strong>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        <i />{item.status}
                      </span>
                    </div>
                    <span className="case-type">{item.type}</span>
                    <small>{item.id} · {item.actors}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Case Deep Workspace */}
        <div className="panel case-detail-panel">
          {/* Active Case Top Header */}
          <div className="case-detail-header">
            <div>
              <div className="eyebrow red-eyebrow">{activeCase.id} · {activeCase.type.toUpperCase()}</div>
              <h2>{activeCase.title}</h2>
              <p>Primary Merchant: <strong>{activeCase.merchant}</strong> · Buyer: <strong>{activeCase.primaryActor}</strong> · Exposure: <strong className="red-text">{activeCase.volumeExposed}</strong></p>
            </div>

            <div className="case-score-meter-large">
              <div className="meter-val">{activeCase.score}</div>
              <span>FRAUD PROBABILITY</span>
            </div>
          </div>

          {caseActionStatus && (
            <div className="action-notification-banner">
              <CheckCircle2 size={16} />
              <span>{caseActionStatus}</span>
            </div>
          )}

          {/* Recommended Action Buttons */}
          <div className="action-bar-card">
            <div>
              <span className="eyebrow accent-eyebrow"><Sparkles size={14} /> AI RECOMMENDED ACTION</span>
              <h3>{activeCase.aiSummary.recommendedAction.toUpperCase()}</h3>
            </div>
            <div className="action-button-group">
              <button className="button button-danger" onClick={() => handleExecuteAction('Freeze Account')}>
                <LockKeyhole size={14} /> Freeze Account & Funds
              </button>
              <button className="button button-amber" onClick={() => handleExecuteAction('Request Verification')}>
                <Users size={14} /> Request KYC Verification
              </button>
              <button className="button button-teal" onClick={() => handleExecuteAction('Approve')}>
                <CheckCircle2 size={14} /> Clear / Approve Case
              </button>
            </div>
          </div>

          {/* Explainable AI Narrative Section */}
          <div className="case-section-card">
            <div className="section-title">
              <Sparkles size={16} className="text-purple-400" />
              <h3>Explainable AI Case Narrative</h3>
              <span className="badge-confidence">Confidence: {(activeCase.aiSummary.confidence * 100).toFixed(0)}%</span>
            </div>
            <p className="narrative-text">{activeCase.aiSummary.explanation}</p>
            <div className="impact-box">
              <strong>Business Impact:</strong> <span>{activeCase.aiSummary.businessImpact}</span>
            </div>

            {/* Feature Importance Table */}
            <div className="feature-importance-grid">
              <h4>SHAP Feature Weight Contributions</h4>
              <div className="bars-list">
                {activeCase.aiSummary.featureImportance.map((feat, idx) => (
                  <div key={idx} className="feat-row">
                    <div className="feat-info">
                      <span>{feat.feature}</span>
                      <strong>{(feat.weight * 100).toFixed(0)}%</strong>
                    </div>
                    <div className="feat-bar-track">
                      <div className="feat-bar-fill" style={{ width: `${feat.weight * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Case Timeline */}
          <div className="case-section-card">
            <div className="section-title">
              <Clock3 size={16} className="text-blue-400" />
              <h3>Interactive Event Sequence Timeline</h3>
            </div>

            <div className="interactive-timeline">
              {activeCase.timeline.map((ev, idx) => (
                <div key={ev.id} className={`timeline-node-row ${ev.severity}`}>
                  <div className="timeline-connector">
                    <div className="timeline-dot" />
                    {idx < activeCase.timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-time-row">
                      <time>{ev.timestamp}</time>
                      <span className={`cat-pill ${ev.category}`}>{ev.category}</span>
                    </div>
                    <h4>{ev.title}</h4>
                    <p>{ev.description}</p>
                  </div>
                </div>
              ))}

              {activeCase.timeline.length === 0 && (
                <p className="text-slate-400">No timeline events logged yet for this case.</p>
              )}
            </div>
          </div>

          {/* Investigator Notes Section */}
          <div className="case-section-card">
            <div className="section-title">
              <MessageSquare size={16} className="text-teal-400" />
              <h3>Investigator Audit Notes</h3>
            </div>

            <div className="notes-list">
              {activeCase.notes.map((note) => (
                <div key={note.id} className="note-card">
                  <div className="note-meta">
                    <strong>{note.author}</strong>
                    <time>{note.time}</time>
                  </div>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="add-note-form">
              <input
                type="text"
                placeholder="Add compliance notes or rationale..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
              />
              <button type="submit" className="button button-primary">
                <Plus size={14} /> Add Note
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
