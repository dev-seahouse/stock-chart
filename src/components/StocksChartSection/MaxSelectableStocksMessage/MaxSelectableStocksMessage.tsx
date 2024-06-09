function MaxSelectableStocksMessage(props: { maxSelectableStocks: number }) {
  return (
    <div className="flex h-64 items-center justify-center">
      <p
        className={`
          text-gray-500

          dark:text-gray-400
        `}
      >
        Please select up to {props.maxSelectableStocks} stocks to view the price
        chart.
      </p>
    </div>
  );
}

export default MaxSelectableStocksMessage;
