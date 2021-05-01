import * as React from 'react'
import type { RouteComponentProps } from '@reach/router'
import type { FlexProps } from '@chakra-ui/react'
import {
  Box,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  OrderedList,
  ListItem,
  Icon,
  Link,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { AiFillLinkedin, AiFillMail, AiOutlineInstagram } from 'react-icons/ai'
import { OutboundLink } from 'gatsby-plugin-gtag'

import { useMediaQuery } from '../contexts'
import { DesktopFooter } from '../components'

const AboutPage = ({
  children,
}: React.PropsWithChildren<RouteComponentProps>) => {
  const { desktop } = useMediaQuery()

  const layoutProps: FlexProps = desktop
    ? { height: 'calc(100vh - 56px)', overflowY: 'scroll' }
    : {}

  return (
    <Flex
      width="100%"
      direction="column"
      maxH="-webkit-fill-available"
      padding="6"
      fontSize="sm"
      fontWeight="medium"
      align="center"
      {...layoutProps}
    >
      {children}
      <Stack spacing="3" divider={<StackDivider />} maxWidth="600px">
        <Text fontSize="sm">
          Inhaí é uma expressão pertencente ao dialeto Pajubá e significa "E
          aí?". Esse dialeto possui termos extraídos dos grupos
          étnico-linguísticos nagô e iorubá e é bastante utilizado pela
          comunidade LGBTI+.
        </Text>
        <FaqSection title="O que são locais LGBTI+ friendly?">
          <Text>
            É qualquer lugar em que as pessoas da comunidade LGBTI+ se sentem
            seguras, aceitas e descontraídas. Seja uma padaria, academia,
            restaurante ou barzinho, são todos locais livres de preconceito e
            que não obrigatoriamente são só frequentados por pessoas da
            comunidade.
          </Text>
        </FaqSection>
        <FaqSection title="O local não está aparecendo no mapa?">
          <Text>
            O objetivo do projeto é mapear locais que são amigáveis e seguros
            para a comunidade. Sendo assim, nós exibimos no nosso mapa apenas os
            lugares com uma avaliação média acima de 3,5. Caso o local que você
            avaliou não esteja aparecendo, isso indica que é um lugar que não
            possui uma avaliação boa.
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
              Incentivar os locais a adotar medidas que contribuam para tornar o
              ambiente seguro
            </ListItem>
            <ListItem>
              Propor medidas para tornar os locais mais seguros com base nas
              avaliações
            </ListItem>
          </OrderedList>
        </FaqSection>

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
                as={OutboundLink}
                href="mailto: inhaiapp@gmail.com?subject=Contato Inhaí"
                fontWeight="bold"
                target="_blank"
              >
                <Icon boxSize="6" as={AiFillMail} />
              </Link>
              <Link
                as={OutboundLink}
                href="https://www.instagram.com/inhai.app/"
                target="_blank"
              >
                <Icon boxSize="6" as={AiOutlineInstagram} />
              </Link>
              <Link
                as={OutboundLink}
                href="https://www.linkedin.com/in/lucasaarcoverde/"
                target="_blank"
              >
                <Icon boxSize="6" as={AiFillLinkedin} />
              </Link>
            </Stack>
          </Flex>
        )}
      </Stack>
      {desktop && (
        <Box marginTop="32">
          <DesktopFooter />
        </Box>
      )}
    </Flex>
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

export default AboutPage
