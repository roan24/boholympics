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

        collect(['Tagbilaran City', 'Panglao', 'Dauis', 'Baclayon', 'Loboc', 'Loay', 'Jagna', 'Ubay', 'Talibon', 'Tubigon', 'Carmen', 'Dimiao'])
            ->each(fn ($name) => Municipality::firstOrCreate(['name' => $name]));

        $sports = collect([
            ['name' => 'Basketball', 'icon' => 'basketball'],
            ['name' => 'Volleyball', 'icon' => 'volleyball'],
            ['name' => 'Athletics', 'icon' => 'athletics'],
            ['name' => 'Swimming', 'icon' => 'swimming'],
            ['name' => 'Badminton', 'icon' => 'badminton'],
            ['name' => 'Chess', 'icon' => 'chess'],
        ])->mapWithKeys(fn ($sport) => [$sport['name'] => Sport::firstOrCreate(['name' => $sport['name']], ['icon' => $sport['icon']])]);

        $events = collect([
            ['Basketball', '5x5 Finals', 'Open', 'male', 'live'],
            ['Volleyball', 'Championship Match', 'Open', 'female', 'scheduled'],
            ['Athletics', '100m Dash', 'Senior', 'male', 'completed'],
            ['Athletics', '100m Dash', 'Senior', 'female', 'completed'],
            ['Swimming', '200m Freestyle', 'Senior', 'open', 'completed'],
            ['Badminton', 'Doubles Finals', 'Open', 'mixed', 'scheduled'],
            ['Chess', 'Rapid Board 1', 'Open', 'open', 'completed'],
        ])->map(function ($event) use ($sports) {
            return Event::firstOrCreate(
                ['sport_id' => $sports[$event[0]]->id, 'name' => $event[1], 'category' => $event[2], 'gender' => $event[3]],
                ['status' => $event[4]]
            );
        });

        $municipalities = Municipality::pluck('id', 'name');

        $results = [
            [2, 'Tagbilaran City', 'gold', 'Maria Santos', null, '12.21s'],
            [2, 'Panglao', 'silver', 'Ana Uy', null, '12.48s'],
            [2, 'Ubay', 'bronze', 'Liza Dela Cruz', null, '12.74s'],
            [3, 'Jagna', 'gold', 'Ramon Flores', null, '10.98s'],
            [3, 'Tubigon', 'silver', 'Carlos Yap', null, '11.05s'],
            [3, 'Carmen', 'bronze', 'Ben Garcia', null, '11.22s'],
            [4, 'Dauis', 'gold', null, 'Dauis Swim Club', '2:03.44'],
            [4, 'Loboc', 'silver', null, 'Loboc Waves', '2:05.12'],
            [4, 'Talibon', 'bronze', null, 'Talibon Marlins', '2:07.91'],
            [6, 'Tagbilaran City', 'gold', 'Board 1 Team', null, '6/7'],
            [6, 'Baclayon', 'silver', 'Board 1 Team', null, '5.5/7'],
            [6, 'Loay', 'bronze', 'Board 1 Team', null, '5/7'],
        ];

        foreach ($results as [$eventIndex, $municipalityName, $medal, $athlete, $team, $score]) {
            Result::updateOrCreate(
                ['event_id' => $events[$eventIndex]->id, 'medal_type' => $medal],
                ['municipality_id' => $municipalities[$municipalityName], 'athlete_name' => $athlete, 'team_name' => $team, 'score' => $score]
            );
        }

        Schedule::firstOrCreate(
            ['event_id' => $events[0]->id, 'venue' => 'Carlos P. Garcia Sports Complex'],
            ['municipality_a_id' => $municipalities['Tagbilaran City'], 'municipality_b_id' => $municipalities['Ubay'], 'scheduled_at' => now()->addHours(2), 'status' => 'live']
        );
        Schedule::firstOrCreate(
            ['event_id' => $events[1]->id, 'venue' => 'Bohol Wisdom Gym'],
            ['municipality_a_id' => $municipalities['Panglao'], 'municipality_b_id' => $municipalities['Jagna'], 'scheduled_at' => now()->addDay(), 'status' => 'scheduled']
        );
        Schedule::firstOrCreate(
            ['event_id' => $events[5]->id, 'venue' => 'Tagbilaran City Badminton Center'],
            ['municipality_a_id' => $municipalities['Dauis'], 'municipality_b_id' => $municipalities['Tubigon'], 'scheduled_at' => now()->addDays(2), 'status' => 'scheduled']
        );

        app(MedalTallyService::class)->refreshCache();
    }
}
