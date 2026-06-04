import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Sports({ sports }) {
  return (
    <AdminLayout>
      <ResourceManager
        title="Sports"
        description="Manage sports and simple icon labels used across the public site."
        rows={sports}
        endpoint="/admin/sports"
        fields={[{ name: 'name', label: 'Name' }, { name: 'icon', label: 'Icon' }]}
        columns={[{ key: 'icon', label: 'Icon' }, { key: 'name', label: 'Name' }, { key: 'events_count', label: 'Events' }]}
      />
    </AdminLayout>
  );
}
