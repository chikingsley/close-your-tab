import type React from 'react';
import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface CloseTabModalProps {
  visible: boolean;
  venueName: string;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export const CloseTabModal: React.FC<CloseTabModalProps> = ({
  visible,
  venueName,
  onClose,
  onConfirm,
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const numericAmount = parseFloat(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    onConfirm(numericAmount);
    setAmount('');
    setError('');
  };

  const handleCancel = () => {
    setAmount('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mx-6 w-full max-w-sm shadow-xl">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Close Tab
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 mb-6">
            Enter your total at {venueName}
          </Text>

          <View className="flex-row items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 mb-2">
            <Text className="text-2xl text-gray-500 dark:text-gray-400 mr-2">$</Text>
            <TextInput
              className="flex-1 text-2xl font-bold text-gray-900 dark:text-white"
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                setError('');
              }}
              autoFocus
            />
          </View>

          {error ? (
            <Text className="text-red-500 text-sm mb-4">{error}</Text>
          ) : (
            <View className="h-6 mb-4" />
          )}

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 py-3 rounded-full border border-gray-300 dark:border-gray-600"
            >
              <Text className="text-center text-gray-700 dark:text-gray-300 font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              className="flex-1 py-3 rounded-full bg-blue-500"
            >
              <Text className="text-center text-white font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
