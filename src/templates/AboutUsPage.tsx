import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  OrderedList,
  ListItem,
  FlexProps,
  Grid,
  Icon,
  Link,
} from '@chakra-ui/react'

import { Sidebar } from '../components'
import { ReactNode } from 'react'
import { useMediaQuery } from '../contexts'
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai'

const AboutUsPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 112px)', overflowY: 'scroll' }
    : {}

  return (
    <Grid templateColumns={desktop ? '1fr 2fr 1fr' : '1fr'}>
      {desktop && <Sidebar />}
      <Flex
        width="100%"
        direction="column"
        maxH="-webkit-fill-available"
        padding="6"
        fontSize="sm"
        fontWeight="medium"
        {...layoutProps}
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
                Mostrar pra a comunidade LGBTI+ que há sim locais em que é
                possível se sentir você mesmo sem nenhum medo ou receio
              </ListItem>
              <ListItem>
                Criar um ambiente colaborativo em que se possa avaliar os locais
                que frequentamos
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
        {!desktop && (
          <Flex
            direction="column"
            align="center"
            marginTop="8"
            paddingBottom="6"
            justifyContent="center"
          >
            <Stack direction="row" spacing="3" color="gray.400">
              <Link
                href="mailto: inhaiapp@gmail.com"
                fontWeight="bold"
                target="_blank"
              >
                <Icon boxSize="6" as={AiFillMail} />
              </Link>
              <Link
                href="https://github.com/lucasaarcoverde"
                fontWeight="bold"
                target="_blank"
              >
                <Icon boxSize="6" as={AiFillGithub} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/lucasaarcoverde/"
                target="_blank"
              >
                <Icon boxSize="6" as={AiFillLinkedin} />
              </Link>
            </Stack>
          </Flex>
        )}
      </Flex>
    </Grid>
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
