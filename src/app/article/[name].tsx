import { Loading } from "@/components/loading"
import { Article, newsServer } from "@/server/api"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"

interface ArticleProps {
    article: Article
}

export default function ArticlePage() {
    //PARAMS
    const articleParams = useLocalSearchParams<{ name: string }>().name

    //DATA
    const [article, setArticle] = useState<Article>()

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
            <View className="w-full items-center justify-between flex-row px-4">
                <View className="flex-row gap-3">
                    <Image source={{ uri: article.urlToImage }} className="rounded-2xl w-20 h-20" />

                    <View className="gap-2 ml-3">
                        <Text className="text-sm text-zinc-700 max-w-[72%] overflow-hidden text-ellipsis whitespace-nowrap max-h-6">
                            {article.author}
                        </Text>
                        <Text className="text-sm font-bold text-zinc-900 max-w-[72%] overflow-hidden text-ellipsis max-h-10">
                            {article.title}
                        </Text>
                        <Text className="text-sm font-normal text-zinc-400 max-w-[72%] overflow-hidden text-ellipsis whitespace-nowrap max-h-6">
                            {article.publishedAt}
                        </Text>
                    </View>
                </View>
            </View>
    )
}