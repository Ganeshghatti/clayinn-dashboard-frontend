"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosInstance from "@/utils/axiosInstance";

export default function Lead_Detail({ leadNumber, open, setOpen }) {
  const [lead_By_Id, setLead_By_Id] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadDetail = async () => {
      if (!open || !leadNumber) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get(`/leads-management/leads/detail/${leadNumber}/`);
        setLead_By_Id(response.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch lead details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadDetail();
  }, [leadNumber, open]);

  // Simple Badge component
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "converted":
          return "bg-green-100 text-green-800";
        case "lost":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Lead Details
            {lead_By_Id?.lead_status && (
              <StatusBadge status={lead_By_Id.lead_status} />
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading && <div className="text-center py-4">Loading lead details...</div>}
        {error && <div className="text-center text-red-600 py-4">Error: {error}</div>}
        
        {!isLoading && lead_By_Id && (
          <div className="space-y-6">
            {/* Basic Lead Information */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Lead Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lead Number</p>
                  <p>{lead_By_Id.lead_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Host Name</p>
                  <p>{lead_By_Id.hostname}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                  <p>{lead_By_Id.mobile}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{lead_By_Id.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Follow Up Date</p>
                  <p>{lead_By_Id.followup}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Call Status</p>
                  <p className="capitalize">{lead_By_Id.call_status?.replace(/_/g, " ")}</p>
                </div>
              </div>
            </div>

            {/* Occasions */}
            <div>
              <h3 className="font-semibold mb-3">Occasions</h3>
              <div className="space-y-4">
                {lead_By_Id.occasions?.map((occasion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium capitalize mb-3">
                      {occasion.occasion_type}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {occasion.occasion_type === "room" ? (
                        // Room specific fields
                        <>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Date of Booking</p>
                            <p>{occasion.date_of_function}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Number of Pax</p>
                            <p>{occasion.number_of_pax}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Number of room</p>
                            <p>{occasion.number_of_rooms}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Plan</p>
                            <p>{occasion.plan}</p>
                          </div>
                        </>
                      ) : (
                        // Function specific fields
                        <>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Date of Function</p>
                            <p>{occasion.date_of_function}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Day</p>
                            <p>{occasion.day}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Lunch Pax</p>
                            <p>{occasion.lunch_pax || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Hi Tea Pax</p>
                            <p>{occasion.hi_tea_pax || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Dinner Pax</p>
                            <p>{occasion.dinner_pax || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">DJ Value</p>
                            <p>₹{occasion.dj_value || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Decor Value</p>
                            <p>₹{occasion.decor_value || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Liquor Value</p>
                            <p>₹{occasion.liquor_value || 0}</p>
                          </div>
                          {(occasion.occasion_type === "wedding" || occasion.occasion_type === "reception") && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Vedi Value</p>
                              <p>₹{occasion.vedi_value || 0}</p>
                            </div>
                          )}
                        </>
                      )}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <p className="font-semibold">₹{occasion.total || 0}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}