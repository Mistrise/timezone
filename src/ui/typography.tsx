import React from 'react';
import {PropsWithChildrenAndStyles} from "@/global.types";

export const HeadingH1 = (props: PropsWithChildrenAndStyles) => (
    <h1
        style={{ fontWeight: '400', fontSize: "29px", lineHeight: "34px", ...props.style }}
    >
        {props.children}
    </h1>
)

export const HeadingH2 = (props: PropsWithChildrenAndStyles) => (
    <h2
        style={{ fontWeight: '400', fontSize: "22px", lineHeight: "25px", ...props.style }}
    >
        {props.children}
    </h2>
)

export const HeadingH3 = (props: PropsWithChildrenAndStyles) => (
    <h3
        style={{ fontWeight: '400', fontSize: "16px", lineHeight: "18px", ...props.style }}
    >
        {props.children}
    </h3>
)

export const BasicText = (props: PropsWithChildrenAndStyles) => (
    <p
        style={{fontWeight: "400", fontSize: "16px", lineHeight: "18px", ...props.style }}
    >
        {props.children}
    </p>
)

export const SmallText = (props: PropsWithChildrenAndStyles) => (
    <p
        style={{ fontWeight: "500", fontSize: "14px", lineHeight: "20px", ...props.style }}
    >
        {props.children}
    </p>
)