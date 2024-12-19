"use client";

import { fetchLeads_Action } from "@/app/redux/lead_Slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import Footer_Component from "@/components/Footer";
import Lead_Create_Dialog from "@/components/Lead_Components/Leads_Create_Dialog";
import LeadsTable from "@/components/Lead_Components/Lead_Table";
import { useSearchParams } from "next/navigation";

export default function Leads() {
  const { locationId } = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { leads, isLoading, error } = useSelector((state) => state.leads);

  useEffect(() => {
    if (locationId) {
      dispatch(
        fetchLeads_Action({
          locationId,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="space-y-14 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-4">
        <Header content="Leads Management" />
        <div className="px-4">
          <Lead_Create_Dialog action="create" locationId={locationId} />
        </div>
      </div>

      <div className="flex-1">
        <LeadsTable leads={leads} locationId={locationId} />
      </div>
      <Footer_Component content={locationId} />
    </div>
  );
}
