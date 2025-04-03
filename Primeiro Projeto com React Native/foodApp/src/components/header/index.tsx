import { View, Pressable, Text } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Header(){
    return (
        <View className="w-full items-center justify-between flex flex-row mb-4 mt-2">
            <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <Ionicons name="menu" size={20} color="#121212"/>
            </Pressable>

            <View className="flex flex-col justify-center items-center">
                <Text className="text-center text-sm text-slate-800">Localização</Text>
                <View className="gap-1 flex-row justify-center items-center">
                    <Feather name="map-pin" size={14} color="#FF0000"/>
                    <Text className="text-lg font-bold">Campo Grande</Text>
                </View>
            </View>

            <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <Feather name="bell" size={20} color="#121212"/>
            </Pressable>
        </View>
    );
}