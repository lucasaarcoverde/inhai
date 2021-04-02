import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Center,
  Box,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'
import Img from 'gatsby-image'

import { DefaultFooter, Layout } from '../components'
import { ReactNode } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const AboutUsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "well-done.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Flex
        width="100%"
        direction="column"
        height="100vh"
        maxH="-webkit-fill-available"
        padding="6"
      >
        {children}
        <Stack spacing="3" divider={<StackDivider />}>
          <FaqSection title="Sobre mim">
            Me chamo Lucas Arcoverde, sou de Campina Grande, na paraíba, e
            atualmente estou cursando o meu último período em Ciência da
            Computação pela Universidade Federal de Campina Grande.
          </FaqSection>
          <FaqSection title="Motivação">
            Esse projeto está sendo feito para o meu trabalho de conclusão de
            curso e tem como dois principais objetivos:
            <OrderedList marginTop="2">
              <ListItem>
                Tornar transparente para a comunidade LGBTQI+ que há sim locais
                em que podemos nos sentir nós mesmos sem nenhum medo ou receio..
              </ListItem>
              <ListItem>
                Criar um ambiente colaborativo em que a gente pode avaliar e
                expor nossa opinião sobre locais que frequentamos.
              </ListItem>
            </OrderedList>
          </FaqSection>
          <FaqSection title="Locais LGBTQI+ friendly">Vem aí...</FaqSection>
        </Stack>
        <Center width="100%" paddingBottom="72px">
          <Box width="100%" maxWidth="400px">
            <Img fluid={data.file.childImageSharp.fluid} alt="Loading image" />
          </Box>
        </Center>
        <Spacer />
        <DefaultFooter />
      </Flex>
    </Layout>
  )
}

function FaqSection(props: FaqProps) {
  const { children, title } = props

  return (
    <Stack width="100%" spacing="1">
      <Heading fontSize="xl" color="teal">
        {title}
      </Heading>
      <Text fontSize="sm" fontWeight="medium">
        {children}
      </Text>
    </Stack>
  )
}

interface FaqProps {
  children: ReactNode
  title: string
}

export default AboutUsPage
