import { useMemo, useState } from "react";
import { Box, Group, Text, Select } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

interface ShipmentData {
  id?: string;
  dnNo: string;
  partNo: string;
  productName: string;
  coo: string;
  hsCode: string;
  qty: number;
  unitPrice: number;
  totalPriceUSD: number;
  totalPriceSAR: number;
}

interface ShipmentTableProps {
  data: ShipmentData[];
  shipmentId?: string;
  mauwb?: string;
  date?: string;
  timestamp?: string;
  startDate?: string;
  endDate?: string;
  count?: number;
  countryCode?: string;
  status?: "Uploaded" | "Pending" | "Processing";
  referenceNo?: string;
  variant?: "active" | "deleted";
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
}

export function ShipmentTable({
  data,
  shipmentId,
  timestamp,
  startDate,
  endDate,
  count = 1,
  countryCode = "CN",
  status = "Uploaded",
  referenceNo,
}: ShipmentTableProps) {
  const [pageSize, setPageSize] = useState<string>("15");

  const totalQty = data.reduce((acc, curr) => acc + curr.qty, 0);
  const totalUSD = data.reduce((acc, curr) => acc + curr.totalPriceUSD, 0);
  const totalSAR = data.reduce((acc, curr) => acc + curr.totalPriceSAR, 0);

  const columns = useMemo<MRT_ColumnDef<ShipmentData>[]>(
    () => [
      {
        accessorKey: "dnNo",
        header: "DN No",
        size: 140,
      },
      {
        accessorKey: "partNo",
        header: "Part No",
        size: 130,
      },
      {
        accessorKey: "productName",
        header: "Product Name",
        size: 200,
        grow: true,
      },
      {
        accessorKey: "coo",
        header: "COO",
        size: 80,
      },
      {
        accessorKey: "hsCode",
        header: "HS Code",
        size: 130,
      },
      {
        accessorKey: "qty",
        header: "QTY",
        size: 90,
        mantineTableHeadCellProps: { align: "right" },
        mantineTableBodyCellProps: { align: "right" },
      },
      {
        accessorKey: "unitPrice",
        header: "Unit Price",
        size: 110,
        mantineTableHeadCellProps: { align: "right" },
        mantineTableBodyCellProps: { align: "right" },
        Cell: ({ cell }) => `$${cell.getValue<number>()}`,
      },
      {
        accessorKey: "totalPriceUSD",
        header: "Total Price (USD)",
        size: 140,
        mantineTableHeadCellProps: { align: "right" },
        mantineTableBodyCellProps: { align: "right" },
        Cell: ({ cell }) => `$${cell.getValue<number>()}`,
      },
      {
        accessorKey: "totalPriceSAR",
        header: "Total Price (SAR)",
        size: 140,
        mantineTableHeadCellProps: { align: "right" },
        mantineTableBodyCellProps: { align: "right" },
        Cell: ({ cell }) => `SAR ${cell.getValue<number>()}`,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data,
    enableColumnDragging: true, // Enable column dragging
    enableColumnOrdering: true, // Enable column reordering
    enableSorting: true,
    enableColumnResizing: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: parseInt(pageSize, 10), pageIndex: 0 },
      density: "xs",
    },
    mantineTableProps: {
      striped: true, // Alternating row colors
      highlightOnHover: true,
      withTableBorder: false,
      className: "shipment-table",
    },
    mantineTableHeadCellProps: {
      style: {
        fontWeight: 600,
        fontSize: "13px",
        padding: "8px 12px",
        backgroundColor: "var(--mantine-color-gray-0)",
      },
    },
    mantineTableBodyCellProps: {
      style: {
        fontSize: "12px",
        padding: "6px 12px",
      },
    },
    mantinePaginationProps: {
      rowsPerPageOptions: ["15", "25", "50"],
    },
    paginationDisplayMode: "pages",
    positionPagination: "bottom",
  });

  return (
    <Box
      mb="sm"
      style={{
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Shipment Master Header - Teal colored row with all details */}
      <Box
        p={5}
        style={{
          background: "linear-gradient(to bottom, #2d8a6e, #247a5f)",
          borderBottom: "1px solid #1a5c47",
        }}
      >
        <Group
          gap="lg"
          wrap="nowrap"
          justify="center"
          style={{ overflowX: "auto" }}
        >
          {/* Shipment ID */}
          <Box style={{ minWidth: 120 }}>
            <Text size="sm" fw={700} c="white">
              {shipmentId || "—"}
            </Text>
          </Box>

          {/* Timestamp */}
          <Box style={{ minWidth: 160 }}>
            <Text size="sm" fw={500} c="white">
              {timestamp || "—"}
            </Text>
          </Box>

          {/* Start Date */}
          <Box style={{ minWidth: 160 }}>
            <Text size="sm" fw={500} c="white">
              {startDate || "—"}
            </Text>
          </Box>

          {/* End Date */}
          <Box style={{ minWidth: 160 }}>
            <Text size="sm" fw={500} c="white">
              {endDate || "—"}
            </Text>
          </Box>

          {/* Count */}
          <Box style={{ minWidth: 60, textAlign: "center" }}>
            <Text size="sm" fw={700} c="white">
              {count}
            </Text>
          </Box>

          {/* Country Code */}
          <Box style={{ minWidth: 60, textAlign: "center" }}>
            <Text size="sm" fw={700} c="white">
              {countryCode}
            </Text>
          </Box>

          {/* Status */}
          <Box style={{ minWidth: 100, textAlign: "center" }}>
            <Text
              color={
                status === "Uploaded"
                  ? "yellow"
                  : status === "Pending"
                  ? "orange"
                  : "blue"
              }
              variant="filled"
              size="sm"
            >
              {status}
            </Text>
          </Box>

          {/* Reference No */}
          <Box style={{ minWidth: 110 }}>
            <Text
              size="sm"
              fw={600}
              c="#4fc3f7"
              style={{ cursor: referenceNo ? "pointer" : "default" }}
            >
              {referenceNo || "—"}
            </Text>
          </Box>
        </Group>
      </Box>

      {/* Summary Row */}
      <Group
        bg="blue.0"
        p={3}
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
        justify="space-around"
        gap="md"
      >
        <Text size="sm" fw={500}>
          Items: {data.length}
        </Text>
        <Text size="sm" fw={500}>
          Total Qty: {totalQty}
        </Text>
        <Text size="sm" fw={500}>
          Total USD: ${totalUSD.toLocaleString()}
        </Text>
        <Text size="sm" fw={500}>
          Total SAR: {totalSAR.toLocaleString()}
        </Text>
      </Group>

      {/* MantineReactTable with draggable columns and striped rows */}
      <Box style={{ overflowX: "auto" }}>
        <MantineReactTable table={table} />
      </Box>

      {/* Custom Pagination Footer */}
      <Group
        justify="space-between"
        p="xs"
        bg="gray.0"
        style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Group gap="xs">
          <Text size="xs" c="dimmed">
            Rows per page:
          </Text>
          <Select
            data={["15", "25", "50"]}
            value={pageSize}
            onChange={(val) => {
              setPageSize(val || "15");
              table.setPageSize(parseInt(val || "15", 10));
            }}
            size="xs"
            style={{ width: 70 }}
            withCheckIcon={false}
          />
        </Group>
        <Group gap="xs">
          <Text size="xs" c="dimmed">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
        </Group>
      </Group>
    </Box>
  );
}
