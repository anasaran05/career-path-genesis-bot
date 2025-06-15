
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import ProfileUpload from "@/components/profile/ProfileUpload";
import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/contexts/AuthContext";

const UpdateProfile = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-autumn-100 py-10">
      <Card className="mx-auto w-full max-w-2xl rounded-3xl shadow-2xl pt-8 pb-2 bg-white/90 relative">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="relative">
            <ProfileUpload
              imgUrl={userProfile?.profile_image}
              onUpload={() => {}} // upload handled in ProfileForm
            />
            <span className="absolute bottom-0 right-0 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-full p-1 shadow">
              <Edit size={16} className="text-white" />
            </span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="text-lg font-bold text-navy-700">
              {userProfile?.full_name || "Add name"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
