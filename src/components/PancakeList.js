import * as React from "react";
import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {shuffle} from "lodash";
import {pancakeSort, isSorted} from "../effects/pancakeSort";

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
};

const PancakeList = (props) => {
    const [colors, setColors] = useState([]);
    const [checkSorted, setCheckSorted] = useState(false);

    /*
    * setInterval will call function on every t (i.e props.timeInterval) seconds
    * */
    useEffect(() => {
        const IntervalID = setInterval(() => {
            if (colors.length > 0) {
                if (isSorted(colors)) {
                    setCheckSorted(true);
                } else {
                    setCheckSorted(false);
                    setColors([...pancakeSort(colors)]);
                }
            } else {
                console.log('Pancake number should be > 0')
            }
        }, props.timeInterval);
        return () => clearInterval(IntervalID);
    }, [colors]);

    /*
    * It will call props.response()
    * if pancakes are sorted
    * */
    useEffect(() => {
        if (checkSorted) {
            props.response();
        }
    }, [checkSorted]);

    useEffect(() => {
        setColors(shuffle(Array.from(new Array(props.numOfPancakes), (val, index) => index + 1)));
    }, []);

    /*
    * Shows Rainbow colors
    * @return HEX code of Color
    * */
    const rainbowStop = (i) => {
        let h = i * 0.2025;
        let f = (n, k = (n + h * 12) % 12) => .5 - .5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');
        return (rgb2hex(f(0), f(8), f(4)));
    }

    /*
    * set Height of the pancakes
    * @return height
    * */
    const getDynamicHeight = (i) => {
        if (props.numOfPancakes < 15) {
            return '30px'
        } else {
            return (Math.floor(window.innerHeight / props.numOfPancakes) - 10)
        }
    }

    return (
        <ul>
            {colors.map(item => (
                <motion.li
                    key={item}
                    data-key={item}
                    layoutTransition={spring}
                    style={{width: 10 * item, backgroundColor: rainbowStop(item), height: getDynamicHeight()}}
                />
            ))}
        </ul>
    );
};

export default PancakeList;
