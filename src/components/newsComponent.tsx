import { Article } from "@/server/api";
import { colors } from "@/styles/colors";
import { Link } from "expo-router";
import { LucideBookmark } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function NewsComponent(article: Article) {
    return (
        <Link href={`/article/${article.title}` as any} className="w-full">
            <View className="w-full items-center justify-between flex-row px-4">
            <View className="flex-row gap-3">
                <Image source={{ uri: article.urlToImage }} className="rounded-2xl w-20 h-20" />

                <View className="gap-1 ml-3">
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

            <View className="ml-auto">
                <LucideBookmark color={colors.rose[950]} className="h-5 w-5"/>
            </View>
            </View>
        </Link>
    )
}