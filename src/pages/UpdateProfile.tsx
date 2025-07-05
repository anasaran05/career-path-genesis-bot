import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-autumn-100 py-10">
      <Card className="mx-auto w-full max-w-2xl rounded-3xl shadow-2xl pt-8 pb-2 bg-white/90 relative">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              U
            </div>
            <span className="absolute bottom-0 right-0 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-full p-1 shadow">
              <Edit size={16} className="text-white" />
            </span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="text-lg font-bold text-navy-700">
              Update Your Profile
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Enter your name" className="rounded-lg"/>
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="e.g. Mumbai, India" className="rounded-lg"/>
            </div>
          </div>
          
          <div>
            <Label>Bio</Label>
            <Textarea placeholder="Brief career intro..." className="rounded-lg" rows={3}/>
          </div>
          
          <div>
            <Label>Skills</Label>
            <Input placeholder="Add skills separated by commas" className="rounded-lg"/>
          </div>
          
          <div>
            <Label>LinkedIn / Portfolio</Label>
            <Input placeholder="https://linkedin.com/in/username" className="rounded-lg"/>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-navy-600 to-autumn-500 text-white rounded-xl"
              onClick={() => navigate('/')}
            >
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;