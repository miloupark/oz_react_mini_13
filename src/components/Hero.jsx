import Beams from "./bits/beams";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center w-full h-[calc(100vh-76px)] supports-[height:100dvh]:h-[calc(100dvh-76px)]">
      <Beams
        className="absolute inset-0"
        beamWidth={6}
        beamHeight={30}
        beamNumber={20}
        lightColor="#cccccc"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
      />
      <div
        className="absolute inset-0 z-10
                    bg-gradient-to-b from-black/90 to-transparent"
      />
      <div className="absolute z-20 text-2xl sm:text-3xl md:text-4xl  font-semibold text-white text-center space-y-5">
        <p>엔딩 크레딧 뒤, FilmArchive와 함께</p>
        <p>감상은 기록으로, 기록은 다시 감동으로</p>
      </div>
    </div>
  );
}
