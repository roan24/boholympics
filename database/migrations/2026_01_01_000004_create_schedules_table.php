<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('municipality_a_id')->nullable()->constrained('municipalities')->nullOnDelete();
            $table->foreignId('municipality_b_id')->nullable()->constrained('municipalities')->nullOnDelete();
            $table->string('venue');
            $table->dateTime('scheduled_at')->index();
            $table->enum('status', ['scheduled', 'live', 'completed', 'postponed', 'cancelled'])->default('scheduled');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
