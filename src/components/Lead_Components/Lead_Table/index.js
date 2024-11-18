"use client";

import React, { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ChevronDown, MoreHorizontal } from "lucide-react";
import { BiSort } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LeadsDetails from "../Leads_Details";
import Lead_Delete from "../Leads_Delete";

export default function LeadsTable({ leads, locationId }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterValue, setFilterValue] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleLeadStatusClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  // Define column configuration
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "hostname",
      header: "Host Name",
      cell: ({ row }) => (
        <div className="text-center capitalize">{row.getValue("hostname")}</div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("mobile")}</div>
      ),
    },
    {
      accessorKey: "sales_person",
      header: "Salesperson",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("sales_person")}</div>
      ),
    },

    {
      accessorKey: "followup",
      header: "Follow-up Date",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("followup")}</div>
      ),
    },
    {
      accessorKey: "call_status",
      header: "Call Status",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("call_status")}</div>
      ),
    },
    {
      accessorKey: "lead_status",
      header: "Lead Status",
      cell: ({ row }) => {
        const leadStatus = row.getValue("lead_status");
        const statusStyles =
          leadStatus === "untouched"
            ? "bg-red-700 text-white"
            : "bg-green-600 text-white";
        return (
          <div
            className={`text-center py-1 px-2 rounded-full ${statusStyles}`}
            onClick={() => handleLeadStatusClick(row.original)}
          >
            {leadStatus}
          </div>
        );
      },
    },
    {
      accessorKey: "lead_number",
      header: "Lead #",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("lead_number")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="space-y-2">
            <DropdownMenuLabel className="text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.lead_number)
              }
            >
              Copy Lead Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <LeadsDetails lead={row.original} />
            <Lead_Delete lead={row.original} />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  console.log(leads, "leads");

  const table = useReactTable({
    data: leads,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    globalFilterFn: (row, columnId, filterValue) => {
      const hostname = row.getValue("hostname")?.toLowerCase() || "";
      const leadNumber = String(row.getValue("lead_number") || "");
      return (
        hostname.includes(filterValue.toLowerCase()) ||
        leadNumber.includes(filterValue)
      );
    },
  });

  return (
    <div className="w-full p-4 lg:p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Search and Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4">
        <Input
          placeholder="Search by host name or lead number..."
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          className="w-full lg:max-w-xs bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:border-indigo-500"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
              <BiSort size={20} /> Filter{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-lg p-2 rounded-md"
          >
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize text-gray-700"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="w-full">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center py-3 font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center py-2 px-4 text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length || 0} of{" "}
          {table.getFilteredRowModel().rows?.length || 0} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lead Status Details</DialogTitle>
              <DialogDescription>
                {/* You can add a brief description if necessary */}
              </DialogDescription>
            </DialogHeader>
            <div>
              {/* Display data from the selected row */}
              {selectedRowData ? (
                <div>
                  <p>
                    <strong>Host Name:</strong> {selectedRowData.hostname}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {selectedRowData.mobile}
                  </p>
                  <p>
                    <strong>Salesperson:</strong> {selectedRowData.sales_person}
                  </p>
                  <p>
                    <strong>Follow-up Date:</strong> {selectedRowData.followup}
                  </p>
                  <p>
                    <strong>Call Status:</strong> {selectedRowData.call_status}
                  </p>
                  <p>
                    <strong>Lead Status:</strong> {selectedRowData.lead_status}
                  </p>
                  <p>
                    <strong>Lead Number:</strong> {selectedRowData.lead_number}
                  </p>
                </div>
              ) : (
                <p>No data available.</p>
              )}
            </div>
            <div className="mt-4">
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
