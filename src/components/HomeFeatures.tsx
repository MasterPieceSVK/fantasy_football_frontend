import ChipIcon from "./icons/ChipIcon";
import Football from "./icons/Football";
import TrophyIcon from "./icons/TrophyIcon";
import { motion } from "framer-motion";

export default function HomeFeatures() {
  return (
    <div>
      <div className="hidden flex-wrap items-center h-full xl:flex  mb-4 gap-9">
        <motion.div
          className="flex flex-col items-center "
          animate={{
            scale: [1, 1.2, 1.2, 1, 1, 1],
          }}
          transition={{ duration: 0.8 }}
        >
          <TrophyIcon size={250} />
          <h3 className="text-2xl text-center">Leaderboards</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
        <motion.div
          className="flex flex-col items-center justify-center "
          animate={{
            scale: [1, 1, 1.2, 1.2, 1, 1],
          }}
          transition={{ duration: 0.8 }}
        >
          <Football />
          <h3 className="text-2xl text-center">Real Matches</h3>
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          animate={{
            scale: [1, 1, 1, 1.2, 1.2, 1],
          }}
          transition={{ duration: 0.8 }}
        >
          <ChipIcon />
          <h3 className="text-2xl text-center">Fantasy Betting</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
      </div>
      <div className="hidden md:flex xl:hidden flex-wrap items-center justify-evenly h-full  mb-4 gap-9">
        <motion.div
          className="flex flex-col items-center "
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TrophyIcon size={250} />
          <h3 className="text-2xl text-center">Leaderboards</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
        <motion.div
          className="flex flex-col items-center justify-center "
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Football />
          <h3 className="text-2xl text-center">Real Matches</h3>
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ChipIcon />
          <h3 className="text-2xl text-center">Fantasy Betting</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
      </div>
      <div className="flex md:hidden flex-wrap items-center justify-evenly h-full  mb-4 gap-9">
        <motion.div
          className="flex flex-col items-center "
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TrophyIcon size={250} />
          <h3 className="text-2xl text-center">Leaderboards</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
        <motion.div
          className="flex flex-col items-center justify-center "
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Football />
          <h3 className="text-2xl text-center">Real Matches</h3>
        </motion.div>
        <motion.div
          className="flex flex-col items-center"
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ChipIcon />
          <h3 className="text-2xl text-center">Fantasy Betting</h3>
        </motion.div>
        {/* <div className="divider divider-primary xl:divider-horizontal"></div> */}
      </div>
    </div>
  );
}
