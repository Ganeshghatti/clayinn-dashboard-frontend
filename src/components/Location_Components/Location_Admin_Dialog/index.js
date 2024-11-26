import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { create_Location_Admin, delete_Location_Admin, fetch_All_Location_Action } from "@/app/redux/location_Slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Location_Admin_Dialog({ open, onOpenChange, location, action }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [adminData, setAdminData] = useState({
    admin_name: "",
    admin_email: "",
    admin_password: "",
  });

  const handleSubmit = async () => {
    try {
      if (action === 'add') {
        if (!adminData.admin_name || !adminData.admin_email || !adminData.admin_password) {
          throw new Error("Please fill in all fields");
        }
        await dispatch(create_Location_Admin({
          locationId: location.loc_id,
          adminData
        })).unwrap();
      } else {
        await dispatch(delete_Location_Admin(location.loc_id)).unwrap();
      }
      
      // Refresh location data
      await dispatch(fetch_All_Location_Action());
      
      toast({
        title: "Success",
        description: action === 'add' ? "Admin added successfully" : "Admin removed successfully",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Operation failed",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {action === 'add' ? 'Add Location Admin' : 'Remove Location Admin'}
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {action === 'add' 
              ? 'Create a new admin account for this location'
              : `Are you sure you want to remove ${location.location_admin?.name || 'the admin'} from this location?`}
          </DialogDescription>
        </DialogHeader>

        {action === 'add' ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Admin Name</Label>
              <Input
                value={adminData.admin_name}
                onChange={(e) => setAdminData({...adminData, admin_name: e.target.value})}
                placeholder="Enter admin name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <Input
                type="email"
                value={adminData.admin_email}
                onChange={(e) => setAdminData({...adminData, admin_email: e.target.value})}
                placeholder="Enter admin email"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Password</Label>
              <Input
                type="password"
                value={adminData.admin_password}
                onChange={(e) => setAdminData({...adminData, admin_password: e.target.value})}
                placeholder="Enter admin password"
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm text-gray-500">
              Current admin: <span className="font-medium">{location.location_admin?.name}</span>
              <br />
              Email: <span className="font-medium">{location.location_admin?.email}</span>
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={action === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {action === 'add' ? 'Add Admin' : 'Remove Admin'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 