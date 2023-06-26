'use client'
import { useContext, useEffect, useState } from 'react'
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import useCreatePlaylist from '@/hooks/Api/useCreatePlaylist'
import { LeveLs } from '@/protocols'
import { UserCard } from '@/components/UserCard/UserCard'

export default function Page() {
  const { userDataFromSession, status, session, token } =
    useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
    /* eslint-disable-next-line */
  }, [status])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [url, setUrl] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [tag, setTag] = useState<string>('')
  const [level, setLevel] = useState<LeveLs>('JUNIOR')
  const [disabled, setDisabled] = useState<boolean>(false)
  const { createPlaylist } = useCreatePlaylist({
    level,
    link: url,
    tags: tagList,
    email: session?.user?.email || '',
    token,
  })

  // console.log(playlist)
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
    setLevel('JUNIOR')
    onOpenChange()
  }
  function handleCrate() {
    setDisabled(true)
    createPlaylist()
      .then(() => {
        setTag('')
        setTagList([])
        setUrl('')
        setDisabled(false)
      })
      .catch(() => {
        setDisabled(false)
      })
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
                    isDisabled={disabled}
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
                    isDisabled={disabled}
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
                    className="no-scrollbar  my-8 overflow-y-auto"
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
                  Level
                  <Dropdown className="border-2 border-white-300 border-opacity-10 bg-transparent backdrop-blur-3xl">
                    <DropdownTrigger>
                      <Button
                        color="default"
                        variant="bordered"
                        className="capitalize"
                        isDisabled={disabled}
                      >
                        {level.toLocaleLowerCase()}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="bordered" disabledKeys={[level]}>
                      <DropdownItem
                        variant="solid"
                        className="capitalize"
                        color="default"
                        key="JUNIOR"
                        onClick={() => setLevel('JUNIOR')}
                      >
                        junior
                      </DropdownItem>
                      <DropdownItem
                        variant="solid"
                        className="capitalize"
                        key="PLENO"
                        onClick={() => setLevel('PLENO')}
                      >
                        pleno
                      </DropdownItem>
                      <DropdownItem
                        variant="solid"
                        className="capitalize"
                        key="SENIOR"
                        onClick={() => setLevel('SENIOR')}
                      >
                        senior
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    size="sm"
                    onPress={handleCancel}
                    isDisabled={disabled}
                  >
                    CANCEL
                  </Button>
                  <Button
                    color="success"
                    size="sm"
                    onPress={handleCrate}
                    isDisabled={disabled}
                  >
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
