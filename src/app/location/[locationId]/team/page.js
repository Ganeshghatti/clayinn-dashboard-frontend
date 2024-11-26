"use client";

import { fetchAllMembers } from "@/app/redux/team_Slice";
import Footer_Component from "@/components/Footer";
import Header from "@/components/Header";
import Team_Create_Dialog from "@/components/Team_Components/Team_Create_Dialog";
import TeamTable from "@/components/Team_Components/Team_Table";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Team() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];
  const location_Name = pathName.split("/")[2];
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchAllMembers(locationId));
  }, [dispatch, locationId]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-none space-y-4">
        <Header content={`${locationName}`} />
        <div className="px-4">
          <Team_Create_Dialog action="create" locationId={locationId} />
        </div>
      </div>

      <div className="flex-1 py-6">
        <TeamTable members={members} locationId={locationId} />
      </div>

      <div className="flex-none">
        <Footer_Component content={location_Name} />
      </div>
    </div>
  );
}
