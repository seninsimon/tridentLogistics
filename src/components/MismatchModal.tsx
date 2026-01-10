import {
  Modal,
  Grid,
  Text,
  Group,
  Badge,
  Paper,
  Button,
  Box,
  SimpleGrid,
  Table,
  ScrollArea,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { shipment1 } from "../data";

interface MismatchModalProps {
  opened: boolean;
  onClose: () => void;
}

export function MismatchModal({ opened, onClose }: MismatchModalProps) {
  // Use same data for both demo, but pretend they are different
  const [data810] = useState(shipment1.slice(0, 10)); // Left side
  const [dataPreAlert] = useState(
    shipment1.slice(0, 10).map((item, idx) => {
      // Introduce mismatch
      if (idx === 3)
        return { ...item, unitPrice: 0, totalPriceUSD: 0, mismatch: true };
      return item;
    })
  );

  const columns = useMemo(
    () => [
      { key: "dnNo", label: "DN No", flex: true, minWidth: 120 },
      { key: "partNo", label: "Part No", flex: true, minWidth: 120 },
      { key: "qty", label: "QTY", width: 80 },
      { key: "unitPrice", label: "Unit Price", flex: true, minWidth: 100 },
      { key: "totalPriceUSD", label: "Total Price", flex: true, minWidth: 100 },
    ],
    []
  );

  const renderTable = (data: any[], highlightMismatch = false) => (
    <Table striped highlightOnHover className="mismatch-table">
      <Table.Thead>
        <Table.Tr>
          {columns.map((col) => (
            <Table.Th
              key={col.key}
              style={{
                width: col.width,
                minWidth: col.minWidth,
                flex: col.flex ? 1 : undefined,
                fontWeight: 700,
                fontSize: "13px",
                padding: "8px 10px",
              }}
            >
              {col.label}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((row, idx) => (
          <Table.Tr key={row.id || idx}>
            {columns.map((col) => (
              <Table.Td
                key={col.key}
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  padding: "6px 10px",
                  backgroundColor:
                    highlightMismatch && row.mismatch && col.key === "unitPrice"
                      ? "#ffcccc"
                      : undefined,
                }}
              >
                {row[col.key]}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="100%"
      title="Mismatch Details: 176-16684485"
      padding="lg"
    >
      {/* Header Info - Compact */}
      <Paper p="xs" withBorder mb="md" bg="gray.0">
        <SimpleGrid cols={5} spacing="xs" verticalSpacing="xs">
          <div>
            <Text size="xs" c="dimmed">
              MAWB
            </Text>
            <Text fw={500} size="sm">
              176-16684485
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">
              Weight
            </Text>
            <Text fw={500} size="sm">
              1500kg
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">
              Total Pallet
            </Text>
            <Text fw={500} size="sm">
              6
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">
              Dispatch Cntry
            </Text>
            <Text fw={500} size="sm">
              CN
            </Text>
          </div>
          <div>
            <Text size="xs" c="dimmed">
              ETD
            </Text>
            <Text fw={500} size="sm">
              15/10/2025
            </Text>
          </div>
        </SimpleGrid>
      </Paper>

      <Group justify="space-between" mb="xs" align="center">
        <Badge color="red" size="lg" variant="light">
          Mismatch Found
        </Badge>
        <Group gap="xs">
          <Button color="blue" size="xs">
            Download Report
          </Button>
          <Button color="green" size="xs">
            Sync Checked
          </Button>
        </Group>
      </Group>

      <Grid gutter="md">
        {/* Left Table: 810 */}
        <Grid.Col span={6}>
          <Box
            bg="blue.7"
            p={5}
            style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
          >
            <Text c="white" fw={700} size="sm" ta="center">
              810 Data
            </Text>
          </Box>
          <ScrollArea
            h={400}
            style={{ border: "1px solid var(--mantine-color-gray-3)" }}
          >
            {renderTable(data810, false)}
          </ScrollArea>
          <Group justify="space-between" bg="blue.0" p="xs">
            <Text size="xs">Items: {data810.length}</Text>
            <Text size="xs" fw={700}>
              Total: $3,174,871
            </Text>
          </Group>
        </Grid.Col>

        {/* Right Table: Pre Alert */}
        <Grid.Col span={6}>
          <Box
            bg="orange.7"
            p={5}
            style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
          >
            <Text c="white" fw={700} size="sm" ta="center">
              Pre Alert Data
            </Text>
          </Box>
          <ScrollArea
            h={400}
            style={{ border: "1px solid var(--mantine-color-gray-3)" }}
          >
            {renderTable(dataPreAlert, true)}
          </ScrollArea>
          <Group justify="space-between" bg="orange.0" p="xs">
            <Text size="xs">Items: {dataPreAlert.length}</Text>
            <Text size="xs" fw={700}>
              Total: $3,170,000
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
