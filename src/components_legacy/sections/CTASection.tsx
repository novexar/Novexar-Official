import { motion } from 'framer-motion';
import { Mail, Github, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            プロジェクトを始めませんか?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Azure/AI技術を活用したソリューション開発、クラウドアーキテクチャ設計など、
            <br className="hidden md:block" />
            お気軽にご相談ください。あなたのビジネスを次のレベルへ。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group" asChild>
              <a href="#contact">
                <MessageSquare className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                お問い合わせ
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <a href="https://github.com/poxcondev" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                GitHub で見る
              </a>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              または、直接メールでご連絡ください
            </p>
            <a
              href="mailto:contact@poxcon.dev"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-lg font-semibold"
            >
              <Mail className="w-5 h-5" />
              contact@poxcon.dev
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
