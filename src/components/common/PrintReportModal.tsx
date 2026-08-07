import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileCheck,
  FileSearch,
  Printer,
  Radar,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CaseItem, Transaction } from '../../types';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CaseItem | Transaction | null;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const isCase = 'timeline' in data;
  const reportId = isCase ? (data as CaseItem).id : (data as Transaction).id;
  const title = isCase ? (data as CaseItem).title : `Transaction ${data.id} Intelligence Report`;
  const riskScore = data.score;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card printable-report-card">
        {/* Modal Top Actions (Hidden during print) */}
        <div className="modal-toolbar no-print">
          <div className="toolbar-title">
            <FileSearch size={18} />
            <span>Compliance Audit Printable Report</span>
          </div>
          <div className="toolbar-buttons">
            <button className="button button-primary small" onClick={handlePrint}>
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button className="icon-button" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="report-print-body">
          <div className="report-header">
            <div className="brand">
              <Radar size={28} />
              <div>
                <h2>STEELSHIELD AI · AUDIT DOSSIER</h2>
                <span>CONFIDENTIAL · FOR COMPLIANCE & LEGAL REVIEW</span>
              </div>
            </div>
            <div className="report-meta">
              <strong>REPORT ID: {reportId}</strong>
              <small>Generated: {new Date().toLocaleDateString()} UTC</small>
            </div>
          </div>

          <hr className="report-divider" />

          {/* Key Facts Box */}
          <div className="report-facts-grid">
            <div>
              <span className="fact-label">Subject Title:</span>
              <strong>{title}</strong>
            </div>
            <div>
              <span className="fact-label">Evaluation Score:</span>
              <strong className={riskScore > 80 ? 'red-text' : 'green-text'}>
                {riskScore} / 100 Risk Index
              </strong>
            </div>
            <div>
              <span className="fact-label">Status:</span>
              <strong>{data.status.toUpperCase()}</strong>
            </div>
            <div>
              <span className="fact-label">Auditor:</span>
              <strong>Arjun Kapoor (Compliance Lead)</strong>
            </div>
          </div>

          {/* Evidence Section */}
          <div className="report-section">
            <h3>1. AI Risk Signal & SHAP Vector Analysis</h3>
            <p>
              Automated evaluation by SteelShield Random Forest micro-agent ensemble score flagged this record due to anomalous entity graph density and proxy IP origin.
            </p>

            <ul className="report-evidence-list">
              {isCase
                ? (data as CaseItem).aiSummary.featureImportance.map((f, i) => (
                    <li key={i}>
                      <strong>{f.feature}</strong>: {(f.weight * 100).toFixed(0)}% contribution weight score
                    </li>
                  ))
                : (data as Transaction).evidence.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          {/* Timeline Section */}
          {isCase && (
            <div className="report-section">
              <h3>2. Chronological Event Sequence</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Category</th>
                    <th>Event Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {(data as CaseItem).timeline.map((ev) => (
                    <tr key={ev.id}>
                      <td>{ev.timestamp}</td>
                      <td>{ev.category}</td>
                      <td>{ev.title} - {ev.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Signature Block */}
          <div className="report-signature-block">
            <div className="sig-box">
              <div className="sig-line" />
              <span>Arjun Kapoor, Compliance Lead</span>
              <small>Digital Signature ID: SHA256-8F3A910B</small>
            </div>
            <div className="sig-box">
              <div className="sig-line" />
              <span>System Certification Seal</span>
              <small>SteelShield AI Trust Engine v4.2</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
