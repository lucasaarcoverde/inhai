import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slide,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useMediaQuery } from '../../contexts'
import { useAuth } from '../../contexts/firebase'
import useFirebase from '../../hooks/useFirebase'
import type { HereItem } from '../../hooks/useHere'
import useHere from '../../hooks/useHere'
import { Autocomplete } from './components/Autocomplete'

export function Search(props: SearchProps) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<HereItem[]>([])

  const [loading, setLoading] = useState(false)
  const { onClose, isOpen, onOpen } = useDisclosure()
  const { desktop } = useMediaQuery()
  const { user, setUser } = useAuth()
  const { db } = useFirebase()

  const { setSearchedItem, isSearchOpen, onCloseSearch } = props
  const [queryValue] = useDebounce(query, 400)

  const { discoverAddress } = useHere()

  useEffect(() => {
    if (!user) return

    if (!user.currentLocation && (isSearchOpen || desktop)) return onOpen()

    if (isOpen) return
    let cancelled = false

    const at = user.currentLocation
      ? `${user.currentLocation.lat},${user.currentLocation.lng}`
      : undefined

    if (queryValue.length > 0) {
      discoverAddress({
        q: queryValue,
        at,
      }).then(({ items: hereItems }) => {
        if (!cancelled) {
          setItems(hereItems)
        }
      })
    } else if (!cancelled) {
      setItems([])
    }

    return () => {
      cancelled = true
    }
  }, [queryValue, user, isSearchOpen, isOpen])

  const handleClose = () => {
    if (user) {
      db.collection('users')
        .doc(user.id)
        .update({
          currentLocation: { lat: -7.23072, lng: -35.8817 },
        })
        .then(() => {
          setUser({
            ...user,
            currentLocation: { lat: -7.23072, lng: -35.8817 },
          })
          onClose()
          setLoading(false)
        })
        .finally(() => onClose())
    }
  }

  return (
    <>
      {desktop ? (
        <Box shadow="xl" zIndex={15}>
          <Autocomplete
            setSearchedItem={setSearchedItem}
            height="calc(100vh - 168px)"
            width="100%"
            maxW="25vw"
            marginTop="112px"
            setSearch={setQuery}
            searchValue={query}
            searchItems={items}
            queryValue={queryValue}
          />
        </Box>
      ) : (
        <Slide
          direction="bottom"
          in={isSearchOpen}
          style={{
            zIndex: 15,
            margin: 0,
            maxWidth: '100vw',
            maxHeight: '-webkit-fill-available',
            height: '100vh',
          }}
        >
          <Autocomplete
            setSearchedItem={setSearchedItem}
            setSearch={setQuery}
            searchValue={query}
            searchItems={items}
            queryValue={queryValue}
            onCloseSearch={onCloseSearch}
          />
        </Slide>
      )}
      <Modal isOpen={isOpen} onClose={handleClose} isCentered size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Localização</ModalHeader>
          <ModalBody>
            Ter sua localização nos ajudará a realizar uma busca mais precisa.
            Gostaria de compartilhá-la?
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              variant="outline"
              onClick={handleClose}
            >
              Não
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
    </>
  )
}

export interface SearchProps {
  isSearchOpen?: boolean
  onCloseSearch?: () => void
  setSearchedItem: React.Dispatch<React.SetStateAction<HereItem>>
}
