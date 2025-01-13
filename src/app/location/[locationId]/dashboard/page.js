"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchDashboardData } from "@/app/redux/dashboard_Slice";
import { Loading } from "@/components/Loading";
import { FaUserPlus, FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import Footer_Component from "@/components/Footer";
import { getAccessToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const { dashboardData, isLoading, isError } = useSelector(
    (state) => state.dashboard
  );

    const token = getAccessToken();
      const decodedToken = jwtDecode(token);

  useEffect(() => {
    if (locationId) {
      dispatch(fetchDashboardData(locationId));
    }
  }, [dispatch, locationId]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {isError}</div>;
  if (!dashboardData) return <div>No data available</div>;

  return (
    <div className="p-6 flex flex-col justify-between min-h-screen">
      <div>
      {/* Location Header */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {dashboardData.location.name} Dashboard
        </h1>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Leads Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Leads</h2>
            <FaUserPlus className="text-clayInnPrimary text-xl" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.leads.total_leads}</p>
              <p className="text-sm text-gray-500">Total Leads</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashboardData.leads.this_month.total}
                <span className={`ml-2 text-sm ${dashboardData.leads.this_month.percentage_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ({dashboardData.leads.this_month.percentage_change}%)
                </span>
              </p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Bookings</h2>
            <FaCalendarCheck className="text-clayInnPrimary text-xl" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.bookings.total_bookings}</p>
              <p className="text-sm text-gray-500">Total Bookings</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashboardData.bookings.this_month.total}
                <span className={`ml-2 text-sm ${dashboardData.bookings.this_month.percentage_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ({dashboardData.bookings.this_month.percentage_change}%)
                </span>
              </p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>

        {/* Conversion Rate Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Conversion Rate</h2>
            <FaChartLine className="text-clayInnPrimary text-xl" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.conversion_rate.overall}%</p>
              <p className="text-sm text-gray-500">Overall Rate</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-700">{dashboardData.conversion_rate.this_month}%</p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Status Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Lead Status</h2>
          <div className="space-y-3">
            {Object.entries(dashboardData.leads.by_status).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{status.replace('_', ' ')}</span>
                <span className="font-semibold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call Status Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Call Status</h2>
          <div className="space-y-3">
            {Object.entries(dashboardData.leads.by_call_status).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{status.replace('_', ' ')}</span>
                <span className="font-semibold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Bookings</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Next 7 Days</span>
              <span className="font-semibold text-gray-800">{dashboardData.bookings.upcoming.next_7_days}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Upcoming</span>
              <span className="font-semibold text-gray-800">{dashboardData.bookings.upcoming.total}</span>
            </div>
          </div>
        </div>

        {/* Bookings by Occasion */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Bookings by Occasion</h2>
          <div className="space-y-3">
            {Object.entries(dashboardData.bookings.this_month.by_occasion).map(([occasion, count]) => (
              <div key={occasion} className="flex justify-between items-center">
                <span className="capitalize text-gray-600">{occasion}</span>
                <span className="font-semibold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="mt-10">
      <Footer_Component content={decodedToken?.loc_address || ""}/>
      </div>

    </div>
  );
}
