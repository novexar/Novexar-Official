import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SkillCategory } from '@/types';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

// Technology stack with Devicon CDN as primary, Iconify for missing Azure/Power services
const techStack = [
  // Cloud Platforms
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Heroku', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg' },
  { name: 'Vercel', icon: 'https://api.iconify.design/simple-icons/vercel.svg?color=%23ffffff' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },

  // Azure Services (using Iconify API for specialized Azure services)
  { name: 'Azure OpenAI', icon: 'https://api.iconify.design/simple-icons/openai.svg?color=%23ffffff' },
  { name: 'Azure DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg' },
  { name: 'Power Apps', icon: 'https://api.iconify.design/simple-icons/powerapps.svg?color=%23742774' },
  { name: 'Power Automate', icon: 'https://api.iconify.design/simple-icons/powerautomate.svg?color=%230066ff' },

  // Programming Languages
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },

  // Frameworks & Libraries
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Material-UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg' },

  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Azure SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'Azure Cosmos DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cosmosdb/cosmosdb-original.svg' },

  // DevOps & Tools
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://api.iconify.design/simple-icons/github.svg?color=%23ffffff' },
  { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'CircleCI', icon: 'https://api.iconify.design/simple-icons/circleci.svg?color=%23ffffff' },

  // AI & Data
  { name: 'Prompt Engineering', icon: 'https://api.iconify.design/fluent-emoji-high-contrast/brain.svg?color=%23ffffff' },
  { name: 'GraphRAG', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
];

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const { t } = useTranslation();

  // Double the array for seamless infinite scrolling with CSS animation
  const scrollingTechs = [...techStack, ...techStack];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-blue-900/20 to-black overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            {t('skills.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('skills.description')}
          </p>
        </motion.div>

        {/* Auto-scrolling technology icons */}
        <div className="relative py-8">
          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <div className="flex gap-16 items-center animate-scroll">
              {scrollingTechs.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="flex flex-col items-center gap-3 p-4 w-[100px]">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-16 h-16 relative z-10 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback for missing icons
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap text-center">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
