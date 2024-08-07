import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import NewsComponent from "@/components/newsComponent";
import { buttons } from "@/config/buttons";
import { Article, ArticleCarousel, newsServer } from "@/server/api";
import { colors } from "@/styles/colors";
import { Bell, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';

//Carousel info
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92);  

//Carousel item
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
        <View className={`bg-white rounded-lg relative shadow-lg w-[${ITEM_WIDTH}]`} style={styles.cardCarousel}>
            <Image source={{ uri: item.urlToImage }} style={styles.image} className="h-40 w-full rounded-lg"/>

            <View className="absolute inset-0 bg-black/30 h-full w-full" />

            <View className="absolute bottom-2 left-2">
                <Text className="text-xl font-bold text-zinc-200 px-2 py-1 max-w-[95%]">{item.title}</Text>
                <Text className="text-md text-zinc-300 px-2 py-1">{item.author}</Text>
            </View>
        </View>
    )
}

export default function Index() {
    // DATA
    const [news, setNews] = useState<Article[]>([])
    const [newsCarousel, setNewsCarousel] = useState<ArticleCarousel[]>([])

    // FUNCTIONS
    //fetch data
      async function fetchData({ q }: fetchDataProps) {
        try {
            const response = await newsServer.getTopNews(q)
            setNews(response)
        } catch (error) {
            console.log('Error in get news',error)
            throw error
        }
    }

    //fetch data for carousel
    async function fetchDataCarousel() {
        try {
            const response = await newsServer.getTopNewsCarousel()
            console.log(response)
            setNewsCarousel(response)
        } catch (error) {
            console.log('Error in get news for carousel',error)
            throw error
        }
    }
    
    useEffect(() => {
        fetchDataCarousel()
        fetchData({})
    },[])

    if (!news || !newsCarousel) {
        return <Loading/>
    }
    
    return (
        <View className="flex-1 p-5">
            <View className="flex-1 border-b border-zinc-400">
                <View className="flex-row justify-between items-center">
                    <Image source={require('../../assets/favicon.png')} className="h-16 w-16"/>

                    <View className="flex-row justify-center mt-5 gap-3">
                        <View className="rounded-full bg-[#FFF7F7] p-3">
                            <Bell color={colors.rose[950]} className="h-5 w-5  "/>
                        </View>

                        <View className="rounded-full bg-[#FFF7F7] p-3">
                            <Search color={colors.rose[950]} className="h-5 w-5  rounded-full bg-zinc-300"/>
                        </View>
                    </View>
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
                    contentContainerClassName="flex-row gap-3 m-5 pb-4 flex-row justify-center items-center"                    data={buttons}
                    renderItem={({ item }) => (
                        <Button variant="primary" onPress={() => fetchData({ q:item})}>
                            <Button.Title>{item}</Button.Title>
                        </Button>   
                    )}
                    />
                    
                <FlatList
                data={news.slice(0,10)}
                renderItem={({ item }) => <NewsComponent {...item}/>}
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