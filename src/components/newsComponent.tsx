import { Article } from "@/server/api";
import { colors } from "@/styles/colors";
import { LucideBookmark } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function NewsComponent(article: Article) {
    return (
        <View className="w-full items-center justify-between flex-row">
            <View className="flex-row gap-3">
                <Image source={{ uri: article.urlToImage }} className="rounded-2xl w-20 h-20" />

                <View className="gap-2 ml-3">
                    <Text className="text-sm  text-zinc-700">{article.author}</Text>
                    <Text className="text-sm font-bold text-zinc-900 max-w-[71%] truncate text-wrap">{article.title}</Text>
                    <Text className="text-sm font-normal text-zinc-400">{article.publishedAt}</Text>
                </View>
            </View>

            <LucideBookmark color={colors.rose[950]} className="h-5 w-5"/>
        </View>
    )
}