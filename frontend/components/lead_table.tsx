"use client"

import { useMemo, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Lead } from "@/store/leadStore"

interface Props {
  data: Lead[]
}

export default function LeadTable({ data }: Props) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  })

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const exportCSV = (rows: Lead[]) => {

    if (!rows.length) return

    const headers = Object.keys(rows[0])

    const csvContent =
      headers.join(",") +
      "\n" +
      rows
        .map((row) =>
          headers
            .map((h) => `"${((row as unknown) as Record<string, unknown>)[h] ?? ""}"`)
            .join(",")
        )
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", "leads_export.csv")
    link.click()
  }

  const columns = useMemo<ColumnDef<Lead>[]>(() => [

    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },

    {
      accessorKey: "company_name",
      header: "Company",
    },

    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => (
        <a
          href={row.original.website}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Open
        </a>
      ),
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {

        const email = row.original.email

        const copyEmail = () => {
          navigator.clipboard.writeText(email)
          setCopiedEmail(email)

          setTimeout(() => {
            setCopiedEmail(null)
          }, 1500)
        }

        return (
          <div className="flex items-center gap-2">

            <span>{email}</span>

            <button
              onClick={copyEmail}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              {copiedEmail === email ? "Copied" : "Copy"}
            </button>

          </div>
        )
      },
    },

    {
      accessorKey: "linkedin",
      header: "LinkedIn",
      cell: ({ row }) => (
        <a
          href={row.original.linkedin}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Open
        </a>
      ),
    },

    {
      accessorKey: "score",
      header: "Score",
      cell: ({ row }) => {

        const score = row.original.score

        let color = "bg-gray-200"

        if (score >= 80) color = "bg-green-500 text-white"
        else if (score >= 50) color = "bg-yellow-400"
        else color = "bg-red-400 text-white"

        return (
          <span className={`px-2 py-1 rounded text-sm ${color}`}>
            {score}
          </span>
        )
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {

        const status = row.original.status

        let color = "bg-gray-200"

        if (status === "discovered") color = "bg-purple-500 text-white"
        else if (status === "analyzed") color = "bg-blue-500 text-white"
        else if (status === "contacted") color = "bg-green-500 text-white"

        return (
          <span className={`px-2 py-1 rounded text-xs ${color}`}>
            {status}
          </span>
        )
      },
    },

  ], [copiedEmail])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const selectedRows = table.getSelectedRowModel().rows.map(r => r.original)

  return (
    <div className="space-y-4">

      {selectedRows.length > 0 && (

        <div className="flex items-center gap-4 bg-gray-100 p-3 rounded">

          <span className="text-sm font-medium">
            {selectedRows.length} selected
          </span>

          <button
            onClick={() => exportCSV(selectedRows)}
            className="px-3 py-1 bg-black text-white rounded text-sm"
          >
            Export CSV
          </button>

        </div>

      )}

      <div className="rounded-md border">

        <Table>

          <TableHeader>

            {table.getHeaderGroups().map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >

                    <div className="flex items-center gap-1">

                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: "↑",
                        desc: "↓",
                      }[header.column.getIsSorted() as string] ?? null}

                    </div>

                  </TableHead>

                ))}

              </TableRow>

            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows.length ? (

              table.getRowModel().rows.map((row) => (

                <TableRow key={row.id}>

                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>

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

                <TableCell colSpan={columns.length} className="text-center h-24">
                  No leads found.
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      <div className="flex items-center justify-between">

        <div className="flex gap-2">

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded"
          >
            Previous
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>

        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

    </div>
  )
}