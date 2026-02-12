import { useState, useEffect } from "react";
import { NoteName, Note, Color, Chord, Position, NoteMappings, StaffProps, SVGColors } from "../types";
import { NoteButton } from "./noteButton";


const noteMappings: NoteMappings = {
    "F3": 10,
    "G3": 9,
    "A3": 8,
    "B3": 7,
    "C4": 6,
    "D4": 5,
    "E4": 4,
    "F4": 3,
    "G4": 2,
    "A4": 1,
    "B4": 0,
    "C5": -1,
    "D5": -2,
    "E5": -3,
    "F5": -4,
    "G5": -5,
    "A5": -6,
    "B5": -7,
    "C6": -8,
    "D6": -9,
    "E6": -10,
}

export function Staff({chords, numOfOutsideLines, width, showNoteNames, clef, showColors}: StaffProps) {

    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setHeight(250 + (75 * numOfOutsideLines));
    }, [numOfOutsideLines]);

    const [realWidth, setRealWidth] = useState<string>("0px");

    useEffect(() => {
        if (width) {
            setRealWidth(width);
        } else {
            setRealWidth("100%");
        }
    }, []);

    const mapNotesToYPositions = (chords: Chord[]) => {
        let positions : Position[] = [];
        for (const [i, chord] of chords.entries()) {
            for (const note of chord) {
                positions.push(
                    {x: 230 + (100 * i),
                     y: ((height / 2) + noteMappings[note.nm] * 18),
                     notesAboveMiddleLine: noteMappings[note.nm], 
                     label : showNoteNames ? (note.label ? note.label : null) : null,
                     color: showColors ? (note.color ? note.color : "note") : "note",
                     onNoteClick: note.onClick ? note.onClick : undefined
                    }
                );
            }
        }
        return positions;
    }

    //const [reload, setReload] = useState<boolean>(false);
    const [notePositions, setNotePositions] = useState<Position[]>([]);


    useEffect(() => {
        if (height === 0) return;
        setNotePositions(mapNotesToYPositions(chords));
    }, [chords, height]);

    const [noteNames, setNoteNames] = useState<Boolean>(false);

    useEffect(() => {
        if (showNoteNames === true) {
            setNoteNames(true);
        }
    }, []);

    const [clefName, setClefName] = useState<string>("none");

    useEffect(() => {
        setClefName(clef);
    }, []);




    const renderNotes = (positions: Position[]) => {


        return positions.map((p, i) => {
            const maskId = `noteMask-${i}`;

            return (
            <svg key={i}>
                <NoteButton
                    x={p.x}
                    y={p.y}
                    notesAboveMiddleLine={p.notesAboveMiddleLine}
                    label={p.label}
                    color={p.color}
                    onClick={p.onNoteClick}
                    maskId={maskId}
                    showNoteName={showNoteNames}
                    heightOfStaff={height}
                ></NoteButton>
            </svg>
            );
        });
    }

    return (
        <div style={{height: `${height}px`, width: `${width}`}}>
            <svg
                className="w-full h-full"
                viewBox={`0 0 1200 ${height}`}
            >
                <rect x="0" y={(height / 2) - 2 * 36} width="1200" height="143" fill="var(--surface)" />
                <line x1="0" y1={(height / 2) + 2 * 36} x2="1200" y2={(height / 2) + 2 * 36} stroke="black" />
                <line x1="0" y1={(height / 2) + 1 * 36} x2="1200" y2={(height / 2) + 1 * 36} stroke="black" />
                <line x1="0" y1={(height / 2) + 0 * 36} x2="1200" y2={(height / 2) + 0 * 36} stroke="black" />
                <line x1="0" y1={(height / 2) - 1 * 36} x2="1200" y2={(height / 2) - 1 * 36} stroke="black" />
                <line x1="0" y1={(height / 2) - 2 * 36} x2="1200" y2={(height / 2) - 2 * 36} stroke="black" />
                {renderNotes(notePositions)}
                {clef === "treble" &&
                    <svg x="40" y={(height/2) - 233/2} width="110" height="256" viewBox={`0 0 115 ${height}`} fill="none" stroke="black" strokeWidth="5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M45.1654 95.5C31.3206 105.276 16.6393 128.91 15.6402 148.462C14.3415 173.877 24.4312 193.055 43.6223 207.118C54.027 214.743 65.1785 213.9 69.9092 213.542C70.6324 213.487 71.2056 213.444 71.603 213.444C69.9128 203.1 67.3375 191.14 64.7161 178.966C62.758 169.873 60.8251 160.66 59.1654 151.912C58.6379 152.229 58.0916 152.459 57.2246 152.734C54.7372 153.526 51.0563 154.697 47.3521 159.388C43.8206 164.47 44.9702 167.755 45.6301 169.641C45.717 169.89 45.7953 170.114 45.8535 170.314C46.8954 173.913 51.7373 179.467 54.7391 182.91C57.0443 185.554 58.2643 186.953 55.8443 185.266C53.756 183.81 51.6662 182.815 49.6756 181.867C45.4759 179.866 41.7175 178.076 39.3452 172.614C37.8466 169.164 32.079 153.351 57.2246 143C53.7065 125.16 48.3359 106.836 45.1654 95.5ZM45.1654 95.5C46.2022 94.6048 47.7966 93.5813 48.713 92.6364M48.713 92.6364C52.0107 104.177 56.141 123.043 60.6342 142.168C71.2849 139.946 83.096 139.005 87.5742 140.411C93.0691 142.136 111.3 151.025 113.55 174.34C115.639 195.983 88.9299 212.032 77.1654 216C79.1089 225.615 80.0952 231.506 80.0952 232.996C80.0952 243.347 71.6644 267.5 38.1337 267.5C11.0617 267.5 4.66444 242.389 3.66535 231.846C3.66535 231.846 -1.83473 227 1.66526 220.5C5.16525 214 15.1654 211.87 20.1653 216C25.1652 220.13 30.1653 228.636 21.1654 236C15.6654 240.5 8.16528 235 8.16528 235C10.996 240.751 15.3234 261.174 34.1374 261.174C52.9515 261.174 72.6635 250.248 75.5994 232.996C74.8695 228.295 73.2384 222.58 72.3296 216.979C59.8075 218.129 55.6102 219.77 29.6418 208.844C24.5083 206.684 14.8349 196.161 9.14638 183.541C4.23326 172.641 3.73441 144.964 6.14891 135.235C9.37588 122.233 10.5211 117.734 18.6375 103.032C22.7889 95.5116 30.1513 86.8553 37.3887 79.9341C30.8817 66.9677 28.8826 29.0531 41.6306 12.1716C47.2759 4.69566 52.6086 -0.524163 60.6132 0.670357C70.608 2.16189 76.1193 10.0954 77.5833 19.6475C79.5584 32.5339 78.5925 38.0149 76.5843 44.9503C75.524 48.6121 72.3464 58.5143 64.5953 70.2531C62.845 72.9038 61.2856 75.4098 59.8074 77.7853C56.1129 83.7224 53.104 88.1087 48.713 92.6364ZM100.562 173.19C106.387 191.758 89.9701 205.391 76.2059 211.601C72.9373 195.696 67.822 173.143 62.7483 151.198C77.2767 148.761 93.2411 149.851 100.562 173.19ZM71.0893 32.874C73.8882 23.7937 66.2901 8.30624 60.6132 9.29638C45.3435 11.9597 42.9198 30.9056 41.8628 39.1688C41.7786 39.8264 41.7032 40.4163 41.6306 40.925C40.8032 46.7227 39.3094 64.2914 42.2761 75.2165C44.1954 73.307 45.7824 71.7497 47.8372 70.1484C55.2145 64.3996 63.3184 58.0846 71.0893 32.874Z" stroke="#171717"/>
                    </svg>
                }

            </svg>
        </div>
    );
}