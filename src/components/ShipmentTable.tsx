import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  type ColDef,
} from "ag-grid-community";
import { Box, Group, Text } from "@mantine/core";
// import { IconTrash, IconRotateClockwise } from "@tabler/icons-react";

ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

interface ShipmentTableProps {
  data: any[];
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
  variant = "active",
  onDelete,
  onRestore,
}: ShipmentTableProps) {
  const colDefs: ColDef[] = useMemo(
    () => [
      {
        field: "dnNo",
        headerName: "DN No",
        headerClass: "ag-header-bold",
        rowDrag: variant === "active",
        width: 140,
        
      },
      { field: "partNo", 
        headerName: "Part No", 
        headerClass: "ag-header-bold",
        width: 130 },
      {
        field: "productName",
        headerName: "Product Name",
        headerClass: "ag-header-bold",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "coo",
        headerName: "COO",
        headerClass: "ag-header-bold",
        width: 80,
      },
      {
        field: "hsCode",
        headerName: "HS Code",
        headerClass: "ag-header-bold",
        width: 130,
      },
      {
        field: "qty",
        headerName: "QTY",
        headerClass: "ag-header-bold",
        width: 90,
        type: "numericColumn",
       
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        headerClass: "ag-header-bold",
        width: 110,
        type: "numericColumn",
        valueFormatter: (p) => `$${p.value}`,
        cellStyle: { textAlign: "right" },
      },
      {
        field: "totalPriceUSD",
        headerName: "Total Price (USD)",
        headerClass: "ag-header-bold",
        width: 140,
        type: "numericColumn",
        valueFormatter: (p) => `$${p.value}`,
        cellStyle: { textAlign: "right" },
      },
      {
        field: "totalPriceSAR",
        headerName: "Total Price (SAR)",
        headerClass: "ag-header-bold",
        width: 140,
        type: "numericColumn",
        valueFormatter: (p) => `SAR ${p.value}`,
        cellStyle: { textAlign: "right" },
      },
    ],
    [variant, onDelete, onRestore]
  );

  const totalQty = data.reduce((acc, curr) => acc + curr.qty, 0);
  const totalUSD = data.reduce((acc, curr) => acc + curr.totalPriceUSD, 0);
  const totalSAR = data.reduce((acc, curr) => acc + curr.totalPriceSAR, 0);

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
        <Group gap="lg" wrap="nowrap" justify="center" style={{ overflowX: "auto" }}>
          {/* Shipment ID */}
          <Box style={{ minWidth: 120 }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Shipment ID
            </Text> */}
            <Text size="sm" fw={700} c="white">
              {shipmentId || "—"}
            </Text>
          </Box>

          {/* Timestamp */}
          <Box style={{ minWidth: 160 }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Timestamp
            </Text> */}
            <Text size="sm" fw={500} c="white">
              {timestamp || "—"}
            </Text>
          </Box>

          {/* Start Date */}
          <Box style={{ minWidth: 160 }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Start Date
            </Text> */}
            <Text size="sm" fw={500} c="white">
              {startDate || "—"}
            </Text>
          </Box>

          {/* End Date */}
          <Box style={{ minWidth: 160 }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              End Date
            </Text> */}
            <Text size="sm" fw={500} c="white">
              {endDate || "—"}
            </Text>
          </Box>

          {/* Count */}
          <Box style={{ minWidth: 60, textAlign: "center" }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Count
            </Text> */}
            <Text size="sm" fw={700} c="white">
              {count}
            </Text>
          </Box>

          {/* Country Code */}
          <Box style={{ minWidth: 60, textAlign: "center" }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Country
            </Text> */}
            <Text size="sm" fw={700} c="white">
              {countryCode}
            </Text>
          </Box>

          {/* Status */}
          <Box style={{ minWidth: 100, textAlign: "center" }}>
            {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
              Status
            </Text> */}
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
              {/* <Text size="xs" c="rgba(255,255,255,0.7)" mb={2}>
                Reference
              </Text> */}
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

      {/* Grid */}
      <div className="ag-theme-quartz data-font" style={{ width: "100%" }}>
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          rowDragManaged={variant === "active"}
          animateRows={true}
          rowSelection="multiple"
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[15, 25, 50]}
        />
      </div>
    </Box>
  );
}
