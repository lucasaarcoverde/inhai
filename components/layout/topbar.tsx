import { useRouter } from 'next/router'
import cn from 'classnames'

import { Anchor, AnchorProps } from 'components/anchor'
import { Button } from '../button'
import { Flex } from './flex'
import { Stack } from './stack'

export function Topbar() {
  return (
    <Flex className="items-center h-24 px-20">
      <Flex className="justify-start w-full ">
        <div className="px-4 py-2 text-black bg-gray-400">Inhaí Logo</div>
      </Flex>
      <Stack className="justify-center w-full child:mr-12">
        <TopbarNavigation href="/">Home</TopbarNavigation>
        <TopbarNavigation href="/map">Map</TopbarNavigation>
        <TopbarNavigation href="/contact">Contato</TopbarNavigation>
      </Stack>
      <Stack className="justify-end w-full child:mr-5">
        <Button>Login</Button>
        <Button variant="outline">Sign Up</Button>
      </Stack>
    </Flex>
  )
}

export function TopbarNavigation(props: AnchorProps) {
  const router = useRouter()

  const className = cn({ 'text-gray-500': router.pathname !== props.href })

  return <Anchor {...props} className={className} />
}
