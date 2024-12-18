"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Lead_Delete from "../Leads_Delete";
import { useCallback } from "react";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateLead_Action } from "@/app/redux/lead_Slice";
import { fetchVenues_Actions } from "@/app/redux/venue_Slice";
import Lead_Detail from "../Lead_Detail";
import axiosInstance from "@/utils/axiosInstance";
import { create_Booking_Action } from "@/app/redux/booking_Slice";
import { deleteLead_Action } from "@/app/redux/lead_Slice";
import { updateLead_Status } from "@/app/redux/lead_Slice";
import { CSVLink } from "react-csv";
import Lead_Edit_Dialog from "../Lead_Edit_Dialog";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LeadsTable({ leads, locationId }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.leads);
  const { all_venues: venues } = useSelector((state) => state.venues);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 100;
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
  }, [dispatch, locationId]);

  // Search filter
  const filteredLeads =
    leads?.length > 0
      ? leads?.filter(
          (lead) =>
            lead.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.lead_number.toString().includes(searchTerm) ||
            lead.mobile.includes(searchTerm)
        )
      : [];

  // Sorting
  const sortedLeads = useMemo(() => {
    if (!filteredLeads) return [];
    let sortableLeads = [...filteredLeads];
    if (sortConfig.key) {
      sortableLeads.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableLeads;
  }, [filteredLeads, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((sortedLeads?.length || 0) / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };
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
      // Update lead status to closed-won after booking creation
      // await dispatch(updateLead_Action({
      //   leadNumber: selectedLead.lead_number,
      //   data: {
      //     ...selectedLead,
      //     lead_status: "closed-won"
      //   }
      // })).unwrap();

      setShowBookingModal(false);
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    } catch (error) {
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

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Update URL with search parameter
    router.push(pathname + '?' + createQueryString('lead_number', value));
  };


  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
          <Input
          type="number"
          onWheel={(e) => e.target.blur()}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none max-w-sm w-full"
          placeholder="Search by Lead Number"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
        />
        <div className="flex items-center gap-4">
          <CSVLink
            headers={csvHeaders}
            data={filteredLeads}
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
            onValueChange={(value) =>
              router.push(pathname + "?" + createQueryString("status", value == "All" ? "" : value))
            }
            defaultValue={searchParams.get("status") || ""}
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
        <div className="text-center text-red-600">Error: {error}</div>
      ) : leads?.length === 0 ? (
        <div className="text-center">No leads found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th
                  onClick={() => handleSort("lead_number")}
                  className="p-3 text-left cursor-pointer"
                >
                  Lead #
                </th>
                <th
                  onClick={() => handleSort("hostname")}
                  className="p-3 text-left cursor-pointer"
                >
                  Host Name
                </th>
                <th
                  onClick={() => handleSort("mobile")}
                  className="p-3 text-left cursor-pointer"
                >
                  Mobile
                </th>
                <th
                  onClick={() => handleSort("email")}
                  className="p-3 text-left cursor-pointer"
                >
                  Email
                </th>
                <th
                  onClick={() => handleSort("lead_status")}
                  className="p-3 text-left cursor-pointer"
                >
                  Status
                </th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((lead) => (
                <tr
                  key={lead.lead_number}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{lead.lead_number}</td>
                  <td className="p-3">{lead.hostname}</td>
                  <td className="p-3">{lead.mobile}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{renderStatusCell(lead)}</td>
                  <td className="p-3">
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
                  </td>
                  <td className="p-4">
                    {user?.role !== "sales-person" && (
                      <div className="flex gap-2">
                        <Lead_Edit_Dialog leadData={lead} />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteLead(lead.lead_number)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
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
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedLeads?.length || 0)} of{" "}
          {sortedLeads?.length || 0} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
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
