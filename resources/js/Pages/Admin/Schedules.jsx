import Badge from '../../Components/Badge';
import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Schedules({ schedules, events, municipalities }) {
  const eventOptions = events.map((event) => ({ value: event.id, label: `${event.sport?.name} - ${event.name}` }));
  const municipalityOptions = municipalities.map((municipality) => ({ value: municipality.id, label: municipality.name }));

  return (
    <AdminLayout>
      <ResourceManager
        title="Schedules"
        description="Manage match schedules, venues, competing municipalities, and status."
        rows={schedules}
        endpoint="/admin/schedules"
        fields={[
          { name: 'event_id', label: 'Event', type: 'select', options: eventOptions },
          { name: 'municipality_a_id', label: 'Municipality A', type: 'select', options: municipalityOptions },
          { name: 'municipality_b_id', label: 'Municipality B', type: 'select', options: municipalityOptions },
          { name: 'venue', label: 'Venue' },
          { name: 'scheduled_at', label: 'Scheduled At', type: 'datetime-local' },
          { name: 'status', label: 'Status', type: 'select', options: ['scheduled', 'live', 'completed', 'postponed', 'cancelled'].map((item) => ({ value: item, label: item })) },
        ]}
        columns={[
          { key: 'event.name', label: 'Event' },
          { key: 'municipality_a.name', label: 'Municipality A' },
          { key: 'municipality_b.name', label: 'Municipality B' },
          { key: 'venue', label: 'Venue' },
          { key: 'scheduled_at', label: 'Time', render: (row) => new Date(row.scheduled_at).toLocaleString() },
          { key: 'status', label: 'Status', render: (row) => <Badge tone="blue">{row.status}</Badge> },
        ]}
      />
    </AdminLayout>
  );
}
