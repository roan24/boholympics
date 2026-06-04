import Badge from '../../Components/Badge';
import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Users({ users }) {
  return (
    <AdminLayout>
      <ResourceManager
        title="Users"
        description="Manage admin and encoder access to the tally dashboard."
        rows={users}
        endpoint="/admin/users"
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'email', label: 'Email' },
          { name: 'password', label: 'Password', type: 'password' },
          { name: 'role', label: 'Role', type: 'select', options: ['admin', 'encoder'].map((item) => ({ value: item, label: item })) },
        ]}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role', render: (row) => <Badge tone="blue">{row.role}</Badge> },
        ]}
      />
    </AdminLayout>
  );
}
