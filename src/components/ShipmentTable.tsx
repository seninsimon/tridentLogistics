import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  type ColDef,
} from "ag-grid-community";
import { Box, Group, Badge, Text } from "@mantine/core";
// import { IconTrash, IconRotateClockwise } from "@tabler/icons-react";

ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

interface ShipmentTableProps {
  data: any[];
  shipmentId?: string;
  mauwb?: string;
  date?: string;
  variant?: "active" | "deleted";
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
}

export function ShipmentTable({
  data,
  shipmentId,
  variant = "active",
  onDelete,
  onRestore,
}: ShipmentTableProps) {
  const colDefs: ColDef[] = useMemo(
    () => [
      {
        field: "dnNo",
        headerName: "DN No",
        rowDrag: variant === "active",
        width: 140,
      },
      { field: "partNo", headerName: "Part No", width: 130 },
      {
        field: "productName",
        headerName: "Product Name",
        flex: 1,
        minWidth: 200,
      },
      { field: "coo", headerName: "COO", width: 80 },
      { field: "hsCode", headerName: "HS Code", width: 130 },
      {
        field: "qty",
        headerName: "QTY",
        width: 90,
        type: "numericColumn",
        cellStyle: { textAlign: "right" },
        headerClass: "ag-right-aligned-header",
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        width: 110,
        type: "numericColumn",
        valueFormatter: (p) => `$${p.value}`,
        cellStyle: { textAlign: "right" },
        headerClass: "ag-right-aligned-header",
      },
      {
        field: "totalPriceUSD",
        headerName: "Total Price (USD)",
        width: 140,
        type: "numericColumn",
        valueFormatter: (p) => `$${p.value}`,
        cellStyle: { textAlign: "right" },
        headerClass: "ag-right-aligned-header",
      },
      {
        field: "totalPriceSAR",
        headerName: "Total Price (SAR)",
        width: 140,
        type: "numericColumn",
        valueFormatter: (p) => `SAR ${p.value}`,
        cellStyle: { textAlign: "right" },
        headerClass: "ag-right-aligned-header",
      },
      // {
      //   headerName: "Actions",
      //   width: 90,
      //   cellRenderer: (params: any) => (
      //     <ActionIcon
      //       color={variant === "active" ? "red" : "green"}
      //       variant="subtle"
      //       size="sm"
      //       onClick={() => {
      //         if (variant === "active" && onDelete) {
      //           onDelete(params.data.id);
      //         } else if (variant === "deleted" && onRestore) {
      //           onRestore(params.data.id);
      //         }
      //       }}
      //     >
      //       {variant === "active" ? (
      //         <IconTrash size="0.9rem" />
      //       ) : (
      //         <IconRotateClockwise size="0.9rem" />
      //       )}
      //     </ActionIcon>
      //   ),
      // },
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
      {/* Header */}
      <Group
        justify="space-between"
        bg={variant === "active" ? "blue.7" : "gray.7"}
        p="xs"
        gap="xs"
        c="white"
      >
        <Group gap="xs">
          <Text fw={700} size="sm">
            {shipmentId || "Deleted Items"}
          </Text>
          {variant === "active" && (
            <>
              <Badge color="cyan" variant="white" size="sm">
                15/10/2025
              </Badge>
              <Badge color="orange" variant="white" size="sm">
                Import
              </Badge>
            </>
          )}
        </Group>
      </Group>

      {/* Summary Row */}
      <Group
        bg="blue.0"
        p={5}
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
        justify="flex-end"
        gap="md"
      >
        <Text size="xs" fw={500}>
          Items: {data.length}
        </Text>
        <Text size="xs" fw={500}>
          Total Qty: {totalQty}
        </Text>
        <Text size="xs" fw={500}>
          Total USD: ${totalUSD.toLocaleString()}
        </Text>
        <Text size="xs" fw={500}>
          Total SAR: {totalSAR.toLocaleString()}
        </Text>
      </Group>

      {/* Grid */}
      <div className="ag-theme-quartz" style={{ width: "100%" }}>
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
