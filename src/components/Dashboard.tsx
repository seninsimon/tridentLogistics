import {
  Container,
  Grid,
  Select,
  TextInput,
  Group,
  Button,
  Title,
  Paper,
  ScrollArea,
  Box,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconSearch,
  IconDownload,
  // IconUpload,
  IconRefresh,
} from "@tabler/icons-react";
import { ShipmentTable } from "./ShipmentTable";
import { shipment1, shipment2 } from "../data";
import { useState } from "react";
import { MismatchModal } from "./MismatchModal";

export function Dashboard() {
  const [opened, setOpened] = useState(false);
  const [direction, setDirection] = useState<string | null>("Inbound");
  const [mawb, setMawb] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // State for shipments to allow deletion/restoration
  const [activeShipments1, setActiveShipments1] = useState(shipment1);
  const [activeShipments2, setActiveShipments2] = useState(shipment2);
  const [, setDeletedItems] = useState<any[]>([]);

  const handleDelete = (id: string, source: "list1" | "list2") => {
    if (source === "list1") {
      const item = activeShipments1.find((i) => i.id === id);
      if (item) {
        setActiveShipments1((prev) => prev.filter((i) => i.id !== id));
        setDeletedItems((prev) => [
          ...prev,
          { ...item, originalSource: "list1" },
        ]);
      }
    } else {
      const item = activeShipments2.find((i) => i.id === id);
      if (item) {
        setActiveShipments2((prev) => prev.filter((i) => i.id !== id));
        setDeletedItems((prev) => [
          ...prev,
          { ...item, originalSource: "list2" },
        ]);
      }
    }
  };

  // handleRestore removed as deleted table is hidden

  // Filter logic applied to current state
  const filterData = (data: any[]) => {
    let result = data;

    // 1. MAWB / Search Term
    if (mawb) {
      result = result.filter(
        (item) =>
          item.dnNo.toLowerCase().includes(mawb.toLowerCase()) ||
          item.productName.toLowerCase().includes(mawb.toLowerCase())
      );
    }

    // 2. Date (Placeholder logic as before)
    if (fromDate || toDate) {
      // Logic would go here
    }

    return result;
  };

  const filteredShipment1 = filterData(activeShipments1);
  const filteredShipment2 = filterData(activeShipments2);

  // We are keeping the state logic but purposefully NOT rendering the deleted items table per request.

  return (
    <Container
      fluid
      p="sm" // Reduced padding
      bg="gray.0"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Title order={4} mb="sm" c="blue.9">
        Pre-Alert Management
      </Title>

      {/* Filter Bar */}
      <Paper p="xs" shadow="xs" radius="md" mb="md">
        <Grid align="end" gutter="xs">
          <Grid.Col span={{ base: 12, md: 2 }}>
            <Select
              label="Direction"
              data={["Inbound", "Outbound"]}
              value={direction}
              onChange={setDirection}
              size="xs"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2 }}>
            <TextInput
              label="MAWB"
              placeholder="176-..."
              value={mawb}
              onChange={(e) => setMawb(e.currentTarget.value)}
              size="xs"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2 }}>
            <DateInput
              label="From"
              placeholder="DD/MM/YYYY"
              value={fromDate}
              onChange={(d: any) => setFromDate(d)}
              size="xs"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 2 }}>
            <DateInput
              label="To"
              placeholder="DD/MM/YYYY"
              value={toDate}
              onChange={(d: any) => setToDate(d)}
              size="xs"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Group justify="flex-end" gap="xs">
              <Button
                leftSection={<IconSearch size={14} />}
                variant="filled"
                color="blue"
                size="xs"
                onClick={() => {
                
                }}
              >
                Search
              </Button>
              <Button
                leftSection={<IconDownload size={14} />}
                variant="outline"
                color="teal"
                size="xs"
              >
                Export
              </Button>
              <Button
                leftSection={<IconRefresh size={14} />}
                variant="light"
                color="orange"
                size="xs"
                onClick={() => setOpened(true)}
              >
                Compare
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
        
      </Paper>

      {/* Tables Area */}
      <ScrollArea style={{ flex: 1 }}>
        {(direction === "Inbound" || !direction) && (
          <>
            {/* --- Table Group 1 --- */}
            <Box mb="sm">
              <ShipmentTable
                data={filteredShipment1}
                shipmentId="176-16884485"
                timestamp="15/10/2025 13:24:46"
                startDate="15/10/2025 00:00:00"
                endDate="15/10/2025 00:00:00"
                count={1}
                countryCode="CN"
                status="Uploaded"
                referenceNo="BK019092"
                variant="active"
                onDelete={(id) => handleDelete(id, "list1")}
                
              />
            </Box>

            {/* --- Table Group 2 --- */}
            <Box mb="sm">
              <ShipmentTable
                data={filteredShipment2}
                shipmentId="176-16406143"
                timestamp="08/10/2025 09:28:11"
                startDate="07/10/2025 00:00:00"
                endDate="07/10/2025 00:00:00"
                count={2}
                countryCode="CN"
                status="Uploaded"
                referenceNo="BK018987"
                variant="active"
                onDelete={(id) => handleDelete(id, "list2")}
              />
            </Box>
          </>
        )}
      </ScrollArea>

      <MismatchModal opened={opened} onClose={() => setOpened(false)} />
    </Container>
  );
}
