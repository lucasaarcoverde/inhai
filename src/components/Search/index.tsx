import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useMediaQueryContext } from '../../contexts'
import { useAuth } from '../../contexts/firebase'
import useFirebase from '../../hooks/useFirebase'
import useHere, { HereItem } from '../../hooks/useHere'
import { Autocomplete } from './components/Autocomplete'

import { MobileSearch } from './MobileSearch'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])
  const [loading, setLoading] = useState(false)
  const { onClose, isOpen, onOpen } = useDisclosure()
  const { user, setUser } = useAuth()
  const { db } = useFirebase()

  const { setSearchedItem } = props
  const [queryValue] = useDebounce(query, 400)

  const { discoverAddress } = useHere()

  useEffect(() => {
    if (!user) return

    if (!user.currentLocation) onOpen()

    const at = user.currentLocation
      ? `${user.currentLocation.lat},${user.currentLocation.lng}`
      : undefined

    if (queryValue.length > 0) {
      discoverAddress({
        q: queryValue,
        at: at,
      })
        .then(({ items }) => setItems(items))
        .catch((e) => console.log('err', e))
    } else {
      setItems([])
    }
  }, [queryValue, user])

  const { desktop } = useMediaQueryContext()

  return (
    <Box>
      {desktop ? (
        <Flex
          width="100%"
          justifyContent="flex-start"
          shadow="-3px 4px 6px -4px rgba(0, 0, 0, 0.1), 0 2px 0px -1px rgba(0, 0, 0, 0.06)"
        >
          <Autocomplete
            setSearchedItem={setSearchedItem}
            minWidth="300px"
            maxWidth="350px"
            setSearch={setQuery}
            searchValue={query}
            searchItems={items}
          />
        </Flex>
      ) : (
        <MobileSearch
          {...props}
          setSearch={setQuery}
          searchValue={query}
          searchItems={items}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Localização</ModalHeader>
          <ModalBody>
            Ter sua localização nos ajudará a realizar uma busca mais precisa.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              variant="outline"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              colorScheme="teal"
              isLoading={loading}
              onClick={() => {
                setLoading(true)
                try {
                  navigator.geolocation.getCurrentPosition(
                    ({ coords: { latitude: lat, longitude: lng } }) => {
                      if (user) {
                        db.collection('users')
                          .doc(user.id)
                          .update({
                            currentLocation: { lat, lng },
                          })
                          .then(() => {
                            setUser({
                              ...user,
                              currentLocation: { lat, lng },
                            })
                            onClose()
                            setLoading(false)
                          })
                      }
                    },
                    () => onClose()
                  )
                } catch (e) {
                  console.log(e)
                  onClose()
                  setLoading(false)
                }
              }}
            >
              Compartilhar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export interface SearchProps {
  isSearchOpen?: boolean
  onCloseSearch?: () => void
  setSearchedItem: React.Dispatch<React.SetStateAction<HereItem>>
}
