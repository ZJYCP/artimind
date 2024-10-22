import { Star } from "lucide-react"

const WallofLove = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Wall of Love</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((testimonial) => (
          <div key={testimonial} className={`p-6 rounded-lg bg-gray-800`}>
            <div className="flex items-center mb-4">
              <img src={`https://randomuser.me/api/portraits/men/${testimonial}.jpg`} alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-500" size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-400">"This AI search tool has completely transformed how I find information. It's incredibly fast and accurate!"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WallofLove