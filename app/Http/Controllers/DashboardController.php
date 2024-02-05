<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(){
        return Inertia::render('Dashboard/DashboardPage');
    }
    
    public function dashboardClients(){
        return Inertia::render('Dashboard/Clients/ClientsPage');
    }
    public function dashboardAbout(){
        return Inertia::render('Dashboard/DashboardPage');
    }
    public function dashboardTestimonies(){
        return Inertia::render('Dashboard/Testimonies/TestimoniesPage');
    }
    public function dashboardPortfolios(){
        return Inertia::render('Dashboard/DashboardPage');
    }

}
