import { NavLink, Stack, Text, ScrollArea } from "@mantine/core";
import {
  IconBriefcase,
  IconFileInvoice,
  IconShip,
  IconSettings,
  IconTruckDelivery,
  IconFileTypePdf,
  IconCalculator,
} from "@tabler/icons-react";


const data = [
  { label: "Booking", icon: IconShip },
  { label: "Credit Booking Note", icon: IconFileInvoice },
  { label: "Job Master", icon: IconBriefcase },
  { label: "Bulk Invoice Generation", icon: IconFileTypePdf },
  { label: "BookingNote Deletion", icon: IconSettings },
  { label: "Invoice for Job Card", icon: IconFileInvoice },
  { label: "Mass Job Closing", icon: IconSettings },
  { label: "Job Delinking", icon: IconSettings },
  { label: "Invoice Dispatching", icon: IconTruckDelivery },
  { label: "Approval Cancellation", icon: IconSettings },
  { label: "Upload Pre-Alert", active: true, icon: IconShip }, // Active one
  { label: "Direct Pre-Alert Upload", icon: IconShip },
  { label: "Carrier2", icon: IconBriefcase },
  { label: "Month Closing", icon: IconCalculator },
  { label: "Bill of Exit", icon: IconFileTypePdf },
  { label: "Import Declaration", icon: IconFileTypePdf },
];

export function Sidebar() {
  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={item.active}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      variant="light"
      color={item.active ? "blue" : "gray"}
      onClick={() => {}}
      styles={{
        root: { padding: "8px 12px", borderRadius: "6px", marginBottom: "4px" },
        label: { fontWeight: 500 },
      }}
    />
  ));

  return (
    <Stack gap={0} p="md" style={{ height: "100%" }}>
      <Text size="xs" fw={700} c="dimmed" mb="sm" tt="uppercase">
        Operation
      </Text>
      <ScrollArea style={{ flex: 1 }}>{items}</ScrollArea>
    </Stack>
  );
}
