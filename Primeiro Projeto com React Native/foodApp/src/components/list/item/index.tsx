import { Pressable, View, Image, Text } from 'react-native';
import { RestaurantsProps } from '..';

export function RestaurantItem2({item}: {item:RestaurantsProps}) {
 return (
   <Pressable className='flex flex-row items-center justify-start gap-2'>
    <Image source={{uri: item.image}} className='w-20 h-20 rounded-full'/>

    <View>
        <Text>{item.name}</Text>
    </View>
   </Pressable>
  );
}