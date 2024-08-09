import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import NewsComponent from "@/components/newsComponent";
import { buttons } from "@/config/buttons";
import { Article, ArticleCarousel, newsServer } from "@/server/api";
import { colors } from "@/styles/colors";
import { Link, router } from "expo-router"; // Importar router do expo-router
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';

// Carousel info
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92);  

// Carousel item
interface cardCarouselProps {
    item: {
        urlToImage: string,
        title: string,
        author: string
    }
    index: number
}

interface fetchDataProps {
    q?: string
}

function CardCarousel({ item }: cardCarouselProps) {

    return (
        <Link href={`/article/${item.title}`} className="flex-1">
            <View className={`bg-white rounded-lg relative shadow-lg w-[${ITEM_WIDTH}]`} style={styles.cardCarousel}>
                <Image source={{ uri: item.urlToImage }} style={styles.image} className="h-40 w-full rounded-lg"/>

                <View className="absolute inset-0 bg-black/30 h-full w-full" />

                <View className="absolute bottom-2 left-2">
                    <Text className="text-xl font-bold text-zinc-200 px-2 py-1 max-w-[95%]">{item.title}</Text>
                    <Text className="text-md text-zinc-300 px-2 py-1">{item.author}</Text>
                </View>
            </View>
        </Link>
    )
}

export default function Index() {
    // DATA
    const [inputValue, setInputValue] = useState<string>("")
    const [news, setNews] = useState<Article[]>([])
    const [newsCarousel, setNewsCarousel] = useState<ArticleCarousel[]>([])
    const [dropdown, setDropdown] = useState<boolean>(false)

    // FUNCTIONS
    // fetch data
    async function fetchData({ q }: fetchDataProps) {
        try {
            const response = await newsServer.getTopNews(q)
            setNews(response)
        } catch (error) {
            console.log('Error in get news', error)
            throw error
        }
    }

    // fetch data for carousel
    async function fetchDataCarousel() {
        try {
            const response = await newsServer.getTopNewsCarousel()
            setNewsCarousel(response)
        } catch (error) {
            console.log('Error in get news for carousel', error)
            throw error
        }
    }

    async function handleSubmit() {
        try {
            if (inputValue.length === 0) {
                return Alert.alert('Campo vazio', 'Digite algo para pesquisar')
            }
            
            // Navegar para a nova página
            router.push({
                pathname: `/search/${inputValue}` as any,  // Cast para "any" ou "string"
                params: { name: inputValue },
            });
            
            
        } catch (error) {
            console.log('Error in search', error)
        }
    }
    
    useEffect(() => {
        fetchDataCarousel()
        fetchData({})
    }, [])

    if (!news || !newsCarousel) {
        return <Loading/>
    }
    
    return (
        <View className="flex-1 p-5">
            <View className="flex-1 border-b border-zinc-400">
                <View className="flex-row justify-between items-center">
                    <Image source={require('../../assets/favicon.png')} className="h-16 w-16"/>

                    <Input className="mt-3 gap-3 flex justify-center items-center max-w-[250px]">
                        <Search size={16} color={colors.rose[900]} />
                        <Input.Field 
                            value={inputValue} 
                            onChangeText={setInputValue} 
                            placeholder="Procure uma notícia"
                            onPressIn={() => setDropdown(true)}
                            onSubmitEditing={() => handleSubmit()}
                        />
                    </Input>
                </View>

                <View style={styles.container} className="flex-1">
                    <Carousel
                        width={SLIDER_WIDTH}
                        autoFillData={true}
                        autoPlayInterval={3000}
                        autoPlay={true}
                        loop
                        data={newsCarousel}
                        renderItem={CardCarousel}
                    />
                </View>
            </View>
            
            <View className="flex-1 mt-3">
                <FlatList
                    horizontal
                    contentContainerClassName="flex-row gap-3 m-5 pb-4 flex-row justify-center items-center"                    
                    data={buttons}
                    renderItem={({ item }) => (
                        <Button variant="primary" onPress={() => fetchData({ q: item })}>
                            <Button.Title>{item}</Button.Title>
                        </Button>   
                    )}
                />
                    
                <FlatList
                    data={news.slice(0, 10)}
                    renderItem={({ item }) => <NewsComponent {...item} />}
                    contentContainerClassName="gap-4 mt-4"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    cardCarousel: {
        width: ITEM_WIDTH,
    },
    image: {
        height: 200,
    }
})
