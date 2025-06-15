
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useForm, Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProfileUpload from "@/components/profile/ProfileUpload";
import SkillTags from "@/components/profile/SkillTags";
import { toast } from "@/components/ui/use-toast";
import DetailsSection from "./DetailsSection";

// All profile-related fields to check for completeness
const profileFields = [
  "full_name", "bio", "location", "dob", "skills", "profile_url", "profile_image"
];

function calcCompleteness(values: Record<string, any>) {
  let filled = 0;
  profileFields.forEach((key) => {
    if (values[key] && (Array.isArray(values[key]) ? values[key].length : true)) filled++;
  });
  return Math.round((filled / profileFields.length) * 100);
}

const ProfileForm: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      full_name: userProfile?.full_name ?? "",
      bio: userProfile?.bio ?? "",
      location: userProfile?.location ?? "",
      dob: userProfile?.dob ?? "",
      skills: userProfile?.student_profiles?.skills ?? [],
      profile_url: userProfile?.profile_url ?? "",
      profile_image: userProfile?.profile_image ?? "",
    }
  });

  const watchAll = watch();

  const completeness = calcCompleteness({
    ...watchAll,
    profile_image: imgUrl || watchAll.profile_image
  });

  const isIncomplete = completeness < 60;

  const onProfileImgUpload = async (file: File) => {
    if (!user) return;
    setSaving(true);
    const filePath = `avatars/${user.id}.${file.name.split(".").pop()}`;
    const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (!error && data) {
      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setImgUrl(pub?.publicUrl);
      setValue("profile_image", pub?.publicUrl, { shouldValidate: true });
      toast({ title: "Profile picture updated!" });
    } else {
      toast({ title: "Unable to upload photo", description: error?.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const onSubmit = async (data: any) => {
    setSaving(true);
    const { full_name, bio, location, dob, skills, profile_url, profile_image } = data;
    let errMsg = "";
    try {
      if (!user?.id) {
        throw new Error('User not logged in or missing ID (user.id not found)');
      }
      // Log sent data and responses
      console.log("[Profile Save] Submitting data:", data);

      // -- Update profiles table
      const { error: profileError, data: profileUpdate } = await supabase
        .from("profiles")
        .update({
          full_name,
          bio,
          location,
          dob,
          profile_url,
          profile_image,
          last_profile_update: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select();

      if (profileError) {
        console.error("[Profile Save] Error updating profiles:", profileError);
        throw new Error(profileError.message);
      }
      console.log("[Profile Save] Profiles update response:", profileUpdate);

      // -- Update skills in student_profiles table
      const { error: skillError, data: skillUpdate } = await supabase
        .from("student_profiles")
        .update({
          skills,
        })
        .eq("id", user.id)
        .select();

      if (skillError) {
        console.error("[Profile Save] Error updating skills:", skillError);
        throw new Error(skillError.message);
      }
      console.log("[Profile Save] Skills update response:", skillUpdate);

      toast({
        title: "Profile updated! Your career journey just got clearer 🚀",
        description: "You're not just updating data. You're upgrading your future 💼"
      });
    } catch (err: any) {
      errMsg = err.message || JSON.stringify(err);
      toast({ title: "Failed to save profile", description: errMsg, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-navy-500 to-autumn-500 rounded-md px-3 py-1 text-white text-xs font-semibold shadow">
            🔥 Career Profile: {completeness}% Complete
          </div>
        </div>
        <div className="w-1/2">
          <Progress value={completeness} className="h-2 bg-slate-200" />
        </div>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Collapsible: Personal */}
        <DetailsSection title="Personal Info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input {...register("full_name")} placeholder="Enter your name"/>
            </div>
            <div>
              <Label>Location</Label>
              <Input {...register("location")} placeholder="e.g. Mumbai, India"/>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <div className="flex items-center gap-2">
                <Controller 
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <Input type="date" {...field} />
                  )}
                />
                <CalendarIcon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </DetailsSection>
        {/* Collapsible: Bio */}
        <DetailsSection title="Bio">
          <Label>Short Bio</Label>
          <textarea {...register("bio")} className="bg-slate-50 border-slate-200 rounded-lg p-2 w-full" rows={2} placeholder="Brief career intro..." />
        </DetailsSection>
        {/* Collapsible: Skills */}
        <DetailsSection title="Skills">
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <SkillTags value={field.value} onChange={field.onChange}/>
            )}
          />
        </DetailsSection>
        {/* Collapsible: Social */}
        <DetailsSection title="Social Links">
          <div>
            <Label>LinkedIn / Portfolio</Label>
            <Input {...register("profile_url")} placeholder="https://linkedin.com/in/username" />
          </div>
        </DetailsSection>
        <div className="flex justify-end mt-8">
          <Button type="submit" disabled={saving} className="rounded-2xl px-6 py-2 shadow bg-gradient-to-r from-navy-600 to-autumn-500 text-white">
            {saving ? "Saving..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
