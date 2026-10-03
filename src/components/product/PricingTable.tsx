import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, MinusIcon } from '@phosphor-icons/react';
import { Reveal } from '@/components/ui/Reveal';
import { containerClass, sectionTitleClass } from '@/components/ui/layout';
import type { PricingRow, Product } from '@/data/products';
import { DownloadButton, PurchaseButton } from './ProductActions';

type PlanId = 'free' | 'pro';

interface PricingTableProps {
  product: Product;
}

interface PlanRowProps {
  row: PricingRow;
  plan: PlanId;
  ns: string;
}

/** プランカード内の 1 行。含まれない機能は薄く表示する */
function PlanRow({ row, plan, ns }: PlanRowProps) {
  const { t } = useTranslation();
  const value = row[plan];
  const included = value !== 'no';
  const StatusIcon = included ? CheckIcon : MinusIcon;

  return (
    <li
      className={`flex items-start gap-3 text-sm leading-relaxed ${
        included ? 'text-ink' : 'text-mute'
      }`}
    >
      <StatusIcon
        aria-hidden="true"
        className={`mt-1 h-4 w-4 shrink-0 ${included ? 'text-accent' : ''}`}
      />
      <span className="sr-only">
        {t(included ? 'productPage.included' : 'productPage.notIncluded')}:
      </span>
      <span className="flex-1">{t(`${ns}.pricing.rows.${row.key}.label`)}</span>
      {value === 'text' && (
        <span className="shrink-0 font-medium">
          {t(`${ns}.pricing.rows.${row.key}.${plan}`)}
        </span>
      )}
    </li>
  );
}

interface PlanCardProps {
  product: Product;
  plan: PlanId;
  ns: string;
  price: string;
  note?: string;
  highlighted?: boolean;
  action: ReactNode;
}

function PlanCard({
  product,
  plan,
  ns,
  price,
  note,
  highlighted = false,
  action,
}: PlanCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 md:p-8 ${
        highlighted
          ? 'border-accent/50 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(var(--accent)/0.18),transparent_60%)] bg-surface'
          : 'border-line bg-surface'
      }`}
    >
      <h3 className="text-lg font-medium text-ink">
        {t(`product.plans.${plan}.name`)}
      </h3>
      <p className="mt-4 flex items-baseline gap-3">
        <span className="font-mono text-4xl tracking-tight text-ink md:text-5xl">
          {price}
        </span>
        {note && <span className="text-sm text-mute">{note}</span>}
      </p>
      <ul className="mt-8 flex-1 space-y-3">
        {product.pricingRows.map((row) => (
          <PlanRow key={row.key} row={row} plan={plan} ns={ns} />
        ))}
      </ul>
      {/* 行数が違っても 2 枚のボタン位置が揃うよう下端に固定 */}
      <div className="mt-10">{action}</div>
    </div>
  );
}

export function PricingTable({ product }: PricingTableProps) {
  const { t } = useTranslation();
  const ns = `productPage.${product.i18nKey}`;

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className={containerClass}>
        <h2 className={sectionTitleClass}>
          {t('productPage.sections.pricing')}
        </h2>
        <p className="mt-4 text-mute">{t(`${ns}.pricing.note`)}</p>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          <Reveal>
            <PlanCard
              product={product}
              plan="free"
              ns={ns}
              price={product.priceFree}
              action={<DownloadButton product={product} />}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <PlanCard
              product={product}
              plan="pro"
              ns={ns}
              price={product.pricePro}
              note={t('product.oneTime')}
              highlighted
              action={<PurchaseButton product={product} />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
