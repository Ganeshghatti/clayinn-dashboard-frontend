"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Lead_Delete from "../Leads_Delete";
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
  SelectItem,
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
import { CSVLink } from "react-csv";

export default function LeadsTable({ leads, locationId }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { all_venues: venues } = useSelector((state) => state.venues);
  const auth = useSelector((state) => state.auth);
  const user = auth?.user;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const itemsPerPage = 10;
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
      label: "untouched",
      bgColor: "#fecaca",
    },
    {
      label: "in-progress",
      bgColor: "#fed7aa",
    },
    {
      label: "closed-won",
      bgColor: "#bbf7d0",
    },
    {
      label: "closed-lost",
      bgColor: "#fca5a5",
    },
    {
      label: "not-interested",
      bgColor: "#d9f99d",
    },
    // "untouched",
    // "in-progress",
    // "closed-won",
    // "closed-lost",
    // "not-interested",
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

      console.log("lead", lead)
      console.log("status change", newStatus)
      if (newStatus === "closed-won") {
        setSelectedLead(lead);
        setShowBookingModal(true);
        return; // Don't update status yet
      }

      // For other status changes, proceed as normal
      await dispatch(
        updateLead_Action({
          leadNumber: lead.lead_number,
          data: {
            ...lead,
            lead_status: newStatus,
          },
        })
      ).unwrap();

      console.log("Lead status updated successfully", leads);

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
    console.log("the leads in the dropdown", leads)
    return (
      <td className="p-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              lead.lead_status === "untouched"
                ? "bg-red-100 text-red-800"
                : lead.lead_status === "closed-won"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {lead.lead_status}
          </span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {leadStatuses.map((status) => (
            <DropdownMenuItem
              key={status.label}
              // changes the style on hover

              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = status.bgColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
              className={`
                cursor-pointer 
                transition-all 
                hover:bg-opacity-20
                hover:!bg-[${status.bgColor}]
                !text-[${status.bgColor}]
                hover:text-black
              `}
              onClick={() => handleStatusChange(lead, status.label)}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
    )
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

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by name, lead number, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <CSVLink headers={csvHeaders} data={filteredLeads} filename="leads.csv" className="h-fit w-fit overflow-hidden">
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
      </div>

      {/* Table */}
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
              <tr key={lead.lead_number} className="border-b hover:bg-gray-50">
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
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteLead(lead.lead_number)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
