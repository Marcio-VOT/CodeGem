import Image from 'next/image'
import { FaGithubAlt } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { MdFeaturedPlayList, MdPlaylistAdd, MdSettings } from 'react-icons/md'
import { signIn, signOut } from 'next-auth/react'
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Button,
  Spacer,
  CardFooter,
} from '@nextui-org/react'

export default function Dropdown({
  userIcon,
  userName,
  userEmail,
  loginStatus,
}: {
  userIcon: string
  userName: string
  userEmail: string
  loginStatus: boolean
}) {
  return (
    <>
      <Card className="absolute -right-4 top-full z-50 mt-2 w-screen border-2 border-search-border-600 sm:right-0 sm:w-[22rem] sm:rounded-lg">
        {loginStatus && (
          <>
            <CardHeader className="flex gap-3">
              <Image
                alt={userName}
                height={40}
                src={userIcon}
                width={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-md">{userName}</p>
                <p className="text-sm text-default-500">{userEmail}</p>
              </div>
            </CardHeader>
            <Divider />
          </>
        )}

        <CardBody>
          <Button
            onPress={() => console.log('a')}
            variant="ghost"
            color="primary"
            isDisabled={!loginStatus}
            startContent={<MdFeaturedPlayList size={19} />}
          >
            Your Play Lists
          </Button>
          <Spacer x={0.5} />
          <Button
            isDisabled={!loginStatus}
            onPress={() => console.log('a')}
            variant="ghost"
            color="success"
            startContent={<MdPlaylistAdd size={25} />}
          >
            New Play List
          </Button>
          <Spacer x={0.5} />
          <Button
            isDisabled={!loginStatus}
            onPress={() => console.log('a')}
            variant="ghost"
            color="default"
            startContent={<MdSettings size={20} />}
          >
            Settings
          </Button>
        </CardBody>
        <Divider />
        <CardFooter className="flex w-full justify-evenly ">
          {loginStatus ? (
            <Button
              className="w-full"
              color="danger"
              variant="ghost"
              onPress={() => signOut({ redirect: false })}
            >
              {' '}
              Log Out
            </Button>
          ) : (
            <>
              <Spacer x={1} />
              <Button
                color="primary"
                startContent={<FcGoogle />}
                onPress={() => signIn('google', { redirect: false })}
                className="w-full bg-white-100 font-bold text-[#4285F4]"
              >
                {' '}
                Google
              </Button>
              <Spacer x={1} />
              <Button
                startContent={<FaGithubAlt />}
                onPress={() => signIn('github', { redirect: false })}
                className="w-full"
              >
                {' '}
                GitHub
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
