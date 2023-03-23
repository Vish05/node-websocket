//import { auth } from '@/core/firebase'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Spinner } from '@chakra-ui/react'
//import { useAuthState } from 'react-firebase-hooks/auth'

export function Protected(props: { children: JSX.Element }): JSX.Element {
  //const [user, loading, error] = useAuthState(auth)

  // if (loading) {
  //   return <Spinner />
  // }

  // if (user) return props.children

  // if (error)
  //   return (
  //     <Alert status='error'>
  //       <AlertIcon />
  //       <AlertTitle>No user</AlertTitle>
  //       <AlertDescription>We have failed to log you in</AlertDescription>
  //     </Alert>
  //   )
  return <Spinner />
}
