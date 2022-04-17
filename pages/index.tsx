import { PlacesPhoneIcon } from 'components/icons'
import { UsersPhoneIcon } from 'components/icons'
import type { NextPage } from 'next'
import { Button, Flex, LandingCard, Layout, Stack } from '../components'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Layout title="Home | Inhaí">
      <Stack
        direction="column"
        className="px-20 py-6 h-[calc(100%-112px)] w-full"
      >
        <Stack className="child:w-1/2">
          <Stack direction="column" className="child:mb-5">
            <p className="text-6xl ">
              Discover{' '}
              <strong>
                the Best{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                  LGBTQIA+ friendly
                </span>{' '}
                Places!
              </strong>
            </p>
            <Button variant="outline" className="w-fit">
              Explore Now
            </Button>
          </Stack>
          <Flex className="justify-center">
            <Image
              src="/images/landing-page.png"
              height={432}
              width={519}
              layout="fixed"
              alt=""
            />
          </Flex>
        </Stack>

        <Stack className="w-1/2 child:mr-4">
          <LandingCard
            icon={<PlacesPhoneIcon />}
            title="60+ Places"
            description="More than 14 cities all over the world!"
          />

          <LandingCard
            icon={<UsersPhoneIcon />}
            title="400+ Users"
            description="More than 14 cities all over the world!"
          />
        </Stack>
      </Stack>
    </Layout>
  )
}

export default Home
