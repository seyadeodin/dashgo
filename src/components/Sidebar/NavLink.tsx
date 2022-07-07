import { Icon, Link as ChakraLink, LinkProps, Text } from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps{
  icon: ElementType; 
  //element type is used when we pass a component as a reference {}
  children: ReactNode;
  href: string;
}

export function NavLink({ icon, children, href, ...rest}: NavLinkProps){
  return(
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20"/> 
        <Text ml="4" as='a' fontWeight="medium" >{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}