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



export default function VenueCard() {

    const description = "Discover the best banquet at Clay Inn Hotel. With its exceptional facilities, impeccable service, it is the perfect choice for your special occasions.We strive to make every occasion a memorable one. Whether you are planning a lavish wedding, a corporate conference, or a joyous celebration, Clay Inn Hotel offers the perfect blend of elegance, convenience, and luxury."
    return (
        <div className="">
            <Card className="w-[300px]">
                <CardHeader className="flex flex-col items-start justify-start">
                    <CardTitle>Orchid</CardTitle>
                    <CardDescription className="text-start">{description.length > 50 ? description.slice(0, 50) + ". . ." : ""}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p></p>
                </CardContent>
                <CardFooter className="flex items-end justify-end">
                    <VenueDetailDialog />
                </CardFooter>
            </Card>
        </div>
    )
}