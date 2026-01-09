import {
  AppShell,
  Burger,
  Group,
  Text,
  Avatar,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { IconBell, IconSettings } from "@tabler/icons-react";
import logo from "./assets/Trident-Saudi-Logo.jpg";

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="0"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <img
          src={logo}
          alt="Trident Saudi"
          style={{ width: "100%", maxWidth: "150px", display: "block" }}
        />
          </Group>
          <Group>
            <Group gap="xs" visibleFrom="sm">
              <IconBell size="1.2rem" color="gray" />
              <IconSettings size="1.2rem" color="gray" />
            </Group>
            <UnstyledButton>
              <Group gap="xs">
                <Avatar radius="xl" size="sm" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    Ashwin M
                  </Text>
                  <Text c="dimmed" size="xs">
                    Admin
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        <Dashboard />
      </AppShell.Main>
    </AppShell>
  );
}
