import PageHeader from '../components/common/PageHeader';
import { Search, Bell } from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';
import { METRIC_CARDS, EMPTY_STATE_CONFIG } from '../config/dashboardConfig';
import MetricCard from '../components/common/MetricCard';
import ConsultationsSection from '../components/dashboard/ConsultationsSection';
import LabTestsSection from '../components/dashboard/LabTestsSection';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Dashboard = () => {
    const { data, loading } = useDashboardData('current-user-id');

    if (loading) return <div className="p-6 text-sm text-gray-400">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <PageHeader title="Dashboard" />
                <h1 className="text-2xl font-bold text-gray-900">Hello {data.userName} !</h1>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-100 text-gray-600 text-xs rounded-lg pl-3 pr-8 py-2 w-48 outline-none placeholder-gray-400"
                        />
                        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {METRIC_CARDS.map((card) => (
                            <MetricCard
                                key={card.key}
                                label={card.label}
                                subtitle={card.subtitle}
                                highlight={card.highlight}
                                value={data[card.key]?.count ?? 0}
                            />
                        ))}
                    </div>

                    <ConsultationsSection
                        consultation={data.upcomingConsultation}
                        emptyConfig={EMPTY_STATE_CONFIG.consultations}
                    />
                    <LabTestsSection
                        tests={data.labTests?.items}
                        emptyConfig={EMPTY_STATE_CONFIG.labTests}
                    />
                </div>

                <div className="space-y-6">
                    <CalendarWidget />
                    <ActivityFeed items={data.activity} emptyConfig={EMPTY_STATE_CONFIG.activity} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;