import type React from 'react';
import cardApi from '@apis/card/card.api';
import { ICard } from '@apis/card/card.type';
import SEO from '@components/common/seo/seo.component';
import { CardsProvider } from '@contexts/cards.context';
import CardsContent from '@components/pages-components/cards/components/cards-content.component';

// ----------------------------------------------------------------------

type Props = {
  cards: ICard[];
};

// ----------------------------------------------------------------------

export default function CardsPage({ cards }: Props) {
  return (
    <>
      <SEO
        title="Cards - Finance App"
        description="Easily track and manage all your cards in one place"
      />
      <CardsProvider initialCards={cards}>
        <CardsContent />
      </CardsProvider>
    </>
  );
}

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const { cards } = await cardApi.getAll();

  return {
    props: {
      cards,
    },
    revalidate: 60,
  };
}
