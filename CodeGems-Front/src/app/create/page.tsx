'use client'
import { useContext, useEffect, useState } from 'react'
import { UserCard } from '../[userId]/page'
import {
  Button,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { UserContext } from '@/contexts/userContext'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { userDataFromSession, status } = useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
    /* eslint-disable-next-line */
  }, [status])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [url, setUrl] = useState('')
  const [tagList, setTagList] = useState<string[]>(['next'])
  const [tag, setTag] = useState<string>('')
  function removeTag(tag: string) {
    setTagList(tagList.filter((tg) => tg !== tag))
  }
  function handleTagInput(e: KeyboardEvent) {
    e.key === 'Enter' && setTagList([...tagList, tag])
    e.key === 'Enter' && setTag('')
  }

  function handleCancel() {
    setTag('')
    setTagList([])
    setUrl('')
  }
  return (
    <>
      <div className="relative z-0 h-full min-h-[50.3rem] w-full border-y-4 border-white-100 border-opacity-5 pb-12 drop-shadow-lg backdrop-blur-sm xl:rounded-3xl xl:border-4">
        <Button onPress={onOpen} className="ms-16 mt-3 capitalize">
          create new playlist
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="uppercase">
                  create new playlist
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <Input
                    isRequired
                    type="url"
                    label="Youtube Playlist URL"
                    variant="bordered"
                    value={url}
                    onValueChange={setUrl}
                    labelPlacement="outside"
                    className="mt-8"
                  ></Input>
                  <Input
                    type="string"
                    label="Tag List"
                    variant="bordered"
                    value={tag}
                    onValueChange={setTag}
                    onSubmit={() => setTagList([...tagList, tag])}
                    onKeyDown={(e) =>
                      handleTagInput(e as unknown as KeyboardEvent)
                    }
                    isClearable
                    labelPlacement="outside"
                    onClear={() => setTag('')}
                    className="no-scrollbar mt-8 overflow-y-auto"
                    startContent={
                      <>
                        <div className="max-w-1/2 flex overflow-hidden">
                          {tagList.map((tg) => (
                            <Chip key={tg} onClose={() => removeTag(tg)}>
                              {tg}
                            </Chip>
                          ))}
                        </div>
                      </>
                    }
                  ></Input>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" size="sm" onPress={handleCancel}>
                    CANCEL
                  </Button>
                  <Button color="success" size="sm">
                    CREATE
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <UserCard
        user={userDataFromSession.userData}
        mock={userDataFromSession.loadingUser || !!userDataFromSession.userErro}
      />
    </>
  )
}
