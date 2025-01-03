import Benefits from './Benefits'
import Feature from './Feature'
import HowItWorks from './HowItWorks'
import QACom from './QA'
import SearchCom from './Search'
import WallofLove from './WallofLove'
import FooterCom from '@/components/Footer'
const HomePage = async () => {
  return (
    <div>
      <main className={`container mx-auto px-4 `}>
        <SearchCom></SearchCom>

        <Benefits></Benefits>

        <HowItWorks></HowItWorks>

        <Feature></Feature>

        <WallofLove></WallofLove>

        <QACom></QACom>
      </main>
      <FooterCom></FooterCom>
    </div>
  )
}
export default HomePage
