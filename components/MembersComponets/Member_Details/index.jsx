import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



import { TbListDetails } from "react-icons/tb";

import { FaUser } from "react-icons/fa6";
import { CiHashtag } from "react-icons/ci";
import { FaMobile } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { useState } from "react";
import Create_New_Member from "@/components/forms/create_New_Member";
import Members_Dialog from "../Members_Dialog";


// "user_id": "sales-person-d2b7a",
// "email": "john.doe2@example.com",
// "name": "John Doe",
// "role": "sales-person",
// "mobile": "1234567890"

export default function Member_Details({ member, location_id }) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2" variant="ghost">
                        <span><TbListDetails size={20} /></span>
                        <span>
                            Details
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-clayInnPrimary">Member Details</DialogTitle>
                        <DialogDescription className="hidden">
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-start gap-4">
                        <p className="flex items-center gap-2">
                            <span><FaUser size={20} /></span>
                            <span>Name : </span>
                            <span>
                                {member?.name}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span><CiHashtag size={20} /></span>
                            <span>Role : </span>
                            <span>

                                {member?.role}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span><FaMobile size={20} /></span>
                            <span>Contact : </span>
                            <span>
                                {member?.mobile}
                            </span>
                        </p>
                        <p className="flex items-center gap-2">
                            <span><MdAttachEmail size={20} /></span>

                            <span>Email : </span>
                            <span>
                                {member?.email}
                            </span>
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        {/* Delete and Update Member */}
                        <Members_Dialog member={member} location_id={location_id} setOpen={setOpen} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}
