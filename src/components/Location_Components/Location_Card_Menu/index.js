"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, UserPlus, UserMinus } from "lucide-react";
import { useState } from "react";
import Location_Delete_Dialog from "../Location_Delete_Dialog";
import Location_Admin_Dialog from "../Location_Admin_Dialog";
import Location_Create_Dialog from "../Location_Create_Dialog";

export default function Location_Card_Menu({ location }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [adminAction, setAdminAction] = useState(null);
console.log(location)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Update Location
          </DropdownMenuItem>
          {location.location_admin.email ? (
            <DropdownMenuItem 
              onClick={() => {
                setAdminAction('delete');
                setShowAdminDialog(true);
              }}
              className="text-red-500"
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Remove Location Admin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem 
              onClick={() => {
                setAdminAction('add');
                setShowAdminDialog(true);
              }}
              className="text-green-600"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Location Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Location
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Location_Create_Dialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        action="edit"
        location={location}
      />

      <Location_Delete_Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        location={location}
      />

      <Location_Admin_Dialog
        open={showAdminDialog}
        onOpenChange={setShowAdminDialog}
        location={location}
        action={adminAction}
      />
    </>
  );
}
