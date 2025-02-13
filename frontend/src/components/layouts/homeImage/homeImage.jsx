import './homeImage.css'
import { motion } from 'framer-motion';
const HomeImage = () => {

    return (

        <motion.div className="image-container" initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{duration:1.2,delay:0.5}}
        viewport={{once:true}}>
            <div className='image-box'><img src="homeImage.jpg" className="image-container-img" alt="some error"></img></div>
            <div className='layer-box'></div>
            <motion.div
                initial={{ opacity: 0,x:-200 }}
                whileInView={{ opacity: 1,x:0 }}
                viewport={{ once: true }}
                transition={{duration:1.3,delay:0.2}}
                className='content-box-content'
            ><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1.0}}>Amazing Products at great pricing with great quality at one place</motion.p></motion.div>
        </motion.div>
    )
}

export default HomeImage;