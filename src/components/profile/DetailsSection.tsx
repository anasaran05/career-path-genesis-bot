
import React from "react";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { Edit } from "lucide-react";

const DetailsSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
      <div
        className="flex items-center justify-between cursor-pointer group px-2"
        onClick={() => setOpen(!open)}
      >
        <div className="text-base md:text-lg font-semibold text-navy-600">{title}</div>
        <Edit size={18} className="text-slate-400 group-hover:text-navy-400 transition" />
      </div>
      <CollapsibleContent className={`${open ? "block" : "hidden"} mt-2`}>
        <div>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DetailsSection;
