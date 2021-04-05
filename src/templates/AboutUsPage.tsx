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
import { useMediaQueryContext } from '../contexts'

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

  const { desktop } = useMediaQueryContext()
  return (
    <Layout>
      <Flex
        width="100%"
        direction="column"
        height="calc(100vh - 56px)"
        maxH="-webkit-fill-available"
        padding="6"
        fontSize="sm"
        fontWeight="medium"
      >
        {children}
        <Stack spacing="3" divider={<StackDivider />}>
          <FaqSection title="O que são locais LGBTI+ friendly?">
            <Text>
              É qualquer lugar em que as pessoas da comunidade LGBTI+ se sentem
              seguras, aceitas e descontraídas. Seja uma padaria, academia,
              restaurante ou barzinho, são todos locais livres de preconceito e
              que não obrigatoriamente são só frequentados por pessoas da
              comunidade.
            </Text>
          </FaqSection>
          <FaqSection title="O que fazemos com as avaliações">
            <Text>
              A ideia desse projeto é que consigamos mapear locais LGBTI+
              friendly na cidade de forma colaborativa e tornar fácil a
              visualização desses lugares para as pessoas da comunidade.
            </Text>
            <Text>
              Também pretendemos entrar em contato com locais avaliados
              negativamente, enviando todas as avaliações de forma anônima e
              assim podemos incentivá-los a adotarem medidas que melhorem sua
              avaliação.
            </Text>
          </FaqSection>
          <FaqSection title="Sobre o desenvolvimento">
            <Text>
              Me chamo Lucas Arcoverde, sou de Campina Grande, na Paraíba.
              Atualmente estou cursando o meu último período em Ciência da
              Computação pela Universidade Federal de Campina Grande (UFCG).
            </Text>
            <Text>
              Este projeto está sendo feito para o meu trabalho de conclusão de
              curso e tem os seguintes objetivos:
            </Text>
            <OrderedList paddingX="6">
              <ListItem>
                Mostrar pra a comunidade LGBTI+ que há sim locais em que podemos
                nos sentir nós mesmos sem nenhum medo ou receio
              </ListItem>
              <ListItem>
                Criar um ambiente colaborativo em que a gente possa avaliar e
                expor nossa opinião sobre os locais que frequentamos
              </ListItem>
              <ListItem>
                Incentivar os locais a adotar medidas que contribuam para tornar
                o ambiente seguro
              </ListItem>
              <ListItem>
                Propor medidas para tornar os locais mais seguros com base nas
                avaliações
              </ListItem>
            </OrderedList>
          </FaqSection>
        </Stack>
        <Center width="100%" paddingBottom="72px">
          <Box width="100%" maxWidth="400px">
            <Img fluid={data.file.childImageSharp.fluid} alt="Loading image" />
          </Box>
        </Center>
        <Spacer />
        {!desktop && <DefaultFooter />}
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
      {children}
    </Stack>
  )
}

interface FaqProps {
  children: ReactNode
  title: string
}

export default AboutUsPage
