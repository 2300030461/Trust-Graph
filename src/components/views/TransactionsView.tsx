import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Download,
  FileSearch,
  Filter,
  Globe2,
  Network,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { mockTransactions } from '../../data/mockData';
import { Transaction } from '../../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  query: string;
  setQuery: (value: string) => void;
  onNavigateToGraph?: () => void;
  onOpenReportModal?: (tx: Transaction) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  query,
  setQuery,
  onNavigateToGraph,
  onOpenReportModal,
}) => {
  const [expandedTxId, setExpandedTxId] = useState<string | null>('TX-8F3A91');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Critical' | 'Review' | 'Cleared'>('All');
  const [sortField, setSortField] = useState<'score' | 'rawAmount' | 'time'>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter & Sort
  const processedTransactions = useMemo(() => {
    let list = transactions;

    if (statusFilter !== 'All') {
      list = list.filter((t) => t.status === statusFilter);
    }

    list = [...list].sort((a, b) => {
      if (sortField === 'score') {
        return sortDirection === 'desc' ? b.score - a.score : a.score - b.score;
      } else if (sortField === 'rawAmount') {
        return sortDirection === 'desc' ? b.rawAmount - a.rawAmount : a.rawAmount - b.rawAmount;
      }
      return 0;
    });

    return list;
  }, [transactions, statusFilter, sortField, sortDirection]);

  const toggleSort = (field: 'score' | 'rawAmount' | 'time') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportCSV = () => {
    const headers = ['Transaction ID', 'Merchant', 'Actor', 'Amount', 'Score', 'Status', 'IP', 'Device', 'Time'];
    const rows = processedTransactions.map((t) => [
      t.id,
      t.merchant,
      t.actor,
      t.amount,
      t.score,
      t.status,
      t.ip,
      t.device,
      t.time,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `steelshield_transactions_${Date.now()}.csv`;
    a.click();
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(processedTransactions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `steelshield_transactions_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="transactions-view-container">
      {/* Header */}
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> REAL-TIME PAYMENT TELEMETRY
          </div>
          <h1>Transaction Intelligence Grid</h1>
          <p>Every payment evaluated, scored, linked to the trust graph, and backed by evidence.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-ghost" onClick={exportJSON}>
            <Download size={15} /> Export JSON
          </button>
          <button className="button button-primary" onClick={exportCSV}>
            <Download size={15} /> Export CSV
          </button>
        </div>
      </section>

      {/* Main Grid Panel */}
      <section className="panel transaction-panel">
        <div className="table-toolbar">
          <div className="search-mini wide">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by transaction ID, actor, merchant, IP address..."
            />
            {query && (
              <button className="icon-button small" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="filter-pill-group">
            {(['All', 'Critical', 'Review', 'Cleared'] as const).map((st) => (
              <button
                key={st}
                className={`pill-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="toolbar-right">
            <button className="button button-ghost" onClick={() => toggleSort('score')}>
              Sort by Risk {sortField === 'score' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button className="button button-ghost" onClick={() => toggleSort('rawAmount')}>
              Sort by Amount {sortField === 'rawAmount' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>

        {/* Enterprise Data Table */}
        <div className="table-wrap">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th />
                <th>TRANSACTION ID</th>
                <th>ACTOR / MERCH</th>
                <th className="cursor-pointer" onClick={() => toggleSort('rawAmount')}>
                  AMOUNT {sortField === 'rawAmount' && (sortDirection === 'desc' ? '↓' : '↑')}
                </th>
                <th className="cursor-pointer" onClick={() => toggleSort('score')}>
                  AI RISK SCORE {sortField === 'score' && (sortDirection === 'desc' ? '↓' : '↑')}
                </th>
                <th>STATUS</th>
                <th>DEVICE / IP</th>
                <th>TIME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {processedTransactions.map((tx) => {
                const isExpanded = expandedTxId === tx.id;

                return (
                  <React.Fragment key={tx.id}>
                    <tr className={`table-row ${isExpanded ? 'is-expanded' : ''}`}>
                      <td>
                        <button
                          className="icon-button small"
                          onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                          title="Expand Evidence Drawer"
                        >
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                      </td>
                      <td>
                        <strong className="mono">{tx.id}</strong>
                        <span className="table-sub">{tx.paymentMethod}</span>
                      </td>
                      <td>
                        <strong>{tx.actor}</strong>
                        <span className="table-sub">{tx.merchant}</span>
                      </td>
                      <td>
                        <strong>{tx.amount}</strong>
                      </td>
                      <td>
                        <div className="table-score">
                          <span
                            className={
                              tx.score > 85 ? 'high-score' : tx.score > 60 ? 'medium-score' : 'low-score'
                            }
                          >
                            {tx.score}
                          </span>
                          <div>
                            <i
                              style={{ width: `${tx.score}%` }}
                              className={
                                tx.score > 85 ? 'high-fill' : tx.score > 60 ? 'medium-fill' : 'low-fill'
                              }
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${tx.status.toLowerCase()}`}>
                          <i /> {tx.status}
                        </span>
                      </td>
                      <td>
                        <div className="mono-sub">
                          <span className="truncate">{tx.device}</span>
                          <small className="truncate">{tx.ip}</small>
                        </div>
                      </td>
                      <td>
                        <span className="time-cell">{tx.time}</span>
                      </td>
                      <td>
                        <div className="row-actions">
                          {onOpenReportModal && (
                            <button
                              className="icon-button small"
                              title="Print / Export Report Modal"
                              onClick={() => onOpenReportModal(tx)}
                            >
                              <FileSearch size={15} />
                            </button>
                          )}
                          {onNavigateToGraph && (
                            <button
                              className="icon-button small"
                              title="Jump to Trust Graph"
                              onClick={onNavigateToGraph}
                            >
                              <Network size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDABLE EVIDENCE DRAWER */}
                    {isExpanded && (
                      <tr className="expanded-drawer-row">
                        <td colSpan={9}>
                          <div className="evidence-drawer">
                            <div className="drawer-grid">
                              <div className="drawer-section">
                                <h4>
                                  <Sparkles size={14} className="text-blue-400" /> AI Evidence Breakdown
                                </h4>
                                <ul className="evidence-list">
                                  {tx.evidence.map((item, idx) => (
                                    <li key={idx}>
                                      <ShieldAlert size={14} className="text-red-400" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="drawer-section">
                                <h4>Identity & Hardware Signals</h4>
                                <div className="signals-grid">
                                  <div><span>GST Tax ID:</span> <strong>{tx.gst}</strong></div>
                                  <div><span>Email:</span> <strong>{tx.email}</strong></div>
                                  <div><span>IP ASN:</span> <strong>{tx.ip} (Tor Exit)</strong></div>
                                  <div><span>Location:</span> <strong>{tx.location}</strong></div>
                                </div>
                              </div>

                              <div className="drawer-section drawer-actions">
                                <h4>Investigator Actions</h4>
                                <div className="button-stack">
                                  {onNavigateToGraph && (
                                    <button className="button button-primary" onClick={onNavigateToGraph}>
                                      <Network size={14} /> Open in Graph Explorer
                                    </button>
                                  )}
                                  {onOpenReportModal && (
                                    <button className="button button-ghost" onClick={() => onOpenReportModal(tx)}>
                                      <FileSearch size={14} /> Generate Printable Case Report
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>

          {processedTransactions.length === 0 && (
            <div className="empty-state">
              <Search size={28} />
              <strong>No transactions found</strong>
              <span>Try adjusting your query or filter rules.</span>
            </div>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="table-footer">
          <span>Showing {processedTransactions.length} of 24,891 live transactions</span>
          <div className="pagination">
            <button disabled>← Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <span>...</span>
            <button>249</button>
            <button>Next →</button>
          </div>
        </div>
      </section>
    </div>
  );
};
