export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    link: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "AZURE AI RAG",
        category: "AI Architecture",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
        description: "Enterprise-grade RAG system using Azure OpenAI & Cognitive Search.",
        link: "#",
        tags: ["Azure OpenAI", "Python", "LangChain", "React"]
    },
    {
        id: 2,
        title: "CLOUD NEXUS",
        category: "Cloud Infrastructure",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        description: "Multi-tenant SaaS architecture on Azure Kubernetes Service.",
        link: "#",
        tags: ["AKS", "Terraform", "Docker", "Microservices"]
    },
    {
        id: 3,
        title: "DOCU-MIND",
        category: "Intelligent Automation",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
        description: "Automated document processing pipeline using Azure Form Recognizer.",
        link: "#",
        tags: ["Azure Functions", "Computer Vision", "Node.js"]
    },
    {
        id: 4,
        title: "QUANTUM DASH",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        description: "Real-time analytics dashboard for IoT sensor networks.",
        link: "#",
        tags: ["Next.js", "D3.js", "SignalR", "TypeScript"]
    }
];
