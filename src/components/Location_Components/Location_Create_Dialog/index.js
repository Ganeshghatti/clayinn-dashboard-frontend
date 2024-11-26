import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Location_Create_Form from "@/components/Forms/Location_Create_Form";

export default function Location_Create_Dialog({ open, onOpenChange, action, location }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === "create" ? "Create New Location" : "Edit Location"}
          </DialogTitle>
        </DialogHeader>
        <Location_Create_Form
          setOpen={onOpenChange}
          action={action}
          location={location}
        />
      </DialogContent>
    </Dialog>
  );
} 