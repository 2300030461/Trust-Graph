export type View =
  | 'Landing'
  | 'Overview'
  | 'Trust Graph'
  | 'Transactions'
  | 'Cases'
  | 'Multi-Agent'
  | 'Appeals'
  | 'Notifications'
  | 'Analytics'
  | 'Health'
  | 'System Health';

export type Status = 'Critical' | 'Review' | 'Cleared';

export type UserRole = 'Admin' | 'Lead Investigator' | 'Fraud Analyst' | 'Auditor';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface TrustEntity {
  id: string;
  name: string;
  type: 'Customer' | 'Seller' | 'Delivery Partner' | 'Device' | 'IP Address' | 'GST' | 'Email' | 'Address';
  score: number; // 0-100
  previousScore: number;
  riskCategory: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  signalsCount: number;
  connectedEntitiesCount: number;
  verified: boolean;
}

export interface Transaction {
  id: string;
  merchant: string;
  actor: string;
  amount: string;
  rawAmount: number;
  score: number;
  status: Status;
  time: string;
  ip: string;
  device: string;
  gst: string;
  email: string;
  paymentMethod: string;
  location: string;
  evidence: string[];
}

export interface GraphNodeData {
  id: string;
  label: string;
  type: 'Customer' | 'Seller' | 'Device' | 'Shared IP' | 'Shared GST' | 'Partner';
  x: number;
  y: number;
  risk: 'high' | 'medium' | 'low';
  size: 'large' | 'medium' | 'small';
  trustScore: number;
  connectedIds: string[];
  ringId?: string;
  pagerank: number;
  betweenness: number;
  communityId: number;
  evidenceText: string;
  details: {
    ip?: string;
    device?: string;
    gst?: string;
    address?: string;
    transactionsCount: number;
    flaggedSignal: string;
  };
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  risk: 'high' | 'medium' | 'low';
  animated?: boolean;
  timestampStep?: number; // for playback
}

export interface FraudRing {
  id: string;
  name: string;
  riskScore: number;
  nodesCount: number;
  volumeExposed: string;
  detectedAt: string;
  nodeIds: string[];
  formationSteps: {
    step: number;
    timestamp: string;
    title: string;
    description: string;
    highlightNodes: string[];
    highlightEdges: string[];
  }[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'auth' | 'transaction' | 'fingerprint' | 'network' | 'evidence' | 'decision' | 'appeal';
  severity: 'info' | 'warning' | 'critical';
}

export interface FeatureImportance {
  feature: string;
  weight: number; // 0 - 1
  category: string;
}

export interface CaseItem {
  id: string;
  title: string;
  type: string;
  score: number;
  status: Status;
  actors: string;
  actorsCount: number;
  volumeExposed: string;
  createdAt: string;
  assignedTo: string;
  merchant: string;
  primaryActor: string;
  timeline: TimelineEvent[];
  aiSummary: {
    explanation: string;
    confidence: number;
    recommendedAction: 'Freeze Account' | 'Block Transaction' | 'Request Verification' | 'Approve';
    businessImpact: string;
    featureImportance: FeatureImportance[];
    evidenceRanking: { claim: string; weight: number }[];
  };
  notes: { id: string; author: string; time: string; text: string }[];
  appealStatus?: 'None' | 'Pending' | 'Approved' | 'Rejected';
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Processing' | 'Idle' | 'Warning';
  latencyMs: number;
  accuracyRate: number;
  processedCount: number;
  lastAction: string;
  iconName: string;
  description: string;
}

export interface AppealItem {
  id: string;
  caseId: string;
  actorName: string;
  actorType: string;
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  evidenceProvided: string;
  documentCount: number;
  slaRemainingHours: number;
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  channel: 'Email' | 'SMS' | 'WhatsApp' | 'System Alert' | 'Push Notification';
  recipient: string;
  title: string;
  body: string;
  status: 'Delivered' | 'Queued' | 'Failed';
  retryCount: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  time: string;
  suggestedActions?: string[];
  caseId?: string;
}
