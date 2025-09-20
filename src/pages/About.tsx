import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Target, 
  Eye, 
  Users, 
  Database, 
  Search, 
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import ptmsAbout from "@/assets/ptms-about.jpg";
import ptmsTeam from "@/assets/ptms-team.jpg";

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

  const teamMembers = [
    {
      name: "Abdisamed Abdirhman (Wadayste)",
      role: "Front-end Developer/Analysis",
      description: "Front-End Developer and Analyst skilled in designing modern, responsive web interfaces and analyzing user and business requirements. Experienced with HTML, CSS, JavaScript, and UI frameworks.",
      image: ptmsTeam
    },
    {
      name: "Abdilaahi Abdirashid Ali (Shiine)",
      role: "UI Developer/Back-end",
      description: "UI Developer skilled in designing and developing interactive, user-friendly web interfaces. Back-End Developer experienced in building and maintaining robust server-side applications.",
      image: ptmsTeam
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero About Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={ptmsAbout}
                alt="Somali Teachers - PTMS"
                className="w-full h-auto rounded-xl shadow-lg border border-border"
              />
            </div>
            
            <div className="animate-slide-up">
              <h1 className="text-4xl font-bold text-foreground mb-6">
                About <span className="text-gradient-primary">PTMS</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                <strong>PTMS</strong> (Nidaamka Maamulka Macalimiinta Puntland) waa madal dhijitaal ah oo loogu talagalay in lagu diiwaan geliyo, lagu maamulo, laguna la socdo profiles-ka macalimiinta guud ahaan Puntland. Waxay kor u qaadaysaa waxtarka, hufnaanta, iyo helitaanka xogta macalimiinta.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="ptms-feature-item cursor-pointer"
                    onClick={() => toggleFeature(index)}
                  >
                    <div className="flex items-center gap-3">
                      {openFeature === index ? (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-primary" />
                      )}
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    </div>
                    
                    {openFeature === index && (
                      <div className="mt-3 pl-8 animate-fade-in">
                        <p className="text-muted-foreground leading-relaxed">
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
      <section className="py-16 bg-success-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-success mb-4">
              Caqabadaha & Xalka PTMS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-6 h-full animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${challenge.color} flex items-center justify-center`}>
                    <challenge.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{challenge.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {challenge.problem}
                </p>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-success">Xalka:</p>
                  <p className="text-foreground leading-relaxed">{challenge.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Hadafka & Himilada PTMS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="ptms-gradient-card bg-white/10 border-white/20 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Hadafkeena</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                PTMS wuxuu leeyahay hadaf cad oo ah in la dhiso nidaam isku dhafan oo casri ah oo lagu hubinayo in macluumaadka macalimiinta Puntland si hufan loo diiwaangeliyo loona helo marka loo baahdo.
              </p>
            </Card>

            <Card className="ptms-gradient-card bg-white/10 border-white/20 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Himiladeena</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Inaan noqono barxad hormuud u ah maaraynta macluumaadka waxbarashada, taasoo si siman u xoojisa isku xirnaanta u dhexeysa macalimiinta iyo hay'adaha waxbarasho ee Puntland.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            Our Team
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="ptms-card text-center animate-bounce-in" style={{ animationDelay: `${index * 0.3}s` }}>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-success font-semibold uppercase tracking-wide text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;