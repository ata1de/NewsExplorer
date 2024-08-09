import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import NewsComponent from "@/components/newsComponent";
import { newsServer, ResponseByName } from "@/server/api";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";


interface fetchDataProps {
    q: string
}

export default function Search() {
    //PARAMS
    const newsParams = useLocalSearchParams<{ name: string }>().name;

    //DATA
    const [news, setNews] = useState<ResponseByName>()
    const [inputValue, setInputValue] = useState<string>("")

    //FUNCTIONS
    async function fetchData({ q }: fetchDataProps) {
        try {
            const response = await newsServer.getTopNewsByName(q)
            setNews(response)
        } catch (error) {
            console.log('Error in get news', error)
            throw error
        }
    }

    async function handleSubmit() {
        try {
            if (inputValue.length === 0) {
                return Alert.alert('Campo vazio', 'Digite algo para pesquisar')
            }
            
            router.push({
                pathname: `/search/${inputValue}` as any,  // Cast para "any" ou "string"
                params: { name: inputValue.trim() },
            })
        } catch (error) {
            console.log('Error in search', error)
        }
    }
    
    useEffect(() => {
        fetchData({ q: newsParams })
    },[newsParams])

    if (!news) {
        return <Loading/>
    }
    return (
        <View className="flex-1 p-5">
            <View className="flex-row gap-4 justify-between items-center">
                <Pressable onPressIn={() => router.back()} className="flex bg-rose-200 mt-3 rounded-3xl p-2 items-center justify-center">
                    <ArrowLeft size={24} color={colors.rose[900]} />
                </Pressable>

                <Input className="mt-3 gap-3 flex justify-center items-center max-w-[269px]">
                    <SearchIcon size={20} color={colors.rose[900]} />
                    <Input.Field 
                        value={inputValue} 
                        onChangeText={setInputValue} 
                        placeholder="Procure uma notícia"
                        onSubmitEditing={() => handleSubmit()}
                    />
                </Input>
            </View>

            <View className="flex-1 mt-7">
                <Text className="font-bold text-lg"> <Text className="text-rose-800">{news.totalResults}</Text> Results Found for <Text className="text-rose-800">{newsParams}</Text></Text>

                <FlatList  
                    data={news.articles}
                    renderItem={({ item }) => <NewsComponent {...item} />}
                    contentContainerClassName="gap-4 mt-5"
                />

            </View>
        </View>
    )
}