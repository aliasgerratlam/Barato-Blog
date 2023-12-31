import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../logo-barato.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const toast = useToast();

  return (
    <>
      <Box bg={useColorModeValue("gray.800", "gray.900")} px={4}>
        <Container maxWidth="container.xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? "<CloseIcon />" : "<HamburgerIcon />"}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Link to="/">
                  <Image src={Logo} maxW="200px" alt="Logo" />
                </Link>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              ></HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  onClick={(e) =>
                    isAuthenticated ? null : navigate("/signin")
                  }
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                {isAuthenticated ? (
                  <MenuList>
                    <MenuItem>
                      <Link to={"/add"}>Add Blog</Link>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logout();
                        toast({
                          title: "Sign out successfully!",
                          status: "error",
                          duration: 4000,
                          isClosable: true,
                        });
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                ) : null}
              </Menu>
            </Flex>
          </Flex>
        </Container>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
