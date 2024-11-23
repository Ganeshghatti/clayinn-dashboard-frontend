"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import LeadsDetails from "../Leads_Details";
import Lead_Delete from "../Leads_Delete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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

export default function LeadsTable({ leads, locationId }) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 10;
  const [venues, setVenues] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [bookingData, setBookingData] = useState({
    slot: "",
    venue: "",
    occasion: "",
    event_date: "",
  });

  const leadStatuses = [
    "untouched",
    "in-progress",
    "closed-won",
    "closed-lost",
    "not-interested",
  ];

  // Search filter
  const filteredLeads = leads?.filter(lead => 
    lead.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lead_number.toString().includes(searchTerm) ||
    lead.mobile.includes(searchTerm)
  );

  // Sorting
  const sortedLeads = [...(filteredLeads || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLeads?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((sortedLeads?.length || 0) / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // Fetch venues when needed
  const fetchVenues = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const URL = process.env.NEXT_PUBLIC_URL;
      const response = await axios.get(
        `${URL}/venue-management/locations/${locationId}/venues/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (lead, newStatus) => {
    if (newStatus === "closed-won") {
      setSelectedLead(lead);
      await fetchVenues();
      setShowBookingModal(true);
    }
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  // Handle booking creation
  const handleCreateBooking = async () => {
    try {
      const token = localStorage.getItem("access-token");
      const URL = process.env.NEXT_PUBLIC_URL;
      const requestBody = {
        lead: selectedLead.lead_number,
        occasion: parseInt(bookingData.occasion),
        venue: bookingData.venue_id,
        location: locationId,
        sales_person: selectedLead.sales_person,
        event_date: format(new Date(bookingData.event_date), "yyyy-MM-dd"),
        slot: bookingData.slot
      };
      console.log(requestBody)
      const response = await axios.post(
        `${URL}/bookings-management/bookings/create/`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowBookingModal(false);
      toast({
        title: "Success",
        description: "Booking created successfully",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create booking",
      });
    }
  };

  // In your table cell render
  const renderStatusCell = (lead) => (
    <td className="p-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            lead.lead_status === 'untouched' ? 'bg-red-100 text-red-800' :
            lead.lead_status === 'closed-won' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {lead.lead_status}
          </span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {leadStatuses.map((status) => (
            <DropdownMenuItem
              key={status}
              onClick={() => handleStatusChange(lead, status)}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </td>
  );

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Search and Filters */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name, lead number, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th onClick={() => handleSort('lead_number')} className="p-3 text-left cursor-pointer">
                Lead #
              </th>
              <th onClick={() => handleSort('hostname')} className="p-3 text-left cursor-pointer">
                Host Name
              </th>
              <th onClick={() => handleSort('mobile')} className="p-3 text-left cursor-pointer">
                Mobile
              </th>
              <th onClick={() => handleSort('email')} className="p-3 text-left cursor-pointer">
                Email
              </th>
              <th onClick={() => handleSort('lead_status')} className="p-3 text-left cursor-pointer">
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
                <td className="p-3">
                  {renderStatusCell(lead)}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <LeadsDetails lead={lead} />
                    <Lead_Delete lead={lead} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedLeads?.length || 0)} of {sortedLeads?.length || 0} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                    <SelectItem key={occasion.id} value={occasion.id.toString()}>
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
                  setBookingData((prev) => ({ ...prev, event_date: e.target.value }))
                }
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowBookingModal(false)} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={handleCreateBooking}
              disabled={!bookingData.slot || !bookingData.venue_id || !bookingData.occasion || !bookingData.event_date}
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
