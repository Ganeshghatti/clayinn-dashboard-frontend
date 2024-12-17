"use client"

import * as React from "react"
import { format, startOfMonth, endOfMonth } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize dates from URL or use current month's start and end
  const [date, setDate] = React.useState(() => {
    const urlStartDate = searchParams.get('start_date');
    const urlEndDate = searchParams.get('end_date');

    if (urlStartDate && urlEndDate) {
      return {
        from: new Date(urlStartDate),
        to: new Date(urlEndDate)
      };
    }

    // Default to current month's start and end dates
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    return { from: start, to: end };
  });

  // Effect to update URL when dates change
  React.useEffect(() => {
    if (!date.from || !date.to) return;

    const formattedStartDate = format(date.from, 'yyyy-MM-dd');
    const formattedEndDate = format(date.to, 'yyyy-MM-dd');

    // Create new URLSearchParams to avoid modifying existing params
    const params = new URLSearchParams(searchParams);
    params.set('start_date', formattedStartDate);
    params.set('end_date', formattedEndDate);

    // Update URL without triggering a full page reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [date, pathname, router, searchParams]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange