import { Button } from "@/components/ui/button";
import { CiCalendar } from "react-icons/ci";

export default function Venue_Calendar() {
  return (
    <div className="">
      <Button variant="outline" className="flex items-center gap-2 px-5 py-5">
        <span>
          <CiCalendar size={20} opacity={0.5} />
        </span>
        <span>Date Range</span>
      </Button>
    </div>
  );
}
