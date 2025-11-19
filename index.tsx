import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Icons (SVGs) ---
const PackageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
);
const TruckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const ChatIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const SmartphoneIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);
const BankIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21h18"/><path d="M5 21v-7"/><path d="M19 21v-7"/><path d="M10 9L3 21"/><path d="M14 9l7 12"/><path d="m2 9 10-7 10 7"/><path d="M12 2v7"/></svg>
);
const ServerIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
);

const BrandLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" className="text-blue-600" stroke="currentColor" />
    <path d="M13 10l-3 4h3l-1 4 5-6h-3l2-4-6 6" className="text-blue-500" fill="currentColor" stroke="none" />
    <path d="M3.29 7 12 12 20.71 7" stroke="currentColor" className="opacity-30" />
  </svg>
);

// --- MOCK BACKEND ---
// Simulates an online database using localStorage
const MockBackend = {
  saveBooking: (booking: any) => {
    const bookings = JSON.parse(localStorage.getItem('swiftship_bookings') || '[]');
    bookings.push({ ...booking, timestamp: Date.now() });
    localStorage.setItem('swiftship_bookings', JSON.stringify(bookings));
  },
  getBooking: (id: string) => {
    const bookings = JSON.parse(localStorage.getItem('swiftship_bookings') || '[]');
    return bookings.find((b: any) => b.trackingId === id);
  },
  getAllBookings: () => {
    return JSON.parse(localStorage.getItem('swiftship_bookings') || '[]');
  }
}

// --- AI Chat Widget ---
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: "Hi! I'm SwiftBot. Ask me about our shipping rates, prohibited items, or how to track your package." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: `System Instruction: You are a helpful customer support agent for SwiftShip, a courier company. 
            We offer Standard (3-5 days), Express (1-2 days), and Overnight services. 
            We do not ship hazardous materials, live animals, or perishable food without special clearance.
            Be concise, friendly, and professional.
            User Query: ${userMsg}` }] }
        ]
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble connecting right now. Please try again later." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              SwiftBot Support
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-slate-200 p-2 rounded-2xl rounded-bl-none animate-pulse text-xs text-slate-500">Typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 text-sm border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center justify-center"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <ChatIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

// --- Types ---
interface Address {
  name: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
}

interface PackageDetails {
  weight: number;
  type: 'document' | 'parcel' | 'freight';
  description: string;
}

interface ServiceQuote {
  id: string;
  name: string;
  price: number;
  eta: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

// --- Components ---

const InputField = ({ label, value, onChange, placeholder, type = "text", required = false, icon }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="relative">
        {icon && <div className="absolute left-3 top-2.5 text-slate-400">{icon}</div>}
        <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${icon ? 'pl-10 pr-3 py-2' : 'px-3 py-2'}`}
        />
    </div>
  </div>
);

const PaymentModal = ({ amount, onClose, onSuccess }: { amount: number, onClose: () => void, onSuccess: () => void }) => {
    const [processing, setProcessing] = useState(false);
    const [method, setMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
    const [upiId, setUpiId] = useState('');
    const [bank, setBank] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        // Simulate payment processing time
        await new Promise(resolve => setTimeout(resolve, 2500));
        setProcessing(false);
        onSuccess();
    };

    const formatCard = (val: string) => val.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    const formatExpiry = (val: string) => val.replace(/\D/g, '').substring(0, 4).replace(/(\d{2})(\d)/, '$1/$2').trim();

    const isInvalid = () => {
        if (method === 'card') return cardData.number.length < 16 || cardData.cvv.length < 3;
        if (method === 'upi') return upiId.length < 5 || !upiId.includes('@');
        if (method === 'netbanking') return !bank;
        return true;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <LockIcon className="w-4 h-4 text-green-600"/> Secure Payment
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XIcon className="w-5 h-5"/></button>
                </div>
                
                {/* Payment Method Tabs */}
                <div className="flex p-2 gap-2 border-b">
                    <button onClick={() => setMethod('card')} className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${method === 'card' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                        <CreditCardIcon className="w-4 h-4"/> Card
                    </button>
                    <button onClick={() => setMethod('upi')} className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${method === 'upi' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                        <SmartphoneIcon className="w-4 h-4"/> UPI
                    </button>
                    <button onClick={() => setMethod('netbanking')} className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${method === 'netbanking' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                        <BankIcon className="w-4 h-4"/> NetBanking
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <p className="text-slate-500 text-sm">Total Amount</p>
                        <p className="text-3xl font-bold text-blue-600">${amount.toFixed(2)}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {method === 'card' && (
                            <>
                                <InputField 
                                    label="Card Number" 
                                    placeholder="0000 0000 0000 0000"
                                    value={cardData.number}
                                    onChange={(e: any) => setCardData({...cardData, number: formatCard(e.target.value)})}
                                    required
                                    icon={<CreditCardIcon className="w-5 h-5"/>}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField 
                                        label="Expiry Date" 
                                        placeholder="MM/YY"
                                        value={cardData.expiry}
                                        onChange={(e: any) => setCardData({...cardData, expiry: formatExpiry(e.target.value)})}
                                        required
                                    />
                                    <InputField 
                                        label="CVV" 
                                        type="password"
                                        placeholder="123"
                                        value={cardData.cvv}
                                        onChange={(e: any) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g,'').substring(0,3)})}
                                        required
                                    />
                                </div>
                                <InputField 
                                    label="Cardholder Name" 
                                    placeholder="John Doe"
                                    value={cardData.name}
                                    onChange={(e: any) => setCardData({...cardData, name: e.target.value})}
                                    required
                                />
                            </>
                        )}

                        {method === 'upi' && (
                            <div className="py-4">
                                <InputField 
                                    label="UPI ID / VPA" 
                                    placeholder="username@bank"
                                    value={upiId}
                                    onChange={(e: any) => setUpiId(e.target.value)}
                                    required
                                    icon={<SmartphoneIcon className="w-5 h-5"/>}
                                />
                                <p className="text-xs text-slate-500 mt-2">Open your UPI app to approve the request.</p>
                            </div>
                        )}

                        {method === 'netbanking' && (
                            <div className="py-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Bank</label>
                                <select 
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                >
                                    <option value="">-- Select Bank --</option>
                                    <option value="hdfc">HDFC Bank</option>
                                    <option value="sbi">SBI</option>
                                    <option value="icici">ICICI Bank</option>
                                    <option value="axis">Axis Bank</option>
                                </select>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={processing || isInvalid()}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>Pay ${amount.toFixed(2)}</>
                            )}
                        </button>
                    </form>
                </div>
                <div className="bg-slate-50 p-3 text-center text-xs text-slate-400 border-t">
                    Encrypted via 256-bit SSL connection.
                </div>
            </div>
        </div>
    );
}

const BookingSuccess = ({ trackingId, sender, onReset }: { trackingId: string, sender: Address, onReset: () => void }) => {
    const [serverState, setServerState] = useState<'initializing' | 'processing' | 'done'>('initializing');
    const [logs, setLogs] = useState<string[]>([]);

    // Auto-dispatch simulation
    useEffect(() => {
        const sequence = [
            { text: "Connecting to Order Server...", delay: 500 },
            { text: "Generating Digital Waybill...", delay: 1200 },
            { text: `Allocated Tracking ID: ${trackingId}`, delay: 2000 },
            { text: "Connecting to SMS Gateway (v2.4.1)...", delay: 2800 },
            { text: `Dispatching SMS to Admin (7778884843)... [SENT]`, delay: 3500 },
            { text: `Dispatching SMS to Client (${sender.phone})... [SENT]`, delay: 4200 },
            { text: `Sending e-Receipt to info.mr31@gmail.com... [SENT]`, delay: 5000 },
            { text: "Finalizing Transaction...", delay: 5500 }
        ];

        let timeouts: ReturnType<typeof setTimeout>[] = [];

        // Start logs
        setServerState('processing');
        
        sequence.forEach((step, index) => {
            const t = setTimeout(() => {
                setLogs(prev => [...prev, step.text]);
                if(index === sequence.length - 1) {
                    setServerState('done');
                }
            }, step.delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [trackingId, sender.phone]);

    const sendAdminSMS = () => {
        const msg = `New Booking!\nTracking ID: ${trackingId}\nSender: ${sender.name}\nPhone: ${sender.phone}`;
        window.open(`sms:7778884843?body=${encodeURIComponent(msg)}`, '_blank');
    };

    const sendClientSMS = () => {
        const msg = `SwiftShip: Your booking is confirmed!\nTracking ID: ${trackingId}\nTrack at: https://swiftship.com/track`;
        window.open(`sms:${sender.phone}?body=${encodeURIComponent(msg)}`, '_blank');
    };

    const sendEmail = () => {
         const subject = `Booking Confirmation - ${trackingId}`;
         const body = `Dear ${sender.name},\n\nYour booking with SwiftShip is confirmed.\nTracking ID: ${trackingId}\n\nThank you!`;
         window.open(`mailto:info.mr31@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    };

    if (serverState !== 'done') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ServerIcon className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing Order...</h2>
                <p className="text-slate-500 mb-8">Please wait while we contact the dispatch server.</p>
                
                <div className="w-full max-w-md bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 text-left shadow-xl h-64 overflow-y-auto border border-slate-700">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 animate-in slide-in-from-left-2 duration-300">
                            <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-10 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckIcon className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 mb-8">Tracking number has been generated and sent to all parties.</p>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 w-full max-w-md mb-8">
                <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">Tracking ID</div>
                <div className="text-3xl font-mono font-bold text-blue-600 mb-6 bg-blue-50 py-3 rounded-lg border border-blue-100 select-all">
                    {trackingId}
                </div>

                <div className="space-y-4 text-left">
                    <h4 className="font-bold text-sm text-slate-400 uppercase mb-2 border-b pb-1">Server Response Logs</h4>
                    
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-100">
                         <CheckIcon className="w-4 h-4 text-green-600"/>
                         <span className="text-sm text-green-800 font-medium">Sent to Admin (7778884843)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-100">
                         <CheckIcon className="w-4 h-4 text-green-600"/>
                         <span className="text-sm text-green-800 font-medium">Sent to Client ({sender.phone})</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-100">
                         <CheckIcon className="w-4 h-4 text-green-600"/>
                         <span className="text-sm text-green-800 font-medium">Sent to info.mr31@gmail.com</span>
                    </div>

                    <div className="pt-4 mt-4 border-t">
                        <p className="text-xs text-slate-400 mb-2 text-center">If you didn't receive the message automatically, use these manual links:</p>
                        <div className="flex gap-2">
                             <button onClick={sendEmail} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">Resend Email</button>
                             <button onClick={sendAdminSMS} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">Resend Admin SMS</button>
                             <button onClick={sendClientSMS} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-600">Resend Client SMS</button>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={onReset}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
                Book Another Shipment
            </button>
        </div>
    );
};

const BookingWizard = ({ onComplete, user }: { onComplete: (trackingId: string) => void, user: User | null }) => {
  const [step, setStep] = useState(1);
  const [sender, setSender] = useState<Address>({ 
    name: user?.name || '', 
    phone: user?.phone || '', 
    street: '', 
    city: '', 
    zip: '' 
  });
  const [receiver, setReceiver] = useState<Address>({ name: '', phone: '', street: '', city: '', zip: '' });
  const [pkg, setPkg] = useState<PackageDetails>({ weight: 1, type: 'parcel', description: '' });
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Payment & Success States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [generatedTrackingId, setGeneratedTrackingId] = useState('');

  // Pre-fill sender if user logs in
  useEffect(() => {
    if (user) {
      setSender(prev => ({ ...prev, name: user.name, phone: user.phone }));
    }
  }, [user]);

  const services: ServiceQuote[] = [
    { id: 'std', name: 'Standard Saver', price: 10 + (pkg.weight * 2), eta: '3-5 Business Days' },
    { id: 'exp', name: 'Swift Express', price: 25 + (pkg.weight * 4), eta: '1-2 Business Days' },
    { id: 'over', name: 'Overnight Pro', price: 45 + (pkg.weight * 6), eta: 'Tomorrow by 10:00 AM' },
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handlePaymentSuccess = () => {
      const trackingId = "SW-" + Math.floor(Math.random() * 10000000);
      setGeneratedTrackingId(trackingId);
      
      // SAVE TO MOCK BACKEND
      MockBackend.saveBooking({
          trackingId,
          sender,
          receiver,
          pkg,
          serviceId: selectedService,
          status: 'Order Placed'
      });

      setShowPaymentModal(false);
      setIsBookingSuccess(true);
      
      // Trigger the callback but keep user here for the receipt view
      onComplete(trackingId); 
  };

  const updateSender = (field: string, val: string) => setSender(prev => ({...prev, [field]: val}));
  const updateReceiver = (field: string, val: string) => setReceiver(prev => ({...prev, [field]: val}));

  const isStepValid = () => {
    if (step === 1) {
      return sender.name && sender.phone && sender.street && sender.city && sender.zip;
    }
    if (step === 2) {
      return receiver.name && receiver.phone && receiver.street && receiver.city && receiver.zip;
    }
    if (step === 3) {
      return pkg.weight > 0 && pkg.description;
    }
    if (step === 4) {
      return !!selectedService;
    }
    return true;
  };

  const resetBooking = () => {
      setStep(1);
      setIsBookingSuccess(false);
      setPkg({ weight: 1, type: 'parcel', description: '' });
      setSelectedService(null);
      setReceiver({ name: '', phone: '', street: '', city: '', zip: '' });
  }

  if (isBookingSuccess) {
      return <BookingSuccess trackingId={generatedTrackingId} sender={sender} onReset={resetBooking} />
  }

  const currentPrice = services.find(s => s.id === selectedService)?.price || 0;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-10">
      {showPaymentModal && (
          <PaymentModal 
            amount={currentPrice} 
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
      )}

      {/* Progress Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        {[1, 2, 3, 4, 5].map(num => (
          <div key={num} className={`flex items-center ${num < 5 ? 'flex-1' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > num ? <CheckIcon className="w-4 h-4"/> : num}
            </div>
            {num < 5 && (
              <div className={`h-1 flex-1 mx-2 rounded-full ${step > num ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 min-h-[400px]">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Sender Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Full Name" required value={sender.name} onChange={(e: any) => updateSender('name', e.target.value)} />
              <InputField label="Phone Number" required value={sender.phone} onChange={(e: any) => updateSender('phone', e.target.value)} />
              <div className="md:col-span-2">
                <InputField label="Street Address" required value={sender.street} onChange={(e: any) => updateSender('street', e.target.value)} />
              </div>
              <InputField label="City" required value={sender.city} onChange={(e: any) => updateSender('city', e.target.value)} />
              <InputField label="Zip Code" required value={sender.zip} onChange={(e: any) => updateSender('zip', e.target.value)} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Receiver Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Receiver Name" required value={receiver.name} onChange={(e: any) => updateReceiver('name', e.target.value)} />
              <InputField label="Phone Number" required value={receiver.phone} onChange={(e: any) => updateReceiver('phone', e.target.value)} />
              <div className="md:col-span-2">
                <InputField label="Destination Address" required value={receiver.street} onChange={(e: any) => updateReceiver('street', e.target.value)} />
              </div>
              <InputField label="City" required value={receiver.city} onChange={(e: any) => updateReceiver('city', e.target.value)} />
              <InputField label="Zip Code" required value={receiver.zip} onChange={(e: any) => updateReceiver('zip', e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Package Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Package Type</label>
                <div className="grid grid-cols-3 gap-4">
                  {['document', 'parcel', 'freight'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPkg(p => ({ ...p, type: t as any }))}
                      className={`p-4 border rounded-xl capitalize text-center transition-all ${
                        pkg.type === t ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <InputField 
                label="Weight (kg)" 
                type="number" 
                required
                value={pkg.weight} 
                onChange={(e: any) => setPkg(p => ({...p, weight: parseFloat(e.target.value) || 0}))} 
              />
              <InputField 
                label="Description of Contents" 
                required
                value={pkg.description} 
                onChange={(e: any) => setPkg(p => ({...p, description: e.target.value}))} 
                placeholder="e.g., Books, Clothing, Electronics"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Select Service</h2>
            <div className="space-y-4">
              {services.map(service => (
                <div 
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative p-6 border rounded-xl cursor-pointer transition-all flex justify-between items-center ${
                    selectedService === service.id 
                      ? 'border-blue-600 bg-blue-50 shadow-md' 
                      : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{service.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">{service.eta}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${service.price.toFixed(2)}</p>
                    {selectedService === service.id && (
                      <div className="absolute top-4 right-4 text-blue-600">
                        <CheckIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Review & Pay</h2>
            <div className="bg-slate-50 p-6 rounded-xl space-y-4 mb-6 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">From</span>
                <span className="font-medium text-right">{sender.name}, {sender.city}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">To</span>
                <span className="font-medium text-right">{receiver.name}, {receiver.city}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Package</span>
                <span className="font-medium text-right">{pkg.weight}kg {pkg.type}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-800 font-bold text-lg">Total</span>
                <span className="text-blue-600 font-bold text-lg">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>
            </div>
            
          </div>
        )}
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between">
        {step > 1 ? (
          <button 
            onClick={handleBack}
            className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            Back
          </button>
        ) : <div></div>}

        {step < 5 ? (
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        ) : (
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg shadow-green-200"
          >
            Pay Now (Online)
          </button>
        )}
      </div>
    </div>
  );
};

const AuthModal = ({ onClose, onLogin }: { onClose: () => void, onLogin: (u: User) => void }) => {
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate backend registration
        if (isRegister) {
            const subject = encodeURIComponent("New User Registration - SwiftShip");
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
            
            // Attempt to open default mail app to send registration details "for real"
            window.open(`mailto:info.mr31@gmail.com?subject=${subject}&body=${body}`, '_blank');

            alert(`Registration Successful!\n\nA pre-filled email has been opened for you to send your details to info.mr31@gmail.com.`);
        } else {
            alert(`Welcome back, ${formData.name || 'User'}!`);
        }
        onLogin({
            name: formData.name || 'Test User',
            email: formData.email,
            phone: formData.phone
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex border-b">
                    <button 
                        onClick={() => setIsRegister(false)}
                        className={`flex-1 p-4 font-medium ${!isRegister ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500'}`}
                    >
                        Log In
                    </button>
                    <button 
                        onClick={() => setIsRegister(true)}
                        className={`flex-1 p-4 font-medium ${isRegister ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500'}`}
                    >
                        Register
                    </button>
                </div>
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {isRegister ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-2">
                            {isRegister ? 'Join SwiftShip to manage your deliveries.' : 'Login to access your dashboard.'}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegister && (
                            <InputField 
                                label="Full Name" 
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                                required
                                icon={<UserIcon className="w-5 h-5"/>}
                            />
                        )}
                        <InputField 
                            label="Email Address" 
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                            required
                            icon={<MailIcon className="w-5 h-5"/>}
                        />
                        {isRegister && (
                            <InputField 
                                label="Phone Number" 
                                type="tel"
                                placeholder="+1 234 567 890"
                                value={formData.phone}
                                onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                                required
                                icon={<PhoneIcon className="w-5 h-5"/>}
                            />
                        )}
                        <InputField 
                            label="Password" 
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e: any) => setFormData({...formData, password: e.target.value})}
                            required
                            icon={<LockIcon className="w-5 h-5"/>}
                        />
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            {isRegister ? 'Register Now' : 'Log In'}
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-4 w-full text-slate-400 hover:text-slate-600 text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<null | 'searching' | 'found' | 'not_found'>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if(!trackingId) return;
    setStatus('searching');
    
    // SIMULATE NETWORK REQUEST
    setTimeout(() => {
      const foundBooking = MockBackend.getBooking(trackingId);
      
      if(foundBooking) {
          setBookingData(foundBooking);
          setStatus('found');
      } else if(trackingId.startsWith('SW')) {
          // Fallback for demo ID if local storage is empty but format is correct
          setBookingData({
              trackingId: trackingId,
              sender: { name: 'Demo Sender', city: 'New York' },
              receiver: { name: 'Demo Receiver', city: 'London' },
              status: 'In Transit',
              timestamp: Date.now() - 86400000 
          });
          setStatus('found');
      } else {
          setStatus('not_found');
      }
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Your Shipment</h1>
        <p className="text-slate-500">Enter your tracking ID (e.g., SW-123456) to see real-time updates.</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-12">
        <input 
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Track
        </button>
      </form>

      {status === 'searching' && (
        <div className="flex justify-center py-10">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {status === 'not_found' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center border border-red-200">
          Tracking ID not found. Please check the number and try again.
        </div>
      )}

      {status === 'found' && bookingData && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
            <div>
              <p className="text-sm text-slate-500">Tracking ID</p>
              <p className="text-xl font-bold text-slate-900 font-mono">{bookingData.trackingId}</p>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {bookingData.status || 'In Transit'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
             <div>
                 <p className="text-xs text-slate-400 uppercase font-bold">From</p>
                 <p className="font-medium text-slate-800">{bookingData.sender.name}</p>
                 <p className="text-sm text-slate-500">{bookingData.sender.city}</p>
             </div>
             <div className="text-right">
                 <p className="text-xs text-slate-400 uppercase font-bold">To</p>
                 <p className="font-medium text-slate-800">{bookingData.receiver.name}</p>
                 <p className="text-sm text-slate-500">{bookingData.receiver.city}</p>
             </div>
          </div>

          <div className="relative space-y-8 before:absolute before:left-3.5 before:top-2 before:h-full before:w-0.5 before:bg-slate-200">
            {[
              { label: 'Order Placed', date: new Date(bookingData.timestamp || Date.now()).toLocaleString(), done: true },
              { label: 'Picked Up', date: 'Processing', done: true },
              { label: 'In Transit', date: 'Estimated', done: true },
              { label: 'Out for Delivery', date: 'Pending', done: false },
              { label: 'Delivered', date: '--', done: false },
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.done ? 'bg-blue-600 text-white' : 'bg-slate-100 border-2 border-slate-300'
                }`}>
                  {step.done && <CheckIcon className="w-4 h-4" />}
                </div>
                <div>
                  <p className={`font-medium ${step.done ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</p>
                  <p className="text-sm text-slate-400">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [view, setView] = useState<'home' | 'book' | 'track'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBookingComplete = (id: string) => {
    // Success handled inside BookingWizard now
  };

  const navigate = (v: 'home' | 'book' | 'track') => {
    setView(v);
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('home')}
          >
            <BrandLogo className="w-8 h-8" />
            <span className="font-bold text-2xl text-slate-800 tracking-tight">Swift<span className="text-blue-600">Ship</span></span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <button onClick={() => navigate('home')} className={`hover:text-blue-600 ${view === 'home' ? 'text-blue-600' : ''}`}>Home</button>
            <button onClick={() => navigate('track')} className={`hover:text-blue-600 ${view === 'track' ? 'text-blue-600' : ''}`}>Track</button>
            <button onClick={() => navigate('book')} className={`hover:text-blue-600 ${view === 'book' ? 'text-blue-600' : ''}`}>Services</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5"/>
                    </div>
                    <span>{user.name}</span>
                    <button onClick={() => setUser(null)} className="text-xs text-red-500 hover:underline ml-2">Logout</button>
                </div>
            ) : (
                <button 
                    onClick={() => setShowAuthModal(true)}
                    className="text-slate-600 font-medium hover:text-blue-600"
                >
                    Log In / Register
                </button>
            )}
            <button 
                onClick={() => navigate('book')}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
                Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg p-4 flex flex-col gap-4 z-40 animate-in slide-in-from-top-2">
                <button onClick={() => navigate('home')} className={`text-left py-2 px-4 rounded-lg ${view === 'home' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'}`}>Home</button>
                <button onClick={() => navigate('track')} className={`text-left py-2 px-4 rounded-lg ${view === 'track' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'}`}>Track Shipment</button>
                <button onClick={() => navigate('book')} className={`text-left py-2 px-4 rounded-lg ${view === 'book' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'}`}>Book Service</button>
                <div className="border-t pt-4">
                    {user ? (
                        <div className="flex justify-between items-center px-4">
                            <span className="font-bold text-slate-800">{user.name}</span>
                            <button onClick={() => {setUser(null); setIsMobileMenuOpen(false)}} className="text-red-500 text-sm">Logout</button>
                        </div>
                    ) : (
                        <button onClick={() => {setShowAuthModal(true); setIsMobileMenuOpen(false)}} className="w-full text-center py-2 border border-slate-200 rounded-lg">Log In / Register</button>
                    )}
                </div>
            </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'home' && (
          <>
            <section className="relative bg-blue-700 text-white py-24 overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Fast, Reliable Delivery <br/> to <span className="text-blue-200">Anywhere.</span>
                </h1>
                <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                  Send packages globally with real-time tracking and AI-powered support. 
                  Simple, transparent, and secure.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => navigate('book')}
                    className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
                  >
                    Send a Package
                  </button>
                  <button 
                    onClick={() => navigate('track')}
                    className="bg-blue-600 border border-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-colors"
                  >
                    Track Shipment
                  </button>
                </div>
              </div>
            </section>

            <section className="py-20 bg-slate-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose SwiftShip?</h2>
                  <p className="text-slate-500 max-w-xl mx-auto">We combine traditional logistics reliability with modern technology to give you the best shipping experience.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                      <PackageIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Handling</h3>
                    <p className="text-slate-500">AI-optimized routing ensures your packages travel the fastest, safest path to their destination.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                      <CheckIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Guaranteed Safety</h3>
                    <p className="text-slate-500">Every shipment is insured and handled with care. If it's late, we pay you back.</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                      <ChatIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">24/7 Support</h3>
                    <p className="text-slate-500">Our AI agents and human experts are always available to help you with any query.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'book' && (
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Create New Shipment</h1>
              <p className="text-slate-500">Follow the steps to schedule a pickup.</p>
            </div>
            <BookingWizard onComplete={handleBookingComplete} user={user} />
          </div>
        )}

        {view === 'track' && <TrackingPage />}
      </main>

      <AIChatWidget />

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BrandLogo className="w-8 h-8 text-white" />
            <span className="font-bold text-2xl text-white tracking-tight">SwiftShip</span>
          </div>
          <p className="mb-8">&copy; 2024 SwiftShip Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);