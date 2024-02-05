<?php

namespace App\Http\Controllers;

use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    public function showData() {
        return PortfolioResource::collection(Portfolio::all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'category' => 'required',
            'image' => 'required',
            'link' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $portfolio = new Portfolio();
        $portfolio->name = $request->input('name');
        $portfolio->category = $request->input('category');
        $portfolio->image = $request->input('image');
        $portfolio->link = $request->input('link');
        $portfolio->save();

        return response()->json(['message' => 'Data stored successfully'], 200);
    }

    public function edit($id){
        $client = Portfolio::find($id);

        if(!$client) {
            return response()->json(['error' => "Data not found (ID with $id is not found)"]);
        }

        return PortfolioResource::collection(Portfolio::find($id));
    }

    public function update(Request $request, $id){
        $portfolio = Portfolio::find($id);

        if(!$portfolio) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'category' => 'required',
            'image' => 'required',
            'link' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $portfolio->name = $request->input('name');
        $portfolio->category = $request->input('category');
        $portfolio->image = $request->input('image');
        $portfolio->link = $request->input('link');
        $portfolio->save();

        return response()->json(['message' => 'Data updated successfully'], 200);
    }

    public function delete($id) {
        $portfolio = Portfolio::find($id);

        if(!$portfolio) {
            return response()->json(['message' => 'Not Found']);
        }
        $portfolio->delete();

        return response()->json(['message' => 'Data deleted successfully'], 200);
    }
}
