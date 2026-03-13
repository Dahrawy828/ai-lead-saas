"use client"

import { useMemo } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: "company",
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
            {row.original.website.replace("https://", "")}
          </a>
        ),
      },

      {
        accessorKey: "email",
        header: "Email",
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
            View
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

          if (status === "new") color = "bg-blue-500 text-white"
          if (status === "discovered") color = "bg-purple-500 text-white"
          if (status === "contacted") color = "bg-green-500 text-white"

          return (
            <span className={`px-2 py-1 rounded text-xs ${color}`}>
              {status}
            </span>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>

        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-muted">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No leads found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  )
}