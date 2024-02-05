<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonies>
 */
class TestimoniesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'jobTitle' => $this->faker->catchPhrase() ,
            'photo' => $this->faker->randomElement(['https://i.pravatar.cc/150?u=a042581f4e29026024d', 'https://i.pravatar.cc/150?u=a04258a2462d826712d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a04258114e29026302d', 'https://i.pravatar.cc/150?u=a04258114e29026702d', 'https://i.pravatar.cc/150?u=a04258114e29026708c']),
            'message' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
            'rating' => $this->faker->numberBetween(1, 5),
        ];
    }
}
