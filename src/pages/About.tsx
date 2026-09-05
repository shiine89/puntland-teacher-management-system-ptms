import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { 
  Target, 
  Eye, 
  Database, 
  Search, 
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import ptmsAbout from "@/assets/ptms-about.jpg";

const About = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };

  const features = [
    {
      title: "Diiwaan-gelinta macalimiinta profile dhamaystiran",
      description: "Macalimiinta waxaa loo diiwaan geliyaa iyagoo leh profiles dhammeystiran, oo ay ku jiraan magaca, jinsiga, gobolka, heerka waxbarasho, khibrad, iyo CV rasmi ah."
    },
    {
      title: "Maamulka xogta macalimiinta",
      description: "System-ku wuxuu fududeeyaa in si hufan loo maamulo xogta macalimiinta, iyadoo la kala xadidi karo xogta dadweynaha loo furo ama loo xiro si gaar ah."
    },
    {
      title: "Ku xiro CV iyo sawir profile",
      description: "Waxa suurtagal ah in si ammaan ah loo kaydiyo CV-yada iyo sawirrada macalimiinta, taasoo kor u qaadaysa kalsoonida iyo hufnaanta xogta."
    },
    {
      title: "La socoshada khibrada, waxbarasho, macalimiinta",
      description: "Waxaa la xafidayaa lana la socdaa xogta khibradda, heerka waxbarasho, iyo gobolka uu macalinka ka shaqeeyo si loo helo xog dhammaystiran."
    },
    {
      title: "U raadi si fudud xogta macaliminta aad u baahnatahay",
      description: "Macalimiinta waxaa si degdeg ah oo fudud loogu baari karaa iyadoo la adeegsanayo filters sida maadooyinka, heerarka, iyo goobta shaqada."
    },
    {
      title: "Dooro hal ama dhowr maado",
      description: "System-ku wuxuu awood u siinayaa in macalin kasta u doorto hal maado ama ka badan, si hufan oo nidaamsan."
    }
  ];

  const challenges = [
    {
      icon: Database,
      title: "Xog-ururin aan nidaamsanayn",
      problem: "Macluumaadka macalimiinta waxaa lagu kaydin jiray hab aan nidaamsanayn oo keena dib-u-dhac iyo khaladaad.",
      solution: "PTMS wuxuu dhisay nidaam elektaroonik ah oo isku xiraya dhammaan macluumaadka si hufan.",
      color: "bg-success text-success-foreground"
    },
    {
      icon: Search,
      title: "Helitaanka macalimiin tayo leh",
      problem: "Wasaaradaha & dugsiyada way adkaan jirtay in ay si degdeg ah u helaan macalimiin aqoon leh.",
      solution: "Nidaamku wuxuu bixiyaa baaritaan degdeg ah oo lagu helo macalimiinta leh shahaadooyinka saxda ah.",
      color: "bg-primary text-primary-foreground"
    },
    {
      icon: ShieldCheck,
      title: "Kalsooni darro iyo xog la'aan",
      problem: "Hay'adaha waxbarashada waxay la kulmi jireen xog la'aan ama xog aan la hubin.",
      solution: "PTMS wuxuu suurtagelinayaa xog si buuxda loo hubiyay oo ay heli karaan dhammaan hay'adaha ay khusayso.",
      color: "bg-destructive text-destructive-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero About Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <img
                src={ptmsAbout}
                alt="Somali Teachers - PTMS"
                className="w-full h-auto rounded-xl shadow-lg border border-border"
              />
            </div>
            
            <div className="animate-slide-up order-1 lg:order-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                About <span className="text-gradient-primary">PTMS</span>
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                <strong>PTMS</strong> (Nidaamka Maamulka Macalimiinta Puntland) waa madal dhijitaal ah oo loogu talagalay in lagu diiwaan geliyo, lagu maamulo, laguna la socdo profiles-ka macalimiinta guud ahaan Puntland. Waxay kor u qaadaysaa waxtarka, hufnaanta, iyo helitaanka xogta macalimiinta.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="ptms-feature-item cursor-pointer"
                    onClick={() => toggleFeature(index)}
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      {openFeature === index ? (
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 mt-1 sm:mt-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-1 sm:mt-0" />
                      )}
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{feature.title}</h3>
                    </div>
                    
                    {openFeature === index && (
                      <div className="mt-3 pl-6 sm:pl-8 animate-fade-in">
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                          {feature.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-8 sm:py-12 lg:py-16 bg-success-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-success mb-4">
              Caqabadaha & Xalka PTMS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-4 sm:p-6 h-full animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${challenge.color} flex items-center justify-center flex-shrink-0`}>
                    <challenge.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground">{challenge.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                  {challenge.problem}
                </p>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-success text-sm sm:text-base">Xalka:</p>
                  <p className="text-foreground leading-relaxed text-sm sm:text-base">{challenge.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
            Hadafka & Himilada PTMS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="ptms-gradient-card bg-white/10 border-white/20 text-white p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Hadafkeena</h3>
              </div>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                PTMS wuxuu leeyahay hadaf cad oo ah in la dhiso nidaam isku dhafan oo casri ah oo lagu hubinayo in macluumaadka macalimiinta Puntland si hufan loo diiwaangeliyo loona helo marka loo baahdo.
              </p>
            </Card>

            <Card className="ptms-gradient-card bg-white/10 border-white/20 text-white p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Himiladeena</h3>
              </div>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                Inaan noqono barxad hormuud u ah maaraynta macluumaadka waxbarashada, taasoo si siman u xoojisa isku xirnaanta u dhexeysa macalimiinta iyo hay'adaha waxbarasho ee Puntland.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;