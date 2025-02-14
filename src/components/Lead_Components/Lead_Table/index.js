"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/Forms/search-input";
import { ChevronDown } from "lucide-react";
import { fetchLeads_Action } from "@/app/redux/lead_Slice";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import Lead_Detail from "../Lead_Detail";
import { create_Booking_Action } from "@/app/redux/booking_Slice";
import { deleteLead_Action } from "@/app/redux/lead_Slice";
import { updateLead_Status } from "@/app/redux/lead_Slice";
import { CSVLink } from "react-csv";
import Lead_Edit_Dialog from "../Lead_Edit_Dialog";

import { DecodedToken } from "@/function/jwt";

export default function LeadsTable({ locationId }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState({
    status: "All",
    lead_number: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, leads, nextPage, previousPage, count } =
    useSelector((state) => state.leads);
  const { all_venues: venues } = useSelector((state) => state.venues);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [bookingData, setBookingData] = useState({
    slot: "",
    venue: "",
    occasion: "",
    event_date: "",
  });
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLeadNumber, setSelectedLeadNumber] = useState(null);

  const leadStatuses = [
    {
      label: "Untouched",
      value: "untouched",
      bgColor: "#fee2e2",
      color: "#dc2626",
    },
    {
      label: "Proposal Sent",
      value: "proposal_sent",
      bgColor: "#fef9c3",
      color: "#ca8a04",
    },
    {
      label: "Visit Scheduled",
      value: "visit_scheduled",
      bgColor: "#ccfbf1",
      color: "#0d9488",
    },
    {
      label: "Visit Done",
      value: "visit_done",
      bgColor: "#bbf7d0",
      color: "#16a34a",
    },
    {
      label: "Final Negotiation",
      value: "final_negotiation",
      bgColor: "#dbeafe",
      color: "#2563eb",
    },
    {
      label: "Postponed",
      value: "postponed",
      bgColor: "#ffedd5",
      color: "#ea580c",
    },
    {
      label: "Confirmation Awaited",
      value: "confirmation_awaited",
      bgColor: "#fef3c7",
      color: "#d97706",
    },
    {
      label: "Closed Won",
      value: "closed_won",
      bgColor: "#d1fae5",
      color: "#059669",
    },
    {
      label: "Closed Lost",
      value: "closed_lost",
      bgColor: "#fee2e2",
      color: "#dc2626",
    },
  ];

  useEffect(() => {
    if (locationId) {
      dispatch(fetchVenues_Actions(locationId));
    }
  }, [dispatch]);

  // Handle status change
  const handleStatusChange = async (lead, newStatus) => {
    try {
      // If status is being changed to closed-won, show booking modal
      if (newStatus === "closed_won") {
        setSelectedLead(lead);
        setShowBookingModal(true);
        return; // Don't update status yet
      }

      // For other status changes, proceed as normal
      await dispatch(
        updateLead_Status({
          leadNumber: lead.lead_number,
          formData: {
            lead_status: newStatus,
            location_id: lead.location_id,
            sales_person: lead.sales_person,
          },
        })
      ).unwrap();

      toast({
        title: "Success",
        description: `Lead status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update lead status",
      });
    }
  };

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const decoded = DecodedToken();
    setDecodedToken(decoded);
  }, []);

  // Handle booking creation
  const handleCreateBooking = async () => {
    try {
      const requestBody = {
        lead: selectedLead.lead_number,
        occasion: parseInt(bookingData.occasion),
        venue: bookingData.venue_id,
        location: locationId,
        sales_person: selectedLead.sales_person,
        event_date: format(new Date(bookingData.event_date), "yyyy-MM-dd"),
        slot: bookingData.slot,
      };

      await dispatch(create_Booking_Action({ formData: requestBody })).unwrap();
      console.log("no error till here");
      setShowBookingModal(false);
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    } catch (error) {
      console.log("error during booking creation", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create booking",
      });
    }
  };

  // In your table cell render
  const renderStatusCell = (lead) => {
    const currentStatus = leadStatuses.find(
      (status) => status?.value === lead?.lead_status
    );

    return (
      <td className="p-3">
        <DropdownMenu className="border-none ring-0">
          <DropdownMenuTrigger className="flex items-center gap-2 border-none ring-0">
            <span
              style={{
                backgroundColor: currentStatus?.bgColor,
                color: currentStatus?.color,
              }}
              className={`px-2 py-1 rounded-full text-xs bg-[${currentStatus?.bgColor}]`}
            >
              {/* {lead.lead_status} */}
              {currentStatus?.label}
            </span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {leadStatuses?.map((status) => (
              <DropdownMenuItem
                key={status.label}
                onClick={() => handleStatusChange(lead, status.value)}
              >
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    );
  };

  const handleFilterChange = (name, value) => {
    setFilterState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchData = async (page = null) => {
    try {
      const { lead_number, status } = filterState;

      const query = {
        locationId,
        status: status !== "All" ? status : null,
        lead_number: lead_number || null,
      };

      // If page is provided, add pagination parameters
      if (page == "next" && nextPage) {
        query.next = nextPage;
      } else if (page == "previous" && previousPage) {
        query.previous = previousPage;
      }

      await dispatch(fetchLeads_Action(query));
      console.log("Leads fetched:", leads);

      // Update pagination state after fetching
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if (locationId) {
      fetchData();
    }
  }, [filterState.status, locationId]);

  const handleDeleteLead = async (leadNumber) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteLead_Action(leadNumber)).unwrap();
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
    } catch (error) {
      console.log("error on deleting ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete lead",
      });
    }
  };

  const csvHeaders = [
    { label: "Lead Number", key: "lead_number" },
    { label: "Host Name", key: "hostname" },
    { label: "Mobile", key: "mobile" },
    { label: "Email", key: "email" },
    { label: "Status", key: "lead_status" },
  ];

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prev) => prev + 1);
      fetchData("next");
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPage((prev) => prev - 1);
      fetchData("previous");
    }
  };

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
        <SearchInput
          type="number"
          name="lead_number"
          placeholder="Search by Lead Number"
          value={filterState.lead_number}
          onChange={(e) => handleFilterChange("lead_number", e)}
          onSearch={fetchData}
          isLoading={isLoading}
          debounceMs={500}
          className="max-w-sm w-full"
          error={isError ? "Error searching leads" : undefined}
          validateInput={(value) => {
            if (value && value < 1) {
              return "Please enter a valid lead number";
            }
            return "";
          }}
        />
        <div className="flex items-center gap-4">
          <CSVLink
            headers={csvHeaders}
            data={leads}
            filename="leads.csv"
            className="h-fit w-fit overflow-hidden"
          >
            <Button
              color="#082f49"
              variant="outline"
              rounded="md"
              className="bg-transparent border-slate-200 transition-all border-2 hover:border-[#0ea5e9] hover:bg-[#e0f2fe] "
            >
              {" "}
              Export CSV
            </Button>
          </CSVLink>
          <Select
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            onValueChange={(value) => handleFilterChange("status", value)}
            defaultValue={filterState.status || ""}
          >
            <SelectTrigger className="w-[180px] bg-black text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Status</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {leadStatuses?.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-10 w-10" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-600">Error: {isError}</div>
      ) : leads?.length === 0 ? (
        <div className="text-center">No leads found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left cursor-pointer">Lead #</th>
                <th className="p-3 text-left cursor-pointer">Host Name</th>
                <th className="p-3 text-left cursor-pointer">Mobile</th>
                <th className="p-3 text-left cursor-pointer">Email</th>
                <th className="p-3 text-left cursor-pointer">Status</th>
                <th className="p-3 text-left cursor-pointer">Sales Man</th>
                <th className="p-3 text-left cursor-pointer">Remarks</th>
                <th className="p-3 text-left cursor-pointer">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads?.map((lead) => (
                <tr
                  key={lead.lead_number}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{lead.lead_number}</td>
                  <td className="p-3">{lead.hostname}</td>
                  <td className="p-3">{lead.mobile}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{renderStatusCell(lead)}</td>
                  <td className="p-3">{lead.sales_person_details.name}</td>
                  <td className="p-3">{lead.remark}</td>
                  <td className="p-3 flex gap-2">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedLeadNumber(lead.lead_number);
                          setDetailOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Lead_Edit_Dialog leadData={lead} />
                      {decodedToken?.role !== "sales-person" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteLead(lead?.lead_number)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {leads?.length || 0} of {count || 0} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={!previousPage || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!nextPage || isLoading}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Updated Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Booking</DialogTitle>
            <DialogDescription>
              Fill in the booking details for this lead
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Slot</Label>
              <Select
                value={bookingData.slot}
                onValueChange={(value) =>
                  setBookingData((prev) => ({ ...prev, slot: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Venue</Label>
              <Select
                value={bookingData.venue_id}
                onValueChange={(value) =>
                  setBookingData((prev) => ({ ...prev, venue_id: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue.venue_id} value={venue.venue_id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Occasion</Label>
              <Select
                value={bookingData.occasion}
                onValueChange={(value) =>
                  setBookingData((prev) => ({ ...prev, occasion: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select occasion" />
                </SelectTrigger>
                <SelectContent>
                  {selectedLead?.occasions?.map((occasion) => (
                    <SelectItem
                      key={occasion.id}
                      value={occasion.id.toString()}
                    >
                      {occasion.occasion_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Event Date</Label>
              <Input
                type="date"
                value={bookingData.event_date}
                onChange={(e) =>
                  setBookingData((prev) => ({
                    ...prev,
                    event_date: e.target.value,
                  }))
                }
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowBookingModal(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBooking}
              disabled={
                !bookingData.slot ||
                !bookingData.venue_id ||
                !bookingData.occasion ||
                !bookingData.event_date
              }
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Lead_Detail
        leadNumber={selectedLeadNumber}
        open={detailOpen}
        setOpen={setDetailOpen}
      />
    </div>
  );
}
