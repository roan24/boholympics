<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'event_id' => ['required', 'exists:events,id'],
            'municipality_a_id' => ['nullable', 'exists:municipalities,id', 'different:municipality_b_id'],
            'municipality_b_id' => ['nullable', 'exists:municipalities,id'],
            'venue' => ['required', 'string', 'max:160'],
            'scheduled_at' => ['required', 'date'],
            'status' => ['required', Rule::in(['scheduled', 'live', 'completed', 'postponed', 'cancelled'])],
        ];
    }
}
