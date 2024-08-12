import { colors } from "@/styles/colors"
import clsx from "clsx"
import { ReactNode } from "react"
import { Platform, TextInput, TextInputProps, View, ViewProps } from "react-native"

type Variants = 'primary' | 'secondary' | 'tertiary'

type InputProps = ViewProps & {
    children: ReactNode
    variant?: Variants
}

function Input({children, variant = 'primary', className}: InputProps) {
    return <View
    className={clsx('flex-row items-center justify-center rounded-lg p-2 border-rose-900 border bg-rose-50', 
        className
    )}
    >{children}</View>
}


function Field ({...props}: TextInputProps) {
    return <TextInput
    className="flex-1 text-rose-950 text-lg font-regular pb-1"
    placeholderTextColor={colors.zinc[400]}
    cursorColor={colors.zinc[100]}
    selectionColor={Platform.OS === 'ios' ? colors.zinc[100] : undefined}
    {...props}
    />
}

Input.Field = Field

export { Input }

