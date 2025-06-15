
import React, { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Progress } from "@/components/ui/progress";
import { useForm, Controller } from "react-hook-form";
import { CalendarIcon, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProfileUpload from "@/components/profile/ProfileUpload";
import SkillTags from "@/components/profile/SkillTags";
import { toast } from "@/components/ui/use-toast";

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

const UpdateProfile = () => {
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
    // Save profile info to public.profiles and student_profiles
    const { full_name, bio, location, dob, skills, profile_url, profile_image } = data;
    let errMsg = "";
    try {
      // Update profiles table with profile fields
      await supabase
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
        .eq("id", user.id);

      // Update skills in student_profiles table
      await supabase
        .from("student_profiles")
        .update({
          skills,
        })
        .eq("id", user.id);

      toast({
        title: "Profile updated! Your career journey just got clearer 🚀",
        description: "You're not just updating data. You're upgrading your future 💼"
      });
    } catch (err: any) {
      errMsg = err.message || "Unknown Error";
      toast({ title: "Failed to save profile", description: errMsg, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-100 to-autumn-100 py-10">
      <Card className="mx-auto w-full max-w-2xl rounded-3xl shadow-2xl pt-8 pb-2 bg-white/90 relative">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="relative">
            <ProfileUpload imgUrl={imgUrl || watchAll.profile_image} onUpload={onProfileImgUpload} />
            <span className="absolute bottom-0 right-0 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-full p-1 shadow">
              <Edit size={16} className="text-white" />
            </span>
          </div>
          <div className="flex flex-col items-center mt-2">
            <span className="text-lg font-bold text-navy-700">{watchAll.full_name || "Add name"}</span>
            {isIncomplete && <span className="mt-2 text-autumn-600 font-medium">Let’s complete your profile so we can recommend better jobs!</span>}
          </div>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

// Section wrapper with edit icon + collapsible
function DetailsSection({ title, children }: { title: string, children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
      <div className="flex items-center justify-between cursor-pointer group px-2" onClick={() => setOpen(!open)}>
        <div className="text-base md:text-lg font-semibold text-navy-600">{title}</div>
        <Edit size={18} className="text-slate-400 group-hover:text-navy-400 transition" />
      </div>
      <CollapsibleContent className={`${open ? "block" : "hidden"} mt-2`}>
        <div>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default UpdateProfile;

