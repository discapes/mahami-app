import { PropsWithChildren } from "react";
import { Text } from "react-native";


type SectionProps = PropsWithChildren<{
	text: string;
}>

export default function MyText({text}: SectionProps) {
    return(
        <Text>{text}</Text>
    )
}