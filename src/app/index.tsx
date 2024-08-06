import { Article, ArticleCarousel, newsServer } from "@/server/api";
import { colors } from "@/styles/colors";
import { Bell, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";

//Carousel info
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.88);  

//Carousel item
interface cardCarouselProps {
    item: {
        image: string
    }
    index: number
}

function CardCarousel({ item, index }: cardCarouselProps) {
    return (
        <View className="bg-white rounded-lg shadow-lg p-5" style={{width: ITEM_WIDTH}}>
            <Image source={{ uri: item.image }} className="h-40 w-full rounded-lg"/>
        </View>
    )
}

export default function Index() {
    // DATA
    const [news, setNews] = useState<Article[]>([])
    const [newsCarousel, setNewsCarousel] = useState<ArticleCarousel[]>([])

    // FUNCTIONS
      //fetch data
      async function fetchData() {
        try {
            const response = await newsServer.getTopNews()
            console.log(response)
            setNews(response)
        } catch (error) {
            console.log('Error in get news',error)
            throw error
        }
    }

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
        fetchData()
    },[])
    
    return (
        <View className="flex-1 px-5">
            <View className="flex-1 flex-row justify-between items-center">
                <Image source={require('../../assets/favicon.png')} className="h-16 w-16"/>

                <View className="flex-row justify-center mt-5 gap-3">
                    <View className="rounded-full bg-zinc-300 p-3">
                        <Bell color={colors.zinc[400]} className="h-8 w-8  "/>
                    </View>

                    <View className="rounded-full bg-zinc-300 p-3">
                        <Search color={colors.zinc[400]} className="h-8 w-8  rounded-full bg-zinc-300"/>
                    </View>
                </View>
            </View>

            {/* <Carousel
            
            /> */}
        </View>
    )
}