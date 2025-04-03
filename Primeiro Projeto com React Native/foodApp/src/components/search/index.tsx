import { View,TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function Search() {
 return (
   <View className='w-full flex-row h-14 items-center bg-transparent rounded-full gap-2 px-4 border border-slate-500'>
        <Feather name='search' size={24} color="#64748b"/>
        <TextInput placeholder='Procure sua comida...' className='w-full h-full flex-1 bg-red-50 bg-transparent'/>
   </View>
  );
}