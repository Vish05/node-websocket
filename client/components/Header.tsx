import { Heading, HStack, useColorModeValue } from '@chakra-ui/react'
import { Menu } from './Menu'

export const Header = ({ name }: any) => {
  return (
    <>
      <HStack
        py={9}
        px={9}
        borderBottom='3px solid'
        borderColor={useColorModeValue('gray.100', 'gray.600')}
        justify='space-between'
      >
        <HStack gap={2}>
          <Heading size='lg'>{name}</Heading>
        </HStack>
        <HStack>
          <Menu />
        </HStack>
      </HStack>
    </>
  )
}
