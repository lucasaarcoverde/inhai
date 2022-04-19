import { PlacesPhoneIcon } from 'components/icons'
import { UsersPhoneIcon } from 'components/icons'
import type { NextPage } from 'next'
import {
  Button,
  Flex,
  IconCard,
  LandingCard,
  LandingPlaceCard,
  Layout,
  Stack,
} from '../components'
import Image from 'next/image'
import { MapPin, Star, Share2 } from 'react-feather'

const Home: NextPage = () => {
  return (
    <Layout title="Home | Inhaí" className="overflow-auto">
      <Stack direction="column" className="w-full h-[calc(100vh-112px)] px-20">
        <Stack className="child:w-1/2">
          <Stack direction="column" className="child:mb-6">
            <p className="text-6xl">
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
              src="/images/landing-main.png"
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

      <Flex className="justify-between px-20 my-4 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="prose prose-lg">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 ">
            About The Project
          </h2>
          <p className="max-w-xl mt-2">
            An LGBTQIA+ place is any place where people from the community feel
            safe, accepted and relaxed. It can be a bakery, restaurant, gym, or
            a bar, all of them are places free of prejudice and with diversity
            among the people who frequent those places.
          </p>
          <p className="max-w-xl mt-2">
            Our mission is to map several places, in a colaborativelly way,
            along with the community and help to build a more secure, diverse,
            and inclusive world.
          </p>
        </div>

        <Flex className="flex-col h-96 w-128">
          <LandingPlaceCard
            place="Bar do Nilson"
            rate={4.8}
            className="-mt-8"
          />
          <LandingPlaceCard
            place="Burgiff"
            rate={5.0}
            position="end"
            className="-mt-2"
          />
          <LandingPlaceCard
            place="Bar do Nilson"
            rate={4.8}
            className="-mt-8"
          />
        </Flex>
      </Flex>

      <Stack className="justify-center p-6 my-12 rounded child:mr-16">
        <IconCard icon={<Star className="w-16 h-16 text-yellow-400" />}>
          Join Inhaí community and start rating places
        </IconCard>

        <IconCard icon={<MapPin className="w-16 h-16 text-teal-600" />}>
          Get to know the places better before visiting them
        </IconCard>

        <IconCard icon={<Share2 className="w-16 h-16 text-red-400" />}>
          Share your experiences with the community
        </IconCard>
      </Stack>

      <Flex className="child:w-1/2">
        <Flex className="justify-center">
          <Image
            src="/images/landing-search.png"
            height={432}
            width={519}
            layout="fixed"
            alt=""
          />
        </Flex>
        <Stack direction="column" className="child:mb-6">
          <p className="text-5xl">
            Lets start it now just search by a known place!
          </p>
          <Button className="p-20">Get Started</Button>
        </Stack>
      </Flex>
    </Layout>
  )
}

export default Home
