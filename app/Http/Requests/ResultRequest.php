<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ResultRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('result')?->id;

        return [
            'event_id' => ['required', 'exists:events,id'],
            'municipality_id' => ['required', 'exists:municipalities,id'],
            'medal_type' => [
                'required',
                Rule::in(['gold', 'silver', 'bronze']),
                Rule::unique('results')->where('event_id', $this->input('event_id'))->ignore($id),
            ],
            'athlete_name' => ['nullable', 'string', 'max:160', 'required_without:team_name'],
            'team_name' => ['nullable', 'string', 'max:160', 'required_without:athlete_name'],
            'score' => ['nullable', 'string', 'max:80'],
            'remarks' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
