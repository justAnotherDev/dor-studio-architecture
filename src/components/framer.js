import React, { useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavContext } from "../context/NavContext"

const Transition = ({ children, location }) => {
  const [navContext,] = useContext(NavContext)

  const duration = 0.35

  const variants = {
    initial: {
      opacity: 0,
      x: -200
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      x: 200,
      transition: { duration: duration },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        key={navContext}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Transition