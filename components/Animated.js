import React from "react";
import { motion } from "framer-motion";

export default function Animated(props) {
    return (
        <motion.div initial="hidden" animate="visible" variants={
            {
                hidden:{
                    opacity:0
                },
                visible:{
                    opacity:1,
                    transition:{
                        duration:.6,
                    }
                },
            }
        }>
            {props.children}
        </motion.div>
    )
}