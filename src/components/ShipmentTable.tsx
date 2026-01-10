import { useMemo, useState } from "react";
import { Box, Group, Text, Table, Pagination, Select } from "@mantine/core";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<string>("15");

  const pageSizeNum = parseInt(pageSize, 10);
  const totalPages = Math.ceil(data.length / pageSizeNum);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSizeNum;
    const end = start + pageSizeNum;
    return data.slice(start, end);
  }, [data, page, pageSizeNum]);

  const totalQty = data.reduce((acc, curr) => acc + curr.qty, 0);
  const totalUSD = data.reduce((acc, curr) => acc + curr.totalPriceUSD, 0);
  const totalSAR = data.reduce((acc, curr) => acc + curr.totalPriceSAR, 0);

  const columns = [
    { key: "dnNo", label: "DN No", width: 140 },
    { key: "partNo", label: "Part No", width: 130 },
    { key: "productName", label: "Product Name", flex: true, minWidth: 200 },
    { key: "coo", label: "COO", width: 80 },
    { key: "hsCode", label: "HS Code", width: 130 },
    { key: "qty", label: "QTY", width: 90, align: "right" as const },
    {
      key: "unitPrice",
      label: "Unit Price",
      width: 110,
      align: "right" as const,
      format: (v: number) => `$${v}`,
    },
    {
      key: "totalPriceUSD",
      label: "Total Price (USD)",
      width: 140,
      align: "right" as const,
      format: (v: number) => `$${v}`,
    },
    {
      key: "totalPriceSAR",
      label: "Total Price (SAR)",
      width: 140,
      align: "right" as const,
      format: (v: number) => `SAR ${v}`,
    },
  ];

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

      {/* Table */}
      <Box style={{ overflowX: "auto" }}>
        <Table
          striped
          highlightOnHover
          withTableBorder={false}
          className="shipment-table"
        >
          <Table.Thead>
            <Table.Tr>
              {columns.map((col) => (
                <Table.Th
                  key={col.key}
                  style={{
                    width: col.width,
                    minWidth: col.minWidth,
                    flex: col.flex ? 1 : undefined,
                    textAlign: col.align || "left",
                    fontWeight: 600,
                    fontSize: "13px",
                    padding: "8px 12px",
                    backgroundColor: "var(--mantine-color-gray-0)",
                  }}
                >
                  {col.label}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedData.map((row, idx) => (
              <Table.Tr key={row.id || idx}>
                {columns.map((col) => (
                  <Table.Td
                    key={col.key}
                    style={{
                      textAlign: col.align || "left",
                      fontSize: "12px",
                      padding: "6px 12px",
                    }}
                  >
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>

      {/* Pagination */}
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
              setPage(1);
            }}
            size="xs"
            style={{ width: 70 }}
            withCheckIcon={false}
          />
        </Group>
        <Group gap="xs">
          <Text size="xs" c="dimmed">
            {(page - 1) * pageSizeNum + 1}-
            {Math.min(page * pageSizeNum, data.length)} of {data.length}
          </Text>
          <Pagination
            total={totalPages}
            value={page}
            onChange={setPage}
            size="xs"
            withEdges
          />
        </Group>
      </Group>
    </Box>
  );
}
