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
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'

const messages = defineMessages({
  appTitle: { id: 'inhai.title' },
  explore: { id: 'inhai.landing-page.explore' },
  about: { id: 'inhai.landing-page.about' },
  aboutFirst: { id: 'inhai.landing-page.aboutFirst' },
  aboutSecond: { id: 'inhai.landing-page.aboutSecond' },
  rate: { id: 'inhai.landing-page.rate' },
  search: { id: 'inhai.landing-page.search' },
  share: { id: 'inhai.landing-page.share' },
  start: { id: 'inhai.landing-page.start' },
  getStarted: { id: 'inhai.landing-page.getStarted' },
  discover: { id: 'inhai.landing-page.discover' },
  best: { id: 'inhai.landing-page.best' },
  friendly: { id: 'inhai.landing-page.friendly' },
  places: { id: 'inhai.landing-page.places' },
  cardPlaces: { id: 'inhai.landing-page.cardPlaces' },
  cardPlacesDescription: { id: 'inhai.landing-page.cardPlaces.description' },
  cardUsers: { id: 'inhai.landing-page.cardUsers' },
  cardUsersDescription: { id: 'inhai.landing-page.cardUsers.description' },
  pageTitle: { id: 'inhai.pages.home' },
})
const Home: NextPage = () => {
  const { formatMessage } = useIntl()

  return (
    <Layout title={formatMessage(messages.pageTitle)} className="overflow-auto">
      <Stack direction="column" className="w-full h-[calc(100vh-112px)] px-20">
        <Stack className="child:w-1/2">
          <Stack direction="column" className="child:mb-6">
            <p className="text-6xl">
              {formatMessage(messages.discover)}{' '}
              <strong>
                {formatMessage(messages.best)}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
                  {formatMessage(messages.friendly)}
                </span>{' '}
                {formatMessage(messages.places)}!
              </strong>
            </p>
            <Button variant="outline" className="w-fit">
              <FormattedMessage {...messages.explore} />
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

        <Stack className="child:w-1/4 child:mr-4">
          <LandingCard
            icon={<PlacesPhoneIcon />}
            title={formatMessage(messages.cardPlaces, { number: 60 })}
            description={formatMessage(messages.cardPlacesDescription, {
              cities: 14,
            })}
          />

          <LandingCard
            icon={<UsersPhoneIcon />}
            title={formatMessage(messages.cardUsers, { number: 400 })}
            description={formatMessage(messages.cardUsersDescription, {
              users: 400,
            })}
          />
        </Stack>
      </Stack>

      <Flex className="justify-between px-20 my-4 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="prose prose-lg">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 ">
            <FormattedMessage {...messages.about} />
          </h2>
          <p className="max-w-xl mt-2">
            {formatMessage(messages['aboutFirst'])}
          </p>
          <p className="max-w-xl mt-2">
            {formatMessage(messages['aboutSecond'])}
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
            className="-mb-4"
          />
        </Flex>
      </Flex>

      <Stack className="justify-center p-6 my-12 rounded child:mr-16">
        <IconCard icon={<MapPin className="w-16 h-16 text-teal-600" />}>
          {formatMessage(messages.search)}
        </IconCard>

        <IconCard icon={<Star className="w-16 h-16 text-yellow-400" />}>
          {formatMessage(messages.rate)}
        </IconCard>

        <IconCard icon={<Share2 className="w-16 h-16 text-red-400" />}>
          {formatMessage(messages.share)}
        </IconCard>
      </Stack>

      <Flex className="px-20 child:w-1/2">
        <Flex className="justify-center">
          <Image
            src="/images/landing-search.png"
            height={432}
            width={519}
            layout="fixed"
            alt=""
          />
        </Flex>
        <Stack direction="column" className="justify-center child:mb-5">
          <p className="text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500">
              {formatMessage(messages.appTitle)}
            </span>
            , {formatMessage(messages.start)}
          </p>
          <Button className="p-20 w-fit">
            {formatMessage(messages.getStarted)}
          </Button>
        </Stack>
      </Flex>
    </Layout>
  )
}

export default Home
