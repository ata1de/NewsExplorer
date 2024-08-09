import { Loading } from "@/components/loading"
import { Article, newsServer } from "@/server/api"
import { colors } from "@/styles/colors"
import { dayjsTransformDate } from "@/utils/dayjsTransformDate"
import { router, useLocalSearchParams } from "expo-router"
import { ArrowLeft, LinkIcon, UserCircle2 } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native"

interface ArticleProps {
    article: Article
}

export default function ArticlePage() {
    //PARAMS
    const articleParams = useLocalSearchParams<{ name: string }>().name

    //DATA
    const [article, setArticle] = useState<Article>()

    //FOMART DATE
    const date = article?.publishedAt ? dayjsTransformDate(new Date(article?.publishedAt)) : 'No publication date'

    //FUNCTIONS
    async function getTopNewsByName(currentSearch: string) { 
        try {
            const response = await newsServer.getArticleByName(currentSearch)
            setArticle(response)
        } catch (error) {
            console.log('Erro ao buscar notícias pelo nome:', error)
        }
    }

    useEffect(() => {
        getTopNewsByName(articleParams)
    }, [articleParams])

    if (!article) return (
        <Loading/>
    )

    return (
            <View className="flex-1 p-5">
                <View className="border-b border-zinc-400">
                    <View className="flex-row justify-between items-center">
                        <View className="bg-rose-100 p-2 rounded-full items-center justify-center mt-3">
                            <Pressable onPress={() => router.back()} className="flex items-center justify-center">
                                <ArrowLeft size={24} color={colors.rose[900]} />
                            </Pressable>
                        </View>

                        <View className="bg-rose-100 p-2 rounded-full items-center justify-center mt-3">
                            <Pressable onPress={() => Linking.openURL(article.url)} className="flex items-center justify-center">
                                <LinkIcon size={24} color={colors.rose[900]} />
                            </Pressable>
                        </View>
                    </View>

                    <Image source={{ uri: article.urlToImage }} className="h-60 my-6 w-[100%] rounded-xl shadow-md"/>
                </View>

                <View className="mt-5">
                    <Text className="font-bold text-2xl max-w-[95%] text-wrap leading-7">{article.title}</Text>

                    <View className="flex-row justify-between items-center mt-4">
                        <View className="flex-row gap-2 items-center justify-center">
                            <UserCircle2 size={24} color={colors.rose[900]} />
                            <Text className="text-sm max-w-[150px] text-wrap text-gray-500">{article.author}</Text>
                        </View>
                        <Text className="text-sm text-gray-500">{date}</Text>
                    </View>              
                </View>

                <ScrollView className="flex-1 mt-5 overflow-y-scroll flex-col">
                    <Text className="text-lg">{article.description}</Text>
                    
                    <Text className="text-lg mt-5">{article.content}</Text>
                </ScrollView>
            </View>
    )
}