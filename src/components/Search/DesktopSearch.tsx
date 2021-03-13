import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { HereItem } from '../../hooks/useHere'
import { SearchProps } from './index'

export function DesktopSearch(
  props: SearchProps & {
    setSearch: React.Dispatch<React.SetStateAction<string>>
    searchItems: HereItem[]
  }
) {
  const { onCloseSearch, isSearchOpen, setSearch } = props

  return (
    <Modal size="xl" isOpen={isSearchOpen} onClose={onCloseSearch}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Input
            placeholder="Buscar local LGBT-Friendly"
            onChange={(e) => setSearch(e.target.value)}
          />
        </ModalHeader>
      </ModalContent>
    </Modal>
  )
}
