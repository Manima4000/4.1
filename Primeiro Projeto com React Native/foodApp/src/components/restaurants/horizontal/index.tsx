import { View,Text, Pressable, Image } from 'react-native';
import { RestaurantsProps } from '..';

export function RestaurantItem({item}: {item:RestaurantsProps}) {
 return (
   <Pressable className="flex flex-col items-center justify-center" onPress={() => console.log("Clicou no restaurante")}>
    <Image source={{uri: item.image}} className='rounded-full h-20 w-20'/>
    <Text className='text-sm mt-2 text-center w-20 leading-4 text-black' numberOfLines={2}>{item.name}</Text>
   </Pressable>
  );
}