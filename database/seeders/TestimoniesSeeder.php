<?php

namespace Database\Seeders;

use App\Models\Testimonies;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class TestimoniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create('id_ID'); // Gunakan kode bahasa 'id_ID' untuk Indonesia
        
        foreach (range(1, 10) as $index) {
            Testimonies::create([
                'name' => $faker->name,
                'jobTitle' => $faker->jobTitle,
                'photo' => $faker->randomElement(['https://i.pravatar.cc/150?u=a042581f4e29026024d', 'https://i.pravatar.cc/150?u=a04258a2462d826712d', 'https://i.pravatar.cc/150?u=a042581f4e29026704d', 'https://i.pravatar.cc/150?u=a04258114e29026302d', 'https://i.pravatar.cc/150?u=a04258114e29026702d', 'https://i.pravatar.cc/150?u=a04258114e29026708c']),
                'message' => $faker->realText($maxNbChars = 200, $indexSize = 2),
                'rating' => $faker->numberBetween(4, 5),
            ]);
        }
    }
}
