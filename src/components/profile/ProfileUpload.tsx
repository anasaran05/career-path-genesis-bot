
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileUploadProps {
  imgUrl?: string;
  onUpload: (file: File) => void;
}

const ProfileUpload: React.FC<ProfileUploadProps> = ({ imgUrl, onUpload }) => {
  const fileInput = React.useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <Avatar className="h-24 w-24 ring-4 ring-autumn-300 shadow-lg mb-2">
        <AvatarImage src={imgUrl} alt="Profile Pic" />
        <AvatarFallback>👤</AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInput}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
      <button
        type="button"
        className="absolute bottom-2 right-3 bg-white/70 border border-autumn-300 rounded-full p-1 hover:bg-autumn-100 shadow"
        onClick={() => fileInput.current?.click()}
      >
        <span role="img" aria-label="edit">✏️</span>
      </button>
    </div>
  );
};

export default ProfileUpload;
