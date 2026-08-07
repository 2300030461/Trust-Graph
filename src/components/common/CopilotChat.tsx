import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Sparkles,
  User,
  X,
  Zap,
} from 'lucide-react';
import { CopilotMessage, View } from '../../types';

interface CopilotChatProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: View) => void;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({ isOpen, onClose, onNavigateView }) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-1',
      sender: 'copilot',
      text: 'Hello Arjun! I am your SteelShield AI Copilot. Ask me anything about suspicious entities, collusion rings, or SHAP case evidence.',
      time: '09:42',
      suggestedActions: [
        'Why was Northstar Electronics flagged?',
        'Summarize Case 041',
        'How does Community Helix operate?',
        'List top high-risk IP addresses',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'I have analyzed your query across the trust graph dataset.';
      let actions: string[] | undefined;

      const q = query.toLowerCase();

      if (q.includes('northstar') || q.includes('flagged')) {
        replyText =
          'Northstar Electronics (Seller) was flagged with a Risk Score of 94 because it shares an identical hardware canvas fingerprint (Device 4C2A) with buyer Maya Chen. Additionally, transaction velocity exceeded $84,920 within 15 minutes of account registration via datacenter proxy IP 185.24.91.77.';
        actions = ['Jump to Trust Graph', 'Open Case CASE-2026-041'];
      } else if (q.includes('041') || q.includes('helix')) {
        replyText =
          'CASE-2026-041 (Community Helix) involves an 8-actor triangular collusion ring. The network uses shared GST TIN 29AAACN8491K1Z5 to invoice fake buyer accounts before initiating rapid chargebacks.';
        actions = ['Freeze Merchant Funds', 'View Timeline'];
      } else if (q.includes('ip') || q.includes('datacenter')) {
        replyText =
          'Top high-risk IP is 185.24.91.77 (M247 Ltd Tor Exit Node). It has generated 89 requests and connects 5 distinct customer profiles to Northstar Electronics.';
        actions = ['Open IP Intelligence', 'Filter Graph by IP'];
      } else {
        replyText = `Based on our 16 AI Agent pipeline models, "${query}" evaluates to a high-confidence signal. Recommended next step is reviewing the Trust Graph topology or executing an automated verification request.`;
        actions = ['Open Trust Graph', 'View Case Command Center'];
      }

      const copilotMsg: CopilotMessage = {
        id: 'm-' + (Date.now() + 1),
        sender: 'copilot',
        text: replyText,
        time: new Date().toTimeString().split(' ')[0].slice(0, 5),
        suggestedActions: actions,
      };

      setMessages((prev) => [...prev, copilotMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (actionText: string) => {
    if (actionText.includes('Graph')) {
      onNavigateView('Trust Graph');
      onClose();
    } else if (actionText.includes('Case')) {
      onNavigateView('Cases');
      onClose();
    } else {
      handleSend(actionText);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="copilot-drawer">
      <div className="copilot-header">
        <div className="copilot-title">
          <Sparkles size={18} className="text-purple-400" />
          <div>
            <strong>SteelShield AI Copilot</strong>
            <small>Natural Language Fraud Intelligence</small>
          </div>
        </div>
        <button className="icon-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="copilot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-wrap ${msg.sender}`}>
            <div className="chat-avatar">
              {msg.sender === 'copilot' ? <Bot size={15} /> : <User size={15} />}
            </div>
            <div className="chat-content">
              <p>{msg.text}</p>
              <time>{msg.time}</time>

              {msg.suggestedActions && (
                <div className="chat-chip-suggestions">
                  {msg.suggestedActions.map((act) => (
                    <button key={act} className="chat-chip" onClick={() => handleActionClick(act)}>
                      <Zap size={12} /> {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-wrap copilot">
            <div className="chat-avatar"><Bot size={15} /></div>
            <div className="chat-content typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="copilot-input-bar"
      >
        <input
          type="text"
          placeholder="Ask Copilot about sellers, cases, graph rings..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <button type="submit" className="icon-button send-btn">
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};
