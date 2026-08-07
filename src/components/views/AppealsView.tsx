import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock3,
  FileCheck,
  FileText,
  ShieldAlert,
  Upload,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { mockAppeals } from '../../data/mockData';
import { AppealItem } from '../../types';

export const AppealsView: React.FC = () => {
  const [appealsList, setAppealsList] = useState<AppealItem[]>(mockAppeals);
  const [selectedAppealId, setSelectedAppealId] = useState<string>('APP-2026-104');
  const [reviewComment, setReviewComment] = useState('');

  const activeAppeal = appealsList.find((a) => a.id === selectedAppealId) || appealsList[0];

  const handleResolve = (status: 'Approved' | 'Rejected') => {
    setAppealsList((prev) =>
      prev.map((item) =>
        item.id === selectedAppealId
          ? {
              ...item,
              status,
              reviewedBy: 'Arjun Kapoor (Admin)',
              reviewDate: 'Just now',
              comments: reviewComment || `Appeal manually ${status.toLowerCase()} by compliance officer.`,
            }
          : item
      )
    );
    setReviewComment('');
  };

  return (
    <div className="appeals-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> MERCHANT & CUSTOMER APPEALS WORKFLOW
          </div>
          <h1>Appeals Command Center</h1>
          <p>Review compliance documents, SLA countdowns, and execute account reinstatement decisions.</p>
        </div>
        <div className="heading-actions">
          <div className="live-pill"><span className="pulse-dot amber" /> 2 Pending Appeals Active</div>
        </div>
      </section>

      <section className="appeals-grid">
        {/* Left Queue Panel */}
        <div className="panel appeals-queue-panel">
          <div className="panel-header">
            <div>
              <h3>Appeals Queue</h3>
              <p>Ordered by SLA urgency countdown</p>
            </div>
          </div>

          <div className="appeals-list">
            {appealsList.map((app) => {
              const isSelected = app.id === selectedAppealId;
              return (
                <button
                  key={app.id}
                  className={`appeal-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedAppealId(app.id)}
                >
                  <div className="appeal-card-top">
                    <strong>{app.id}</strong>
                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      <i />{app.status}
                    </span>
                  </div>
                  <h4>{app.actorName}</h4>
                  <p>{app.reason.slice(0, 70)}...</p>

                  <div className="appeal-card-bottom">
                    <span><Clock3 size={13} /> {app.slaRemainingHours > 0 ? `${app.slaRemainingHours}h SLA` : 'SLA Met'}</span>
                    <span>{app.documentCount} Documents</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Appeal Workspace Panel */}
        <div className="panel appeal-detail-panel">
          <div className="appeal-header">
            <div>
              <div className="eyebrow">{activeAppeal.id} · {activeAppeal.actorType.toUpperCase()} APPEAL</div>
              <h2>{activeAppeal.actorName}</h2>
              <p>Submitted: {activeAppeal.dateSubmitted} · Case Link: <strong>{activeAppeal.caseId}</strong></p>
            </div>

            <div className="sla-badge-box">
              <Clock3 size={18} className="text-amber-400" />
              <div>
                <strong>{activeAppeal.slaRemainingHours} HOURS</strong>
                <span>SLA REMAINING</span>
              </div>
            </div>
          </div>

          <div className="evidence-box">
            <div><FileText size={15} /><strong>Appeal Rationale & Claim Statement</strong></div>
            <p>{activeAppeal.reason}</p>
          </div>

          {/* Documents Attached */}
          <div className="documents-section">
            <h4>Uploaded Document Attachments ({activeAppeal.documentCount})</h4>
            <div className="doc-pills">
              {activeAppeal.evidenceProvided.split(',').map((doc, idx) => (
                <div key={idx} className="doc-pill">
                  <FileCheck size={16} className="text-teal-400" />
                  <span>{doc.trim()}</span>
                  <small>Verified PDF</small>
                </div>
              ))}
            </div>
          </div>

          {/* Action Decision Form */}
          {activeAppeal.status === 'Pending' ? (
            <div className="appeal-decision-card">
              <h3>Investigator Decision & Reinstatement Rationale</h3>
              <textarea
                rows={3}
                placeholder="Enter notes or justification for approving/rejecting this appeal..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />

              <div className="decision-actions">
                <button className="button button-danger" onClick={() => handleResolve('Rejected')}>
                  <XCircle size={15} /> Reject Appeal & Maintain Freeze
                </button>
                <button className="button button-teal" onClick={() => handleResolve('Approved')}>
                  <CheckCircle2 size={15} /> Approve Appeal & Reinstate Account
                </button>
              </div>
            </div>
          ) : (
            <div className="appeal-resolution-box">
              <div className="resolution-header">
                <CheckCircle2 size={18} className="text-teal-400" />
                <div>
                  <strong>Appeal Resolved: {activeAppeal.status}</strong>
                  <span>Reviewed by {activeAppeal.reviewedBy} on {activeAppeal.reviewDate}</span>
                </div>
              </div>
              <p>{activeAppeal.comments}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
