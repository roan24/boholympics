import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Municipalities({ municipalities }) {
  return (
    <AdminLayout>
      <ResourceManager
        title="Municipalities"
        description="Manage participating Bohol municipalities and optional logo URLs."
        rows={municipalities}
        endpoint="/admin/municipalities"
        fields={[{ name: 'name', label: 'Name' }, { name: 'logo', label: 'Logo URL' }]}
        columns={[{ key: 'name', label: 'Name' }, { key: 'logo', label: 'Logo' }, { key: 'results_count', label: 'Results' }]}
      />
    </AdminLayout>
  );
}
