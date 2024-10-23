"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { useDispatch, useSelector } from "react-redux";
import { fetchLocations_Actions } from "@/app/redux/locationsSlice";
import { useParams } from "next/navigation";
import { fetchAll_Members_Actions } from "@/app/redux/memberSlice";
import MemberCreate_Dialog from "@/components/MembersComponets/MemberCreate_Dialog";

import Members_Table from "@/components/MembersComponets/Members_Table";

export default function Page() {

    const { locationId } = useParams();
    const dispatch = useDispatch();
    const [filteredLocations, setFilteredLocations] = useState({});


    const { locations, isLoading, error } = useSelector((state) => state.locations);
    const { members, isLoading: membersLoading, error: membersError } = useSelector((state) => state.members)




    useEffect(() => {
        dispatch(fetchLocations_Actions());
    }, [dispatch]);

    useEffect(() => {
        if (locations.length > 0 && locationId) {
            const filtered = locations.filter((location) =>
                location?.loc_id.toLowerCase().startsWith(locationId.toLowerCase())
            );
            setFilteredLocations(filtered);
        }
    }, [locations, locationId]);

    const location_id = filteredLocations[0]?.loc_id


    useEffect(() => {
        if (location_id) {
            dispatch(fetchAll_Members_Actions(location_id))
        }
    }, [location_id, dispatch])



    return (
        <div>
            {/* Header section */}
            <div className="w-[95vw] m-auto md:w-[80vw] flex items-center justify-between p-4 rounded-lg shadow-sm mt-2 sticky top-0 bg-clayInnPrimary">
                <div className="bg-clayInnBackground text-clayInnPrimary rounded-full py-2 px-2">
                    <SidebarTrigger className="hover:bg-clayInnBackground hover:text-clayInnPrimary hover:animate-pulse transition-all duration-300 ease-linear" />
                </div>
                <h1 className="lg:text-xl text-base text-center uppercase font-semibold text-clayInnBackground">
                    {locationId} Members Page
                </h1>
                <div className="flex items-center justify-between gap-2">
                    <MemberCreate_Dialog location_id={location_id} action="Create" />
                </div>
            </div>
            <div className="flex flex-wrap">
                {/* {
                    members.length > 0 ? members.map((member, index) => (
                    )) : <p>No members found for this location.</p>
                } */}
                <Members_Table location_id={location_id} members={members} />
            </div>
        </div>
    );
}
