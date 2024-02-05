<?php

namespace App\Http\Controllers;

use App\Models\Testimonies;
use Illuminate\Http\Request;
use App\Http\Resources\AllResource;
use App\Http\Resources\TestimoniesResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class TestimoniesController extends Controller
{
    public function showData(Request $request) {
        $perPage = $request->input('per_page', 5);
        $query = Testimonies::query();

        // Search
        if ($search = $request->input('search')) {
            $columns = ['id', 'name', 'jobtitle', 'message', 'rating']; // Replace with your actual column names
            $query->where(function ($innerQuery) use ($columns, $search) {
                foreach ($columns as $column) {
                    $innerQuery->orWhere($column, 'LIKE', "%$search%");
                }
            });
        }

        // Apply additional filters as needed
        // if ($filter = $request->input('filter')) {
        //     $query->where('filter_column', $filter);
        // }

        $data = $query->orderBy('id', 'desc')->paginate($perPage);

        return TestimoniesResource::collection($data);
    }

    public function testSanctum() {
        $data = Testimonies::all();
        return TestimoniesResource::collection($data);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'jobtitle' => 'required',
            'photo' => 'required',
            'message' => 'required',
            'rating' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $testimony = new Testimonies();
        $testimony->name = $request->name;
        $testimony->jobtitle = $request->jobtitle;
        if($request->hasFile('photo')){
            $request->file('photo')->move('assets/uploads/', time() . '_' . $request->file('photo')->getClientOriginalName());
            $testimony->photo = '/assets/uploads/'. time() . '_' . $request->file('photo')->getClientOriginalName();
        } else {
            $testimony->photo = $request->photo;
        }
        $testimony->message = $request->message;
        $testimony->rating = $request->rating;
        $testimony->save();

        return response()->json(['message' => 'Data added successfully'], 200);
    }

    public function edit($id){
        $testimony = Testimonies::find($id);

        if(!$testimony) {
            return response()->json(['error' => "Data not found (ID with $id is not found)"], 404);
        }
        
        return TestimoniesResource::collection(Testimonies::where('id', $id)->get());
    }

    public function update(Request $request, $id){
        $testimony = Testimonies::find($id);

        if(!$testimony) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'jobtitle' => 'required',
            'photo' => 'required',
            'message' => 'required',
            'rating' => 'required|integer',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $testimony->name = $request->name;
        $testimony->jobtitle = $request->jobtitle;
        if($request->hasFile('photo')){
            if (File::exists(public_path($testimony->photo))) {
                File::delete(public_path($testimony->photo));
            }
            $request->file('photo')->move('assets/uploads/', time() . '_' . $request->file('photo')->getClientOriginalName());
            $testimony->photo = '/assets/uploads/'. time() . '_' . $request->file('photo')->getClientOriginalName();
        } else {
            $testimony->photo = $request->photo;
        }
        $testimony->message = $request->message;
        $testimony->rating = $request->rating;
        $testimony->save();

        return response()->json(['message' => 'Data updated successfully'], 200);
    }

    public function delete($id) {
        $testimony = Testimonies::find($id);
    
        if(!$testimony) {
            return response()->json(['message' => 'Not Found']);
        }
    
        // Check if the photo file exists
        if (File::exists(public_path($testimony->photo))) {
            // Delete the photo file
            File::delete(public_path($testimony->photo));
        }
    
        // Delete the database record
        $testimony->delete();
    
        return response()->json(['message' => 'Data deleted successfully'], 200);
    }
}
