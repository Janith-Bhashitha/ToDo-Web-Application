
import Image from 'next/image';
import { CheckSquare, Bell, BarChart2, Lock } from 'lucide-react';
import Shapes from './components/Shapes';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start space-x-3 bg-white p-3 rounded-xl shadow-lg w-full max-w-xs transition duration-300 hover:shadow-2xl">
    <Icon className="w-5 h-3 text-purple-600 mt-0.5" />
    <div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);


export default function HomePage() {
  const primaryColor = 'bg-[#6B46C1]'; 

  const features = [
    { icon: CheckSquare, title: 'Smart Task Lists', description: 'create and manage your daily task easily' },
    { icon: Bell, title: 'Reminders', description: 'get notified about what matters' },
    { icon: BarChart2, title: 'Progress Tracker', description: 'visualize your completed goals' },
    { icon: Lock, title: 'Security', description: 'your data is encrypted and protected in all time' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative overflow-hidden">
      <Shapes />
      <header className={`pt-12 pb-24 ${primaryColor} rounded-b-[40px] md:rounded-b-[80px] text-center text-white shadow-xl`}>
        <div className="flex justify-center items-center space-x-2 mb-4">
          <CheckSquare className="w-10 h-10 md:w-12 md:h-12 border-2 border-white rounded-md p-1" />
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">ToDo.</h1>
        </div>
        <p className="text-xl md:text-2xl font-light italic mt-2 px-4">
          "Organize Your Day. Simplify Your Life."
        </p>
      </header>

      <main className="container mx-auto px-4 -mt-16 md:-mt-20">
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 md:gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-2xl lg:max-w-none">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <div className="flex flex-col items-center justify-start mt-8 lg:mt-0">
            <div className="relative w-full max-w-md h-auto mb-10">
              <div className="p-4 rounded-lg bg-white shadow-2xl">
                <div className="flex flex-col items-center">
                  <div className="relative w-[400px] h-[400px] overflow-hidden">
                    <Image
                      src="/women with laptop1.jpg"
                      alt="Woman working on laptop"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            
            <div className="text-center mt-6">
              <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                Ready to take control of your Day?
              </p>
              <button
                className={`px-10 py-4 text-lg font-medium text-white rounded-xl transition duration-300 ease-in-out shadow-lg hover:shadow-xl ${primaryColor} hover:opacity-90`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}