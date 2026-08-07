import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Radar,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { UserRole } from '../../types';

interface LoginPageProps {
  onLogin: (role: UserRole, name: string) => void;
  onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onCancel }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [email, setEmail] = useState('arjun.kapoor@steelshield.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoSelect = (role: UserRole, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const nameMap: Record<UserRole, string> = {
        Admin: 'Arjun Kapoor',
        'Lead Investigator': 'Priya Nair',
        'Fraud Analyst': 'Dev Sharma',
        Auditor: 'Sarah Jenkins',
      };
      onLogin(selectedRole, nameMap[selectedRole]);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="login-overlay">
      <div className="login-bg-particles">
        <div className="login-orb orb-1" />
        <div className="login-orb orb-2" />
      </div>

      <div className="login-glass-card">
        <div className="login-header">
          <div className="brand-mark large">
            <Radar size={28} strokeWidth={2.5} />
          </div>
          <h2>Enterprise Authentication</h2>
          <p>SteelShield AI Security Operations Center</p>
        </div>

        {/* Preset Roles Quick Selector */}
        <div className="role-presets">
          <span className="preset-label">QUICK DEMO ROLES:</span>
          <div className="preset-buttons">
            <button
              type="button"
              className={`preset-chip ${selectedRole === 'Admin' ? 'active' : ''}`}
              onClick={() => handleDemoSelect('Admin', 'arjun.kapoor@steelshield.ai')}
            >
              <ShieldCheck size={14} /> Admin
            </button>
            <button
              type="button"
              className={`preset-chip ${selectedRole === 'Lead Investigator' ? 'active' : ''}`}
              onClick={() => handleDemoSelect('Lead Investigator', 'priya.nair@steelshield.ai')}
            >
              <UserCheck size={14} /> Lead Investigator
            </button>
            <button
              type="button"
              className={`preset-chip ${selectedRole === 'Fraud Analyst' ? 'active' : ''}`}
              onClick={() => handleDemoSelect('Fraud Analyst', 'dev.sharma@steelshield.ai')}
            >
              <KeyRound size={14} /> Analyst
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Work Email</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@enterprise.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Selected System Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="role-select"
            >
              <option value="Admin">Administrator (Full Access)</option>
              <option value="Lead Investigator">Lead Investigator (Case Operations)</option>
              <option value="Fraud Analyst">Fraud Analyst (Review & Scoring)</option>
              <option value="Auditor">Compliance Auditor (Read Only)</option>
            </select>
          </div>

          <div className="form-row-between">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember session credentials</span>
            </label>

            <span className="security-badge">
              <CheckCircle2 size={13} className="text-teal-400" /> 2FA MFA Active
            </span>
          </div>

          <button type="submit" className="button button-primary full-button login-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Authenticating SSO...</span>
            ) : (
              <>
                <span>Access Command Center</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <button type="button" className="text-button" onClick={onCancel}>
            Return to Public Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};
