import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  Smartphone,
} from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { NotificationItem } from '../../types';

export const NotificationView: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [filterChannel, setFilterChannel] = useState<string>('All');

  const handleRetry = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'Delivered', retryCount: n.retryCount + 1 } : n))
    );
  };

  const filtered = filterChannel === 'All'
    ? notifications
    : notifications.filter((n) => n.channel === filterChannel);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return <Mail size={16} />;
      case 'SMS': return <Smartphone size={16} />;
      case 'WhatsApp': return <MessageSquare size={16} />;
      case 'Push Notification': return <Send size={16} />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <div className="notification-view-container">
      <section className="page-heading compact-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> MULTI-CHANNEL DISPATCH GATEWAY
          </div>
          <h1>Notification Center & Dispatch Telemetry</h1>
          <p>Real-time delivery status for webhooks, SMS, email tickets, and push alerts.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-primary" onClick={() => alert('Dispatched test alert payload to SOC webhook')}>
            <Send size={15} /> Send Test Alert
          </button>
        </div>
      </section>

      <section className="panel notification-panel">
        <div className="table-toolbar">
          <div className="filter-pill-group">
            {['All', 'Email', 'SMS', 'WhatsApp', 'Push Notification', 'System Alert'].map((ch) => (
              <button
                key={ch}
                className={`pill-btn ${filterChannel === ch ? 'active' : ''}`}
                onClick={() => setFilterChannel(ch)}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        <div className="notification-list">
          {filtered.map((item) => (
            <div key={item.id} className="notification-row">
              <div className={`channel-icon-pill ${item.channel.toLowerCase().replace(' ', '-')}`}>
                {getChannelIcon(item.channel)}
              </div>
              <div className="notification-copy">
                <div className="notification-title-row">
                  <strong>{item.title}</strong>
                  <span className={`status-badge ${item.status.toLowerCase()}`}>
                    <i /> {item.status}
                  </span>
                </div>
                <p>{item.body}</p>
                <small>Recipient: <strong>{item.recipient}</strong> · {item.timestamp}</small>
              </div>

              {item.status !== 'Delivered' && (
                <button className="button button-ghost small" onClick={() => handleRetry(item.id)}>
                  <RefreshCw size={14} /> Retry Dispatch
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
