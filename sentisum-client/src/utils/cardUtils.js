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

export const getTrendChangeValue = (item) => {
  const currentValue = item.currentValue;
  const previousValue = item.previousValue;
  const change = currentValue - previousValue;
  return change;
};
export const getTrendChangePercentage = (item) => {
  const currentTrendValue =
    item.currentTrend[item.currentTrend.length - 1]?.value || 0;
  const previousTrendValue =
    item.previousTrend[item.previousTrend.length - 1]?.value || 0;
  const change = ((currentTrendValue - previousTrendValue) / previousTrendValue) * 100;
  return change;
};
