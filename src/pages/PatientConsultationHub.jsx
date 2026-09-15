import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Globe } from 'lucide-react';
import { useAppointments } from '../hooks/useAppointments';
import SimpleChatThread from '../components/consultations/SimpleChatThread';

const TABS = ['Chat', 'Prescriptions', 'Lab Tests'];

const PatientConsultationHub = () => {
    const navigate = useNavigate();
    const { appointments, loading } = useAppointments();
    const [activeTab, setActiveTab] = useState('Chat');
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

    const filtered = appointments.filter((a) => a.doctor_name?.toLowerCase().includes(search.toLowerCase()));
    const selected = appointments.find((a) => a.id === selectedId);
    const nextUpcoming = appointments.find((a) => a.status === 'scheduled');

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Consultation Hub</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input placeholder="Search" className="bg-gray-100 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-2 w-48 outline-none" />
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Globe className="w-4 h-4 text-gray-600" /></button>
                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"><Bell className="w-4 h-4 text-gray-600" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 h-[calc(100vh-140px)]">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-y-auto">
                    <h2 className="font-bold text-gray-900">Chat</h2>
                    <p className="text-xs text-gray-400 mt-1 mb-4">Chat with your doctor, view prescriptions and lab tests, all in one place.</p>
                    <div className="relative mb-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="w-full text-sm border border-gray-200 rounded-lg pl-3 pr-9 py-2 outline-none"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <div className="flex gap-2 mb-4 flex-wrap">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-xs font-medium px-3 py-1.5 rounded-full ${activeTab === tab ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-1 -mx-2">
                        {filtered.map((a) => (
                            <button
                                key={a.id}
                                onClick={() => setSelectedId(a.id)}
                                className={`w-full flex items-center justify-between px-2 py-3 rounded-xl text-left ${selectedId === a.id ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                                        {a.doctor_name?.[0] || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{a.doctor_name}</p>
                                        <p className="text-xs text-gray-400">No message</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-gray-400">{a.appointment_date?.split('T')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {selected ? (
                    <SimpleChatThread appointment={selected} role="patient" otherPartyName={selected.doctor_name} />
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
                        {nextUpcoming ? (
                            <div className="bg-gray-50 rounded-2xl px-6 py-5 text-center space-y-3">
                                <div className="flex items-center gap-3 justify-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                                        {nextUpcoming.doctor_name?.[0] || '?'}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-400">Upcoming Consultation</p>
                                        <p className="text-sm font-bold text-gray-900">{nextUpcoming.doctor_name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/consultation-hub/call/${nextUpcoming.id}`)}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg"
                                >
                                    Join Now
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">No upcoming consultations</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientConsultationHub;