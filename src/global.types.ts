import React, { CSSProperties } from "react"

export type PropsWithClassName<T = unknown> = T & {
    readonly className?: string
    readonly style?: CSSProperties
}

export type PropsWithChildrenAndStyles<P = unknown> =
    React.PropsWithChildren<P> & PropsWithClassName

export type Email = `${string}@${string}.${string}`