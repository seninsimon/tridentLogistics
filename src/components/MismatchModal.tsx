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
} from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  type ColDef,
} from "ag-grid-community";
import { useMemo, useState } from "react";
import { shipment1 } from "../data";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

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

  const colDefs: ColDef[] = useMemo(
    () => [
      { field: "dnNo", headerName: "DN No", flex: 1, minWidth: 120 },
      { field: "partNo", headerName: "Part No", flex: 1, minWidth: 120 },
      { field: "qty", headerName: "QTY", width: 80 },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        flex: 1,
        minWidth: 100,
        cellStyle: (params) =>
          params.data.mismatch ? { backgroundColor: "#ffcccc" } : null,
      },
      {
        field: "totalPriceUSD",
        headerName: "Total Price",
        flex: 1,
        minWidth: 100,
      },
    ],
    []
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
          <div
            className="ag-theme-quartz mismatch-grid"
            style={{ height: "400px", width: "100%" }}
          >
            <AgGridReact rowData={data810} columnDefs={colDefs} />
          </div>
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
          <div
            className="ag-theme-quartz mismatch-grid"
            style={{ height: "400px", width: "100%" }}
          >
            <AgGridReact rowData={dataPreAlert} columnDefs={colDefs} />
          </div>
          <Group justify="space-between" bg="orange.0" p="xs">
            <Text size="xs">Items: {dataPreAlert.length}</Text>
            <Text size="xs" fw={700}>
              Total: $3,170,000
            </Text>
          </Group>
        </Grid.Col>
      </Grid>

      {/* <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </Group> */}
    </Modal>
  );
}
