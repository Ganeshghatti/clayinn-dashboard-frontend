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

    const description = "Discover the best banquet at Clay Inn Hotel. With its exceptional facilities, impeccable service, it is the perfect choice for your special occasions.We strive to make every occasion a memorable one. Whether you are planning a lavish wedding, a corporate conference, or a joyous celebration, Clay Inn Hotel offers the perfect blend of elegance, convenience, and luxury."
    return (
        <div className="border border-gray-300 rounded-lg shadow-2xl scale-100 hover:scale-95 transition-all duration-300 ease-linear bg-clayInnPrimary" >
            <Card className="w-64 md:w-full bg-transparent border-none shadow-none" >
                <CardHeader className="flex flex-col items-start justify-start">
                    <CardTitle className="text-clayInnBackground uppercase ">{venue?.name}</CardTitle>

                    <CardDescription className="text-start pt-10 text-white">{description.length > 50 ? description.slice(0, 50) + ". . ." : ""}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p></p>
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                    <VenueDetailDialog venue={venue} location_id={location_id} />
                </CardFooter>
            </Card>
        </div>
    )
}