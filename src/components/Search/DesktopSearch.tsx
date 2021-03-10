import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { SearchProps } from './index'

export function DesktopSearch(props: SearchProps) {
  const { onCloseSearch, isSearchOpen } = props

  return (
    <Modal size="xl" isOpen={isSearchOpen} onClose={onCloseSearch}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Input placeholder="Buscar local LGBT-Friendly" />
        </ModalHeader>
      </ModalContent>
    </Modal>
  )
}
