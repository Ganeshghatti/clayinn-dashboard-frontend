import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { VenueDetailDialog } from "../Venue_Detail_Dialog"

import background from "@/public/pattern.svg";



export default function VenueCard({ venue, location_id }) {


    return (
        <div className="bg-blue-500/50 rounded-3xl">
            <Card className="w-72 h-40 px-2 py-1 rounded-3xl bg-transparent space-y-2" >
                <CardContent className="p-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-full">
                            <p className="font-bold md:text-lg uppercase text-center">{venue?.name}</p>
                        </div>
                        <div>
                            <VenueDetailDialog venue={venue} location_id={location_id} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}