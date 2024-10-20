import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { TbListDetails } from "react-icons/tb";
import {
    FaLocationDot,
    FaMobileRetro,
    FaBuilding,
    FaPersonRays,
} from "react-icons/fa6";
import { ImUser } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import Common_Dialog_Create_and_Update from "@/components/common_Dialog_Create_and Update";
import { useRouter } from "next/navigation";

export default function LocationDetails({ locationId }) {
    const [locationDetails, setLocationDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // URL From Environment Variable
    const url = process.env.NEXT_PUBLIC_URL;

    // API Call to Fetch Location Details
    const getLocationDetails = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access-token");
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(`${url}/location-management/locations/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLocationDetails(response.data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onHandleLocationEdit = async (id) => {
        await getLocationDetails(id);
    };

    // API Call to Delete Location
    const deleteLocationBy_Id = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("access-token");
            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.delete(`${url}/location-management/locations/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setOpen(false);
            router.refresh();
        } catch (err) {
            console.error(err);
            setError(err.message);
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const onHandleLocationDelete = async (id) => {
        await deleteLocationBy_Id(id);
    };


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2" onClick={() => onHandleLocationEdit(locationId)}>
                        <span><TbListDetails size={20} /></span>
                        <span>Details</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md space-y-6">
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-lg">Location Details</DialogTitle>
                        <DialogDescription className="hidden">
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {/* Render loading, error, or fetched location details */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : locationDetails ? (
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <p className="flex items-center gap-2"><span><FaBuilding size={20} /></span>Location Name: {locationDetails?.name}</p>
                                    <p className="flex items-center gap-2"><span><FaLocationDot size={20} /></span>Address: {locationDetails?.address}</p>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h1 className="font-semibold text-lg">Location Admin</h1>
                                    <div className="space-y-4">
                                        <p className="flex items-center gap-2"><span><ImUser size={20} /></span>Location Admin Name : {locationDetails?.location_admin?.name}</p>
                                        <p className="flex items-center gap-2"><span><FaMobileRetro size={20} /></span>Mobile : {locationDetails?.location_admin?.mobile}</p>
                                        <p className="flex items-center gap-2"><span><MdEmail size={20} /></span>Email : {locationDetails?.location_admin?.email}</p>
                                        <p className="flex items-center gap-2"><span><FaPersonRays size={20} /></span>Role : {locationDetails?.location_admin?.role}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-end gap-2">
                                    <Common_Dialog_Create_and_Update heading="Update" description="This form will allow you to update location for the hotels." action="Update" location={locationDetails} />
                                    <Button className="bg-red-600 hover:bg-red-500" onClick={() => onHandleLocationDelete(locationId)}>Delete</Button>
                                </div>
                            </div>
                        ) : (
                            <p>No data to display</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
