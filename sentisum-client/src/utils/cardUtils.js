export const getCardsLayout = (cards) => {
  const layout = [];
  cards.forEach((card) => {
    if (card.layout) {
      layout.push({
        ...card.layout,
        i: card.id,
      });
    }
  });
  return layout;
};

export const sanitizeLayoutComingFromGrid = (layout) => {
  return layout.map(({ w, h, x, y, i }) => ({
    w,
    h,
    x,
    y,
    id: i,
  }));
};
