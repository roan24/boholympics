import Badge from '../../Components/Badge';
import ResourceManager from '../../Components/ResourceManager';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Results({ results, events, municipalities }) {
  const eventOptions = events.map((event) => ({ value: event.id, label: `${event.sport?.name} - ${event.name}` }));
  const municipalityOptions = municipalities.map((municipality) => ({ value: municipality.id, label: municipality.name }));

  return (
    <AdminLayout>
      <ResourceManager
        title="Results"
        description="Input gold, silver, and bronze results. Medal tally refreshes automatically."
        rows={results}
        endpoint="/admin/results"
        fields={[
          { name: 'event_id', label: 'Event', type: 'select', options: eventOptions },
          { name: 'municipality_id', label: 'Municipality', type: 'select', options: municipalityOptions },
          { name: 'medal_type', label: 'Medal', type: 'select', options: ['gold', 'silver', 'bronze'].map((item) => ({ value: item, label: item })) },
          { name: 'athlete_name', label: 'Athlete Name' },
          { name: 'team_name', label: 'Team Name' },
          { name: 'score', label: 'Score' },
          { name: 'remarks', label: 'Remarks' },
        ]}
        columns={[
          { key: 'medal_type', label: 'Medal', render: (row) => <Badge tone={row.medal_type}>{row.medal_type}</Badge> },
          { key: 'municipality.name', label: 'Municipality' },
          { key: 'event.name', label: 'Event' },
          { key: 'athlete_name', label: 'Athlete' },
          { key: 'team_name', label: 'Team' },
          { key: 'score', label: 'Score' },
        ]}
      />
    </AdminLayout>
  );
}
