import { Article } from "@/server/api";
import { colors } from "@/styles/colors";
import { dateFormat } from "@/utils/dateFormat";
import { LucideBookmark } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function NewsComponent(article: Article) {

    const publishedAt = dateFormat(article.publishedAt)
    return (
        <View className="w-full items-center justify-between flex-row px-4">
            <View className="flex-row gap-3">
                <Image source={{ uri: article.urlToImage }} className="rounded-2xl w-20 h-20" />

                <View className="ml-3">
                    <Text className="text-sm  text-zinc-700 max-w-[71%]">{article.author}</Text>
                    <Text className="text-sm font-bold text-zinc-900 max-w-[71%] max-h-10 truncate text-wrap">{article.title}</Text>
                    <Text className="text-sm font-normal text-zinc-400 max-w-[71%]">{publishedAt}</Text>
                </View>
            </View>

            <View className="ml-auto">
                <LucideBookmark color={colors.rose[950]} className="h-5 w-5"/>
            </View>
        </View>
    )
}