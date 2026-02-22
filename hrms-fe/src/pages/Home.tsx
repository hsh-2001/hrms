// src/pages/HRMSDashboard.tsx
import { useState } from 'react';
import {
  Users,
  UserPlus,
  UserMinus,
  CalendarCheck,
  Briefcase,
  Award,
  TrendingUp,
} from 'lucide-react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'hr';
  time: string;
};

const HRMSDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! HR team here — how can we help today?", sender: 'hr', time: '09:15' },
    { id: 2, text: "I would like to request a leave update for next month", sender: 'user', time: '09:18' },
    { id: 3, text: "Sure! Your approved leaves: 14 days remaining this year.", sender: 'hr', time: '09:19' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage('');

    // Simulated HR reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thanks for your message! We'll get back to you shortly with more details.",
          sender: 'hr',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 md:p-8 lg:p-10">
      {/* KPI Cards - HR focused */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 md:gap-6 mb-8 lg:mb-10">
        {[
          { title: 'Total Employees', value: '1,248', icon: Users, color: 'blue', trend: '+28 this month' },
          { title: 'New Hires', value: '42', icon: UserPlus, color: 'emerald', trend: '+14%' },
          { title: 'Turnover Rate', value: '8.4%', icon: UserMinus, color: 'rose', trend: '-1.2%' },
          { title: 'Avg. Absence Rate', value: '2.7%', icon: CalendarCheck, color: 'amber', trend: '↓ Good' },
          { title: 'Training Completion', value: '87%', icon: Award, color: 'violet', trend: '+5%' },
          { title: 'Engagement Score', value: '4.32 / 5', icon: TrendingUp, color: 'indigo', trend: '↑ Stable' },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-1.5">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p
              className={`mt-3 text-sm font-medium ${
                stat.trend.includes('+') || stat.trend.includes('↑') || stat.trend.includes('Good')
                  ? 'text-emerald-600'
                  : 'text-rose-600'
              }`}
            >
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column layout: Left = HR Overview / Charts, Right = HR Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

        {/* Left - Main HR Overview */}
        <div className="lg:col-span-2 space-y-6">

          {/* Headcount & Department Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Workforce Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { dept: 'Engineering', count: 342, percent: '27%' },
                { dept: 'Sales', count: 218, percent: '17%' },
                { dept: 'Marketing', count: 156, percent: '13%' },
                { dept: 'Operations', count: 189, percent: '15%' },
              ].map((item) => (
                <div key={item.dept} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-700">{item.count}</p>
                  <p className="text-sm font-medium">{item.dept}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.percent}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t text-center text-sm text-gray-500">
              [ Placeholder: Insert Recharts Bar/Pie chart for department distribution ]
            </div>
          </div>

          {/* Recent Activity / Leaves & Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Recent HR Activity</h2>
            <ul className="space-y-3">
              {[
                "Sarah K. approved – Maternity Leave (Jun 15 – Sep 30)",
                "Q2 Performance Reviews – 92% completed",
                "New policy: Remote Work Friday pilot launched",
                "John D. requested resignation – Exit interview scheduled",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right - HR Chat / Support Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[620px] lg:h-auto">
          <div className="px-5 py-4 border-b flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
              HR
            </div>
            <div>
              <p className="font-semibold">HR Assistant</p>
              <p className="text-xs text-green-600 font-medium">Online • Ask anything about leaves, payroll, policies...</p>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-gray-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p
                    className={`text-xs mt-1.5 opacity-75 ${
                      msg.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask HR anything..."
                className="flex-1 px-5 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition shadow-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HRMSDashboard;