import Link from 'next/link'
import styles from './home.module.scss'
const Home = () => {
  return (
    <div className="h-screen">
      <div className="bg-[#11436D] absolute overflow-hidden h-full w-full ">
        {/* <img
          alt="banner image"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          data-nimg="fill"
          className="object-cover"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            color: 'transparent',
          }}
          src="/images/top-banner.jpg"
        /> */}
        <div className="w-full h-full">
          <video
            muted={true}
            playsInline={true}
            loop={true}
            autoPlay={true}
            preload="auto"
            className="absolute w-full h-full right-0 top-0 object-cover"
            src="/videos/top.mp4"
            poster="/images/top-banner.jpg"
          ></video>
        </div>
        <div
          className={
            styles.Mask_blueBanner__ofaSx +
            ' after:absolute after:w-[2040px] after:h-[2040px] after:left-0 after:top-0 after:-translate-y-[1300px] after:-translate-x-[1000px] after:xl:-translate-x-[500px] after:xl:-translate-y-[650px] after:xl:w-[1080px] after:xl:h-[1080px] before:absolute before:w-[2040px] before:h-[2040px] before:right-0 before:bottom-0 before:rounded-full before:translate-y-[850px] before:translate-x-[1000px] before:xl:w-[1080px] before:xl:h-[1080px] before:xl:translate-y-[400px] before:xl:translate-x-[500px] absolute w-full bottom-0 right-0 top-0 left-0 h-full bg-[#050A1E] opacity-70'
          }
        ></div>
      </div>
      <div>
        <div className="text-center max-w-[1040px] mx-auto relative px-4 lg:pt-24 pt-[130px]">
          <h1 className="text-[72px] leading-snug font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#44BCFF] to-[#00FFD1] lg:text-7xl md:text-5xl sm:text-4xl">
            The Most Powerful, All-in-One AI Writing Copilot.
          </h1>
          <button className="text-[#11229E] shadow-[0px_2px_50px_0px_rgba(0,234,180,0.5)] w-fit mx-auto block text-2xl transition font-bold bg-[#00EAB4] px-12 rounded-full mt-12 py-[14px] hover:bg-[#00D3B6] hover:text-white lg:py-2 lg:text-base lg:mt-6">
            Start for Free
          </button>
          <div className="flex items-center w-fit mx-auto relative text-[#00EAB4] text-sm pt-6 mb-[320px] 2xl:mb-[300px] lg:mb-[200px] md:mb-[120px] before:i-com--circle-check before:w-4 before:h-4 before:text-secondary before:absolute before:start-0 ps-6">
            No credit card required
          </div>
        </div>
        <img src="/images/test.svg"></img>
        <div className="hover:cursor-pointer hover:opacity-80 absolute left-1/2 w-[60px] h-[60px] -translate-x-1/2 rounded-full from-[#00FFD1CC] bg-gradient-[242deg] from-20% to-80% to-[#44BCFFCC] bottom-44 lg:bottom-24 md:bottom-12">
          <span className="inline-flex h-20 w-20 rounded-full from-[#00FFD14D] bg-[linear-gradient(242deg,var(--tw-gradient-stops))] from-20% to-80% to-[#44BCFF4D] absolute -left-2.5 -top-2.5 animate-[play_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
          <img src="/images/play.svg"></img>
        </div>
      </div>
    </div>
  )
}
export default Home
