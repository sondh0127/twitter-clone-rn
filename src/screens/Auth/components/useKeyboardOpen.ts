import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };
  return isKeyboardOpen;
};

export default useKeyboardOpen;
