import { Hero } from "../../components/Hero"
import Populars from "../../components/Popular/Populars"
import PhysicalStores from "./PhysicalStores"

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Populars/>
      <PhysicalStores/>
      {/* <Footer/> */}
    
    </div>
  )
}

export default HomePage