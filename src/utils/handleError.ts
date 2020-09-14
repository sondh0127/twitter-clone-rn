import { Alert } from 'react-native'

const handleError = (e: { title: string; message: string }) => {
  Alert.alert(e.title, e.message)
}

export default handleError
