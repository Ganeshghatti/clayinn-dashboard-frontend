"use client";

import { fetchAllMembers } from "@/app/redux/team_Slice";
import Footer_Component from "@/components/Footer";
import Header from "@/components/Header";
import Team_Create_Dialog from "@/components/Team_Components/Team_Create_Dialog";
import TeamTable from "@/components/Team_Components/Team_Table";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "@/utils/auth";

export default function Team() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const pathName = usePathname();
  const locationName = pathName.split("/")[3];
  const location_Name = pathName.split("/")[2];
  const { members } = useSelector((state) => state.members);

  const token = getAccessToken();
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    dispatch(fetchAllMembers(locationId));
  }, [dispatch, locationId]);

  return (
    <div className="space-y-10 flex flex-col h-screen">
      <div>
        <div>
          <Header content={`${locationName}`} />
        </div>

        <div className="mt-10">
          <Team_Create_Dialog action={"create"} locationId={locationId} />
        </div>
      </div>

      <div className="w-full h-full">
        <TeamTable members={members} locationId={locationId} />
      </div>
      <div>
        <Footer_Component content={decodedToken?.loc_address || ""} />
      </div>
    </div>
  );
}
