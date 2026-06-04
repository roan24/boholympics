<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Municipality;
use App\Models\Result;
use App\Models\Schedule;
use App\Models\Sport;
use App\Models\User;
use App\Services\MedalTallyService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@boholympics.test'],
            ['name' => 'Boholympics Admin', 'password' => Hash::make('password'), 'role' => 'admin']
        );

        $municipalityNames = [
            'Alburquerque',
            'Alicia',
            'Antequera',
            'Baclayon',
            'Balilihan',
            'Batuan',
            'Bien Unido',
            'Bilar',
            'Buenavista',
            'Calape',
            'Candijay',
            'Carmen',
            'Catigbian',
            'Clarin',
            'Corella',
            'Cortes',
            'Dagohoy',
            'Danao',
            'Dauis',
            'Dimiao',
            'Duero',
            'Garcia Hernandez',
            'Guindulman',
            'Inabanga',
            'Jagna',
            'Lila',
            'Loay',
            'Loboc',
            'Loon',
            'Mabini',
            'Maribojoc',
            'Panglao',
            'Pilar',
            'Sagbayan',
            'San Miguel',
            'Sevilla',
            'Sierra Bullones',
            'Talibon',
            'Trinidad',
            'Tubigon',
            'Ubay',
            'Valencia',
        ];

        Municipality::whereNotIn('name', $municipalityNames)->delete();
        collect($municipalityNames)->each(fn ($name) => Municipality::firstOrCreate(['name' => $name]));

        $sportData = [
            ['name' => 'Gymnastics', 'icon' => 'gymnastics'],
            ['name' => 'Arnis', 'icon' => 'arnis'],
            ['name' => 'Athletics', 'icon' => 'athletics'],
            ['name' => 'Badminton', 'icon' => 'badminton'],
            ['name' => 'Basketball', 'icon' => 'basketball'],
            ['name' => 'Beach Volleyball', 'icon' => 'beach-volleyball'],
            ['name' => 'Boxing', 'icon' => 'boxing'],
            ['name' => 'Chess', 'icon' => 'chess'],
            ['name' => 'Cycling', 'icon' => 'cycling'],
            ['name' => 'Dancesport', 'icon' => 'dancesport'],
            ['name' => 'Football', 'icon' => 'football'],
            ['name' => 'Futsal', 'icon' => 'futsal'],
            ['name' => 'Karatedo', 'icon' => 'karatedo'],
            ['name' => 'Lawn Tennis', 'icon' => 'lawn-tennis'],
            ['name' => 'Sepak Takraw', 'icon' => 'sepak-takraw'],
            ['name' => 'Swimming', 'icon' => 'swimming'],
            ['name' => 'Table Tennis', 'icon' => 'table-tennis'],
            ['name' => 'Taekwondo', 'icon' => 'taekwondo'],
            ['name' => 'Weightlifting', 'icon' => 'weightlifting'],
        ];

        Sport::whereNotIn('name', collect($sportData)->pluck('name'))->delete();
        $sports = collect($sportData)->mapWithKeys(fn ($sport) => [
            $sport['name'] => Sport::updateOrCreate(['name' => $sport['name']], ['icon' => $sport['icon']]),
        ]);

        Event::query()->delete();

        $events = collect([
            ['Gymnastics', 'Artistic All-Around', 'Open', 'female', 'scheduled'],
            ['Arnis', 'Anyo Finals', 'Open', 'open', 'scheduled'],
            ['Athletics', '100m Dash', 'Senior', 'female', 'completed'],
            ['Badminton', 'Doubles Finals', 'Open', 'mixed', 'scheduled'],
            ['Basketball', '5x5 Finals', 'Open', 'male', 'live'],
            ['Beach Volleyball', 'Championship Match', 'Open', 'female', 'scheduled'],
            ['Boxing', 'Featherweight Finals', 'Open', 'male', 'completed'],
            ['Chess', 'Rapid Board 1', 'Open', 'open', 'completed'],
            ['Cycling', 'Road Race', 'Open', 'male', 'scheduled'],
            ['Dancesport', 'Latin Finals', 'Open', 'mixed', 'scheduled'],
            ['Football', 'Gold Medal Match', 'Open', 'male', 'scheduled'],
            ['Futsal', 'Championship Match', 'Open', 'male', 'scheduled'],
            ['Karatedo', 'Kumite Finals', 'Open', 'female', 'completed'],
            ['Lawn Tennis', 'Singles Finals', 'Open', 'female', 'scheduled'],
            ['Sepak Takraw', 'Regu Finals', 'Open', 'male', 'scheduled'],
            ['Swimming', '200m Freestyle', 'Senior', 'open', 'completed'],
            ['Table Tennis', 'Singles Finals', 'Open', 'open', 'scheduled'],
            ['Taekwondo', 'Kyorugi Finals', 'Open', 'male', 'completed'],
            ['Weightlifting', 'Clean and Jerk Finals', 'Open', 'female', 'completed'],
        ])->mapWithKeys(function ($event) use ($sports) {
            $model = Event::updateOrCreate(
                ['sport_id' => $sports[$event[0]]->id, 'name' => $event[1], 'category' => $event[2], 'gender' => $event[3]],
                ['status' => $event[4]]
            );

            return ["{$event[0]}:{$event[1]}" => $model];
        });

        $municipalities = Municipality::pluck('id', 'name');

        $results = [
            ['Athletics:100m Dash', 'Panglao', 'gold', 'Maria Santos', null, '12.21s'],
            ['Athletics:100m Dash', 'Ubay', 'silver', 'Ana Uy', null, '12.48s'],
            ['Athletics:100m Dash', 'Talibon', 'bronze', 'Liza Dela Cruz', null, '12.74s'],
            ['Boxing:Featherweight Finals', 'Jagna', 'gold', 'Ramon Flores', null, 'RSC R3'],
            ['Boxing:Featherweight Finals', 'Tubigon', 'silver', 'Carlos Yap', null, 'Finalist'],
            ['Boxing:Featherweight Finals', 'Carmen', 'bronze', 'Ben Garcia', null, 'Semifinalist'],
            ['Swimming:200m Freestyle', 'Dauis', 'gold', null, 'Dauis Swim Club', '2:03.44'],
            ['Swimming:200m Freestyle', 'Loboc', 'silver', null, 'Loboc Waves', '2:05.12'],
            ['Swimming:200m Freestyle', 'Baclayon', 'bronze', null, 'Baclayon Marlins', '2:07.91'],
            ['Chess:Rapid Board 1', 'Loay', 'gold', 'Board 1 Team', null, '6/7'],
            ['Chess:Rapid Board 1', 'Balilihan', 'silver', 'Board 1 Team', null, '5.5/7'],
            ['Chess:Rapid Board 1', 'Batuan', 'bronze', 'Board 1 Team', null, '5/7'],
            ['Weightlifting:Clean and Jerk Finals', 'Valencia', 'gold', 'Grace Fuentes', null, '86kg'],
            ['Weightlifting:Clean and Jerk Finals', 'Calape', 'silver', 'Nina Reyes', null, '82kg'],
            ['Weightlifting:Clean and Jerk Finals', 'Sevilla', 'bronze', 'Leah Uy', null, '79kg'],
        ];

        foreach ($results as [$eventKey, $municipalityName, $medal, $athlete, $team, $score]) {
            Result::updateOrCreate(
                ['event_id' => $events[$eventKey]->id, 'medal_type' => $medal],
                ['municipality_id' => $municipalities[$municipalityName], 'athlete_name' => $athlete, 'team_name' => $team, 'score' => $score]
            );
        }

        Schedule::firstOrCreate(
            ['event_id' => $events['Basketball:5x5 Finals']->id, 'venue' => 'Carlos P. Garcia Sports Complex'],
            ['municipality_a_id' => $municipalities['Panglao'], 'municipality_b_id' => $municipalities['Ubay'], 'scheduled_at' => now()->addHours(2), 'status' => 'live']
        );
        Schedule::firstOrCreate(
            ['event_id' => $events['Beach Volleyball:Championship Match']->id, 'venue' => 'Bohol Wisdom Gym'],
            ['municipality_a_id' => $municipalities['Dauis'], 'municipality_b_id' => $municipalities['Jagna'], 'scheduled_at' => now()->addDay(), 'status' => 'scheduled']
        );
        Schedule::firstOrCreate(
            ['event_id' => $events['Badminton:Doubles Finals']->id, 'venue' => 'Tagbilaran City Badminton Center'],
            ['municipality_a_id' => $municipalities['Dauis'], 'municipality_b_id' => $municipalities['Tubigon'], 'scheduled_at' => now()->addDays(2), 'status' => 'scheduled']
        );

        app(MedalTallyService::class)->refreshCache();
    }
}
