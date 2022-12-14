import {
  ActionIcon,
  Container,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconUser,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Logo } from "../shared";
import { useStyles } from "./styles";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  const session = useSession();
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  if (!session) return null;
  return (
    <header>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={classes.header}
      >
        <Container className={classes.mainSection}>
          <Group position="apart">
            <Logo />

            <Group>
              {/* color scheme toggle */}
              <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.yellow[4]
                      : theme.colors.blue[6],
                })}
              >
                {colorScheme === "dark" ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoonStars size={18} />
                )}
              </ActionIcon>

              <Menu
                width={260}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7}>
                      <Image
                        src={session.data?.user?.image as string}
                        alt={session.data?.user?.name as string}
                        width={25}
                        height={25}
                        style={{ borderRadius: "100%" }}
                      />
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1 }}
                        mr={3}
                        className={classes.userName}
                      >
                        {session.data?.user?.name as string}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={
                      <IconUser
                        size={14}
                        color={theme.colors.gray[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconSettings
                        size={14}
                        color={theme.colors.gray[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    icon={
                      <IconLogout
                        size={14}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                    onClick={() => signOut()}
                  >
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </motion.div>
    </header>
  );
};
