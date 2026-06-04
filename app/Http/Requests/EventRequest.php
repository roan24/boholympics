<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'sport_id' => ['required', 'exists:sports,id'],
            'name' => ['required', 'string', 'max:160'],
            'category' => ['nullable', 'string', 'max:120'],
            'gender' => ['required', Rule::in(['male', 'female', 'mixed', 'open'])],
            'status' => ['required', Rule::in(['draft', 'scheduled', 'live', 'completed', 'cancelled'])],
        ];
    }
}
