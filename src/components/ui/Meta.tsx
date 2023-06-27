import React, {FC, PropsWithChildren} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

interface ISeo {
    title: string
    description?: string
    image?: string
}

export const titleMerge = (title: string) => `${title} | EasyEnglish`

const Meta: FC<PropsWithChildren<ISeo>> = ({title, description,
         image, children}) => {
    const {asPath} = useRouter()
    const currentUrl = `${process.env.APP_URL}${asPath}`
    return (
        <>
            <Head>
                <title itemProp='headline'>{titleMerge(title)}</title>
                {description ? (
                    <>
                        <meta
                            itemProp='description'
                            name='description'
                            content={description}
                        />
                        <link rel='cannonical' href={currentUrl}/>
                        <meta property='og:locale' content='en'/>
                        <meta property='og:title' content={titleMerge(title)}/>
                        <meta property='og:url' content={titleMerge(currentUrl)}/>
                        <meta property='og:description' content={description}/>
                    </>
                ) : (
                    <meta name='robots' content='noindex, nofollow'/>
                )}
            </Head>
            {children}
        </>
    )
}
export default Meta;