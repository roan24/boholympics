import Badge from '../../Components/Badge';
import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Events({ events, sports }) {
  return (
    <AdminLayout>
      <ResourceManager
        title="Events"
        description="Create divisions by sport, category, gender, and status."
        rows={events}
        endpoint="/admin/events"
        fields={[
          { name: 'sport_id', label: 'Sport', type: 'select', options: sports.map((sport) => ({ value: sport.id, label: sport.name })) },
          { name: 'name', label: 'Name' },
          { name: 'category', label: 'Category' },
          { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'mixed', 'open'].map((item) => ({ value: item, label: item })) },
          { name: 'status', label: 'Status', type: 'select', options: ['draft', 'scheduled', 'live', 'completed', 'cancelled'].map((item) => ({ value: item, label: item })) },
        ]}
        columns={[
          { key: 'sport.name', label: 'Sport' },
          { key: 'name', label: 'Event' },
          { key: 'category', label: 'Category' },
          { key: 'gender', label: 'Gender' },
          { key: 'status', label: 'Status', render: (row) => <Badge tone={row.status === 'live' ? 'red' : 'blue'}>{row.status}</Badge> },
        ]}
      />
    </AdminLayout>
  );
}
