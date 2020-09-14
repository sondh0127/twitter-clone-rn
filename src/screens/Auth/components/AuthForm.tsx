import { MaterialIcons } from '@expo/vector-icons';
import CenterSpinner from 'components/CenterSpinner';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface AuthFormnProps {
  type: 'signup' | 'login';
  submit: (values: FormValues) => void;
  isLoading: boolean;
}

export interface FormValues {
  username: string;
  password: string;
}

const AuthForm: React.FC<AuthFormnProps> = ({ submit, type, isLoading }) => {
  const { control, handleSubmit, errors } = useForm<FormValues>();

  const buttonText = type === 'signup' ? 'SIGN UP' : 'LOG IN';

  return (
    <View style={styles.container}>
      <View style={styles.textboxWrapper}>
        <View style={styles.labelWrapper}>
          <MaterialIcons name="mail-outline" size={14} style={styles.labelIcon} />
          <Text style={styles.labelText}> Username </Text>
        </View>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.textbox}
              placeholder="Username"
              placeholderTextColor="#808389"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="username"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.username && <Text>This is required.</Text>}
      </View>
      <View style={styles.textboxWrapper}>
        <View style={styles.labelWrapper}>
          <MaterialIcons name="lock-outline" size={13} style={styles.labelIcon} />
          <Text style={styles.labelText}> Password </Text>
        </View>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.textbox}
              placeholder="Password"
              placeholderTextColor="#808389"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && <Text>This is required.</Text>}
      </View>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={handleSubmit(submit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <CenterSpinner />
        ) : (
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{buttonText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textboxWrapper: {
    height: 60,
    width: 340,
    fontSize: 50,
    marginBottom: 20,
  },
  textbox: {
    backgroundColor: '#D5CEE7',
    borderRadius: 7,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 13,
    height: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 340,
    backgroundColor: '#39235A',
    marginBottom: 30,
    borderRadius: 20,
  },
  labelWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 13,
  },
  labelIcon: {
    marginRight: 5,
  },
});

export default AuthForm;
