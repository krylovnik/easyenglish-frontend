import React, {FC, useState} from 'react';
import s from "./ProcessedBookText.module.css"
import WordPopover from "@/src/components/screens/book/popover/WordPopover";
import {translateWithApi} from "@/src/services/translation/translation";

type ProcessedBookTextProps = {
    text: string;
};
const ProcessedBookText: FC<ProcessedBookTextProps> = ({text}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);
    const [selectedWord, setSelectedWord] = useState('')
    const [translate , setTranslate] = useState('')
    const wordsWithPunctuation = text.match(/[\w']+|[.,!?;:]/g);


    const handleWordClick = async (word: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setSelectedWord(word)
        setAnchorEl(event.currentTarget)
        const translatedText = await translateWithApi(word)
        setTranslate(translatedText)
    }
    return (
        <div style={{textIndent:"3rem"}}>
            {wordsWithPunctuation && wordsWithPunctuation.map((word, index) => (
                <React.Fragment key={index}>
                    {index > 0 && ' '}
                    {/[.,!?;:]/.test(word) ? (
                        word
                    ) : (
                        <span className={s.hoveredWord}
                            onClick={(event) => handleWordClick(word,event)}
                        >{word}</span>
                    )}

                </React.Fragment>
            ))}
            <WordPopover anchorEl={anchorEl}
                         setAnchorEl={setAnchorEl}
                         word={selectedWord}
                         translate={translate}
                         setSelectedWord={setSelectedWord}
                         setTranslate={setTranslate} />
        </div>
    );
};

export default ProcessedBookText;