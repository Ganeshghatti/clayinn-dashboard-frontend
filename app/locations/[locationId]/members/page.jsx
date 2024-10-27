"use client";

import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { fetchLocations_Actions } from "@/app/redux/locationsSlice";
import { useParams } from "next/navigation";
import { fetchAll_Members_Actions } from "@/app/redux/memberSlice";
import MemberCreate_Dialog from "@/components/MembersComponets/MemberCreate_Dialog";

import Members_Table from "@/components/MembersComponets/Members_Table";

import { FaChevronRight } from "react-icons/fa";
import Footer from "@/components/Footer";

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
        <div className="flex flex-col gap-4 px-2 h-screen">
            {/* Header section */}
            <div className="mt-4 flex items-center justify-between px-5">
                <div>
                    <h1 className="flex items-center justify-start text-sm sm:text-xl md:text-2xl font-bold text-mainText capitalize">
                        <span className="text-mainText/60">Clay Inn Hotels</span>
                        <span><FaChevronRight /></span>
                        <span>
                            {locationId} Team
                        </span>
                    </h1>
                </div>
                <div className="">
                    <MemberCreate_Dialog location_id={location_id} action="Create" />
                </div>
            </div>
            <div className="flex-1">
                {/* {
                    members.length > 0 ? members.map((member, index) => (
                    )) : <p>No members found for this location.</p>
                } */}
                <Members_Table location_id={location_id} members={members} />
            </div>
            <div>
                <Footer content={`${locationId} Team`} />
            </div>
        </div>
    );
}
