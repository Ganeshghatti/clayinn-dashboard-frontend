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

import wave from "@/public/wave.svg";



export default function VenueCard({ venue, location_id }) {


    return (

        <div className="">
            <div className="max-md:w-[300px] md:w-[350px] h-44 border border-clayInnBackground  shadow-2xl hover:ring-2 hover:ring-clayInnBackground transition-all duration-300 ease-linear scale-95 hover:scale-100 rounded-md" style={{ backgroundImage: `url(${wave.src})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "white" }}>
                <div className="flex justify-between items-center">
                    <div className="bg-black w-[80%] h-[50px] rounded-br-full shadow-xl shadow-cardBorder my-auto flex items-center justify-center text-center rounded-tl-xl">
                        <p className="text-clayInnBackground text-lg font-semibold capitalize ">
                            {venue?.name}
                        </p>
                    </div>
                    <div className="">
                        <VenueDetailDialog venue={venue} location_id={location_id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
