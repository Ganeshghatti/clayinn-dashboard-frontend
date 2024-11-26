import { venue_Delete_Action } from "@/app/redux/venue_Slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Delete_Dialog({ venue, location_Id, setOpen }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const venue_id = venue?.venue_id;
  const onHandle_Delete_Venue = async () => {
    try {
      await dispatch(venue_Delete_Action({ location_Id, venue_id }));
      router.refresh();
      toast({
        title: "Venue Deleted Successfully . . .",
      });
    } catch (error) {
      toast({
        title: "Something Went Wrong . . . ",
      });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-600 hover:bg-red-500 text-white">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-600">
              This action cannot be undone. This will permanently delete your
              venue and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={onHandle_Delete_Venue}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
