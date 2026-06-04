import {
  Bike,
  Dumbbell,
  Goal,
  Medal,
  Shield,
  Sparkles,
  Trophy,
  Waves,
} from 'lucide-react';
import Card from '../../Components/Card';
import PublicLayout from '../../Layouts/PublicLayout';

const sportIcons = {
  Arnis: Shield,
  Athletics: Medal,
  Badminton: Trophy,
  Basketball: Trophy,
  'Beach Volleyball': Waves,
  Boxing: Shield,
  Chess: Trophy,
  Cycling: Bike,
  Dancesport: Sparkles,
  Football: Goal,
  Futsal: Goal,
  Gymnastics: Sparkles,
  Karatedo: Shield,
  'Lawn Tennis': Trophy,
  'Sepak Takraw': Trophy,
  Swimming: Waves,
  'Table Tennis': Trophy,
  Taekwondo: Shield,
  Weightlifting: Dumbbell,
};

const sportOrder = [
  'Gymnastics',
  'Arnis',
  'Athletics',
  'Badminton',
  'Basketball',
  'Beach Volleyball',
  'Boxing',
  'Chess',
  'Cycling',
  'Dancesport',
  'Football',
  'Futsal',
  'Karatedo',
  'Lawn Tennis',
  'Sepak Takraw',
  'Swimming',
  'Table Tennis',
  'Taekwondo',
  'Weightlifting',
];

export default function Sports({ sports }) {
  const orderedSports = [...sports].sort((a, b) => sportOrder.indexOf(a.name) - sportOrder.indexOf(b.name));

  return (
    <PublicLayout>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-accent-600">Games</p>
          <h1 className="text-3xl font-black text-primary-900">Boholympics Sports</h1>
        </div>
        <div className="rounded-md bg-primary-50 px-3 py-2 text-sm font-bold text-primary-700">{orderedSports.length} games</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderedSports.map((sport) => {
          const Icon = sportIcons[sport.name] || Trophy;

          return (
            <Card key={sport.id} className="group p-5 transition hover:-translate-y-0.5 hover:border-accent-100 hover:shadow-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-700 transition group-hover:bg-accent-500 group-hover:text-white">
                <Icon size={22} />
              </div>
              <h2 className="mt-4 text-lg font-black text-slate-950">{sport.name}</h2>
              <p className="text-sm font-semibold text-slate-500">{sport.events_count} events</p>
            </Card>
          );
        })}
      </div>
    </PublicLayout>
  );
}
