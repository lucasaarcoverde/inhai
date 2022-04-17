import { Anchor } from 'components/anchor'
import { Button } from '../button'
import { Flex } from './flex'
import { Stack } from './stack'

export function Topbar() {
  return (
    <Flex className="items-center h-24 px-20">
      <Flex className="justify-start w-full ">
        <div className="px-4 py-2 text-black bg-gray-400">Inhaí Logo</div>
      </Flex>
      <Stack className="justify-around w-full ">
        <Anchor href="/">Home</Anchor>
        <Anchor href="/map">Map</Anchor>
        <Anchor href="/about">About</Anchor>
      </Stack>
      <Stack className="justify-end w-full child:mr-4">
        <Button>Login</Button>
        <Button variant="outline">Sign Up</Button>
      </Stack>
    </Flex>
  )
}
